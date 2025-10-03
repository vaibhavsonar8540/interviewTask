const express = require("express");
const studentController = require("../controller/studentController");
const studentRoute = express.Router();

studentRoute.post("/register", studentController.register);
studentRoute.get("/students", studentController.getAllStudents);
studentRoute.put("/student/:id", studentController.updateStudent);
studentRoute.delete("/student/:id", studentController.deleteStudent);
studentRoute.post("/login", studentController.login);

module.exports = studentRoute;
