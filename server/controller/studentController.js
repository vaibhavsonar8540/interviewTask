const StudentModel = require("../model/student");
const CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.SECRET_KEY || "vaibhav";

// Encrypt password
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

// Decrypt password
const decryptPassword = (encrypted) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const studentController = {
  register: async (req, res) => {
    try {
      const { fullName, email, phone, DOB, gender, address, course, password } = req.body;

      // Check if email exists
      const existingStudent = await StudentModel.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Encrypt password
      const encryptedPassword = encryptPassword(password);

      await StudentModel.create({
        fullName,
        email,
        phone,
        DOB,
        gender,
        address,
        course,
        password: encryptedPassword,
      });

      res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering student", error: error.message });
    }
  },

  getAllStudents: async (req, res) => {
    try {
      const students = await StudentModel.find().select("-password");
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Error fetching students", error: error.message });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { fullName, email, phone, DOB, gender, address, course, password } = req.body;

      const updateData = { fullName, email, phone, DOB, gender, address, course };

      if (password) {
        updateData.password = encryptPassword(password);
      }

      const updated = await StudentModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) return res.status(404).json({ message: "Student not found" });

      res.json({ message: "Student updated successfully", student: updated });
    } catch (error) {
      res.status(500).json({ message: "Error updating student", error: error.message });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await StudentModel.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Student not found" });

      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting student", error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const student = await StudentModel.findOne({ email });
      if (!student) return res.status(404).json({ message: "Student not found" });

      // Decrypt stored password and compare
      const decryptedPassword = decryptPassword(student.password);
      if (password !== decryptedPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.json({
        message: "Login successful",
        student: { email: student.email, fullName: student.fullName },
      });
    } catch (error) {
      res.status(500).json({ message: "Login error", error: error.message });
    }
  },
};

module.exports = studentController;
