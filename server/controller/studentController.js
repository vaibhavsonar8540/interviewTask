const bcrypt = require("bcryptjs");
const StudentModel = require("../model/student");

const studentController = {
  register: async (req, res) => {
    try {
      let { fullName, email, phone, DOB, gender, address, course, password } = req.body;

      // Check if email exists
      const existingStudent = await StudentModel.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      await StudentModel.create({
        fullName,
        email,
        phone,
        DOB,
        gender,
        address,
        course,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering student", error: error.message });
    }
  },

  getAllStudents: async (req, res) => {
    try {
      const students = await StudentModel.find().select("-password"); // don't send password
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Error fetching students", error: error.message });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      let { fullName, email, phone, DOB, gender, address, course, password } = req.body;

      let updateData = { fullName, email, phone, DOB, gender, address, course };

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
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
      let { email, password } = req.body;

      const student = await StudentModel.findOne({ email });
      if (!student) return res.status(404).json({ message: "Student not found" });

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid password" });

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
