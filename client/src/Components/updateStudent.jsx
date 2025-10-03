import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./component.css";

const UpdateStudent = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get("http://localhost:3030/api/students");
        const student = res.data.find((s) => s._id === id);
        if (student) setForm({ ...student, password: "" });
      } catch (err) {
        console.error("Error fetching student", err);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3030/api/student/${id}`, form);
      alert("Student updated successfully!");
      navigate("/students");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating student");
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ textAlign: "center" }}>Update Student</h2>
      <form onSubmit={handleUpdate}>
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="DOB" type="date" value={form.DOB} onChange={handleChange} required />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <input name="password" placeholder="New Password (optional)" type="password" value={form.password} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
