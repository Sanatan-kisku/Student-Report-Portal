import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get(
        // `${process.env.REACT_APP_BACKEND_URL}/report-card?class=${studentClass}&section=${section}&roll=${rollNumber}`
        `https://student-report-portal.onrender.com/report-card?class=${studentClass}&section=${section}&roll=${rollNumber}`
      );
      navigate("/report-card", { state: { reportCard: response.data } });
    } catch (err) {
      setError("Report card not found.");
    }
  };

  return (
    <div className="container text-center mt-5">
      {/* School Logo */}
      <img src="/logo.jpg" alt="School Logo" className="mb-3" width="120" />

      {/* Welcome Message */}
      <h1 className="mb-4 text-primary">
        Welcome to Odisha Adarsha Vidyalaya, Surada <br /> Student Report Portal
      </h1>
      <p className="lead text-secondary">Enter your details to access your report card.</p>

      {/* Student Form */}
      <div className="card shadow-sm mx-auto mt-4 p-4" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          {/* Side-by-Side Inputs using Bootstrap Grid */}
          <div className="row mb-3">
            {/* Class Field */}
            <div className="col-md-4">
              <label className="form-label">Select Class:</label>
              <select
                className="form-select"
                value={studentClass}
                onChange={(e) => {
                  setStudentClass(e.target.value);
                  if (e.target.value === "11" || e.target.value === "12") {
                    setSection(""); // Reset section if class is 11 or 12
                  }
                }}
                required
              >
                <option value="">Choose...</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            {/* Section Field (Only for Class 6-10) */}
            {studentClass && parseInt(studentClass) >= 6 && parseInt(studentClass) <= 10 && (
              <div className="col-md-4">
                <label className="form-label">Select Section:</label>
                <select
                  className="form-select"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
            )}

            {/* Roll Number Field */}
            <div className={studentClass && parseInt(studentClass) >= 6 && parseInt(studentClass) <= 10 ? "col-md-4" : "col-md-6 mx-auto"}>
              <label className="form-label">Enter Roll Number:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Get Report Card</button>
        </form>
        {error && <p className="text-danger mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Home;
