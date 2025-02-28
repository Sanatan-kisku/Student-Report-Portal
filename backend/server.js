const express = require("express");
const cors = require("cors");
const path = require("path");
const xlsx = require("xlsx");

const app = express();
app.use(cors());

app.get("/report-card", (req, res) => {
  const { class: studentClass, section, roll, examType } = req.query;

  // ✅ Validate Input
  if (!studentClass || !roll || !examType) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // ✅ Define folder structure
  let folderPath = path.join(__dirname, "public", "reports", examType, `class${studentClass}`);

  // ✅ Construct the file name
  let fileName;
  if (studentClass >= 6 && studentClass <= 10) {
    if (!section) {
      return res.status(400).json({ error: "Section is required for Class 6-10" });
    }
    fileName = `class${studentClass}${section}results.xlsx`;
  } else {
    fileName = `class${studentClass}results.xlsx`; // No section for Class 11-12
  }

  const filePath = path.join(folderPath, fileName);
  console.log("Trying to read file:", filePath); // ✅ Debugging log

  try {
    // ✅ Check if file exists
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log("Extracted Data:", data); // ✅ Debugging log

    // ✅ Find the student's data
    const student = data.find((student) => {
      console.log("Checking student:", student); // ✅ Debugging log
      return student.RollNumber == String(roll); // Ensure comparison is correct
    });

    if (!student) {
      return res.status(404).json({ error: "Report card not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error reading report card:", error);
    res.status(500).json({ error: "Error reading report card" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
