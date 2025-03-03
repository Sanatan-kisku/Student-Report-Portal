import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [studentClass, setStudentClass] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/report-card?class=${studentClass}&roll=${rollNumber}`
      );

      navigate("/report-card", { state: { reportCard: response.data } });
    } catch (err) {
      setError("Report card not found.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-3">Get Your Report Card</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Get Report Card
          </button>
        </form>
        {error && <p className="text-danger mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Home;