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
        `http://localhost:5000/report-card?class=${studentClass}&section=${section}&roll=${rollNumber}`
      );
      navigate("/report-card", { state: { reportCard: response.data } });
    } catch (err) {
      setError("Report card not found.");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4 text-primary">Student Report Portal</h1>
      <p className="lead text-secondary">Enter your details to access your report card.</p>

      <div className="card shadow-sm mx-auto mt-4 p-4" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Select Class:</label>
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