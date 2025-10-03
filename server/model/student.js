const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    phone: { type: Number, required: true },
    DOB: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    course: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

const StudentModel = mongoose.model("students", StudentSchema);
module.exports = StudentModel;
