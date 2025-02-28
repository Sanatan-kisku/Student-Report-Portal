const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");  // Excel file reader

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/report-card", (req, res) => {
  const studentClass = req.query.class;
  const section = req.query.section;
  const roll = req.query.roll;

  if (!studentClass || !roll) {
    return res.status(400).json({ error: "Class and Roll Number are required" });
  }

  let filePath = `public/reports/class${studentClass}/`;

  if (studentClass >= 6 && studentClass <= 10) {
    if (!section) {
      return res.status(400).json({ error: "Section is required for classes 6 to 10" });
    }
    filePath += `class${studentClass}${section}results.xlsx`;
  } else {
    filePath += `class${studentClass}results.xlsx`;
  }

  console.log("Looking for file:", filePath);

  if (!fs.existsSync(filePath)) {
    console.log("File not found:", filePath);
    return res.status(404).json({ error: "Report card not found" });
  }

  // Read Excel file
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  // Find student by roll number
  const studentData = data.find(student => student.Roll == roll);

  if (!studentData) {
    return res.status(404).json({ error: "Student not found in the file" });
  }

  res.json(studentData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
