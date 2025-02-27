import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function ReportCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const reportCard = location.state?.reportCard;

  const reportRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  if (!reportCard) {
    return (
      <div className="container mt-5 text-center">
        <h3>Report Card Not Found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>{reportCard.Name}'s Report Card</h2>
        <p>Class: {reportCard.Class} | Roll No: {reportCard.Roll}</p>
      </div>

      <div className="card p-4 shadow-lg" ref={reportRef}>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>English</td><td>{reportCard.English}</td></tr>
            <tr><td>Math</td><td>{reportCard.Math}</td></tr>
            <tr><td>Science</td><td>{reportCard.Science}</td></tr>
            <tr><td><strong>Total</strong></td><td><strong>{reportCard.Total}</strong></td></tr>
            <tr><td><strong>Grade</strong></td><td><strong>{reportCard.Grade}</strong></td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-center">
        <button className="btn btn-success me-2" onClick={handlePrint}>
          Print Report Card
        </button>
        <button className="btn btn-danger" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ReportCard;
