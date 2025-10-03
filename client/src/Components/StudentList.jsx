import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./component.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3030/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await axios.delete(`http://localhost:3030/api/student/${id}`);
      fetchStudents();
    }
  };

  return (
    <div className="students-container">
      <h2 style={{ textAlign: "center" }}>Student List</h2>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/" className="link-btn">+ Register Student</Link>
      </div>
      <div className="cards-container">
        {students.map((s) => (
          <div className="student-card" key={s._id}>
            <h3>{s.fullName}</h3>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Phone:</strong> {s.phone}</p>
            <p><strong>DOB:</strong> {s.DOB}</p>
            <p><strong>Gender:</strong> {s.gender}</p>
            <p><strong>Address:</strong> {s.address}</p>
            <p><strong>Course:</strong> {s.course}</p>
            <div className="card-actions">
              <FaEdit onClick={() => navigate(`/student/${s._id}`)} className="icon edit" />
              <FaTrash onClick={() => handleDelete(s._id)} className="icon delete" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
