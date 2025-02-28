import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ReportCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const reportCard = location.state?.reportCard;

  const reportRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => reportRef.current,
  // });

  const handleDownloadPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190; // PDF width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${reportCard.Name}_ReportCard.pdf`);
  };

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
      {/* Student Details - Left Aligned */}
      <div className="mb-4">
        <h3><strong>Name:</strong> {reportCard.Name}</h3>
        <p><strong>Roll No:</strong> {reportCard.Roll}</p>
        <p><strong>Class:</strong> {reportCard.Class}</p>
        <p><strong>Section:</strong> {reportCard.Section}</p>
      </div>

      {/* Report Card Table */}
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
            {/* <tr><td><strong>Grade</strong></td><td><strong>{reportCard.Grade}</strong></td></tr> */}
          </tbody>
        </table>
      </div>

      {/* Buttons - Print and Download PDF */}
      <div className="mt-3 text-center">
        {/* <button className="btn btn-success me-2" onClick={handlePrint}>
          Print Report Card
        </button> */}
        <button className="btn btn-primary me-2" onClick={handleDownloadPDF}>
          Download Report Card
        </button>
        <button className="btn btn-danger" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ReportCard;
