import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";

function ReportCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const reportCard = location.state?.reportCard;
  const examName = location.state?.examName || "Examination"; // Get exam name from state
  const reportRef = useRef();

  const handleDownloadPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${reportCard?.Name}_ReportCard.pdf`);
  };

  if (!reportCard) {
    return (
      <div className="container mt-5 text-center">
        <h3>Report Card Not Found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="container mt-5" ref={reportRef}>
      {/* School Header */}
      <div className="text-center mb-4">
        <img src="/oavsuradalogo.png" alt="School Logo" width="100" />
        <h2>ODISHA ADARSHA VIDYALAYA, SURADA</h2>
        <h3>{examName.toUpperCase()} EXAMINATION REPORT CARD</h3> {/* Updated here */}
      </div>

      {/* Student Details */}
      <div className="mb-4">
        <h4><strong>Name:</strong> {reportCard.Name}</h4>
        <p><strong>Roll No:</strong> {reportCard.Roll} | <strong>Class:</strong> {reportCard.Class} | <strong>Section:</strong> {reportCard.Section}</p>
        <p><strong>Session:</strong> {reportCard.Session}</p>
      </div>

      {/* Report Card Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Subject</th>
            <th>Full Marks</th>
            <th>Obtained Marks</th>
          </tr>
        </thead>
        <tbody>
          {(reportCard.Subjects || []).map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>{subject.fullMarks}</td>
              <td>{subject.obtainedMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buttons */}
      <div className="text-center mt-3">
        <button className="btn btn-primary me-2" onClick={handleDownloadPDF}>Download Report Card</button>
        <button className="btn btn-danger" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
}

export default ReportCard;
