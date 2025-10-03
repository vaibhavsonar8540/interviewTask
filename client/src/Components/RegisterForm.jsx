import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./component.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    DOB: "",
    gender: "",
    address: "",
    course: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3030/api/register", form);
      alert("Student registered successfully!");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        DOB: "",
        gender: "",
        address: "",
        course: "",
        password: "",
      });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering student");
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ textAlign: "center" }}>Register Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="DOB"
          type="date"
          value={form.DOB}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Go to Login</Link>
      </p>
      <p style={{ textAlign: "center" }}>
        Want to see all students? <Link to="/students">See Student List</Link>
      </p>
    </div>
  );
};

export default Register;
