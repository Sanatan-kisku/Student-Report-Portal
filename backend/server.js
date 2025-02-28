const express = require("express");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, "results.xlsx"),
});
const upload = multer({ storage });

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Upload Excel file
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ message: "File uploaded successfully" });
});

// Get Report Card
app.get("/report-card", (req, res) => {
  const { class: studentClass, roll } = req.query;

  try {
    const filePath = "uploads/results.xlsx";
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const student = data.find(
      (row) => row.Class.toString() === studentClass && row.Roll.toString() === roll
    );

    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Error reading file" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
