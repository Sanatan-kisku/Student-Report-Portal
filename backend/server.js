const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

const app = express();
app.use(cors());

app.get('/report-card', (req, res) => {
  const { class: studentClass, section, roll, examType } = req.query;

  // Validate required parameters
  if (!studentClass || !roll || !examType) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Construct the folder path
  const folderPath = path.join(
    __dirname,
    'public',
    'reports',
    examType.toLowerCase(), // Ensure examType matches folder naming
    `class${studentClass}`
  );

  // Construct the file name
  let fileName;
  if (parseInt(studentClass) >= 6 && parseInt(studentClass) <= 10) {
    if (!section) {
      return res.status(400).json({ error: 'Section is required for classes 6-10' });
    }
    fileName = `class${studentClass}${section.toUpperCase()}results.xlsx`;
  } else {
    fileName = `class${studentClass}results.xlsx`; // No section for classes 11-12
  }

  const filePath = path.join(folderPath, fileName);
  // console.log(filePath);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return res.status(404).json({ error: 'Report card file not found' });
  }

  try {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Find the student's data by roll number
    const student = data.find((s) => String(s.RollNumber) === String(roll));

    if (!student) {
      return res.status(404).json({ error: 'Report card not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error reading report card:', error);
    res.status(500).json({ error: 'Error reading report card' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
