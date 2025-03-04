import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"; // Import the CSS file

function Home() {
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [examName, setExamName] = useState("");
  const [session, setSession] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/report-card?class=${studentClass}&section=${section}&roll=${rollNumber}&exam=${examName}&session=${session}`
      );
      navigate("/report-card", {
        state: { reportCard: response.data, examName, session },
      });
    } catch (err) {
      setError("Report card not found.");
    }
  };

  return (
    <div className="home-container">
      <div className="school-header">
        <img src="/oavsuradalogo.png" alt="School Logo" className="school-logo" />
        <h1 className="school-name">ODISHA ADARSHA VIDYALAYA, SURADA</h1>
      </div>

      <div className="home-card">
        <h1>Student Report Portal</h1>
        <p>Enter your details to access your report card.</p>

        <div className="home-form card shadow-sm p-4">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">


            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label>Class:</label>
                <select
                  className="form-select"
                  value={studentClass}
                  onChange={(e) => {
                    setStudentClass(e.target.value);
                    if (e.target.value >= "11") {
                      setSection("");
                    }
                  }}
                  required
                >
                  <option value="">Choose...</option>
                  {[...Array(7)].map((_, i) => (
                    <option key={i + 6} value={i + 6}>{`Class ${i + 6}`}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>Section:</label>
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
              <div
                className="col-md-4">
                <label>Roll Number:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Roll Number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Examination:</label>
                <select
                  className="form-select"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="Periodic Test 1">Periodic Test 1</option>
                  <option value="Periodic Test 2">Periodic Test 2</option>
                  <option value="Periodic Test 3">Periodic Test 3</option>
                  <option value="Half Yearly">Half Yearly</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Session:</label>
                <select
                  className="form-select"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="2024-25">2024-25</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Get Report Card
            </button>
          </form>
          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Home;
