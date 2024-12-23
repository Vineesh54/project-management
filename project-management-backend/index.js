// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/projectManagement")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process on connection failure
  });


// MongoDB Models
const Candidate = mongoose.model("Candidate", {
  name: String,
  email: String,
});

const Project = mongoose.model("Project", {
  title: String,
  description: String,
});

const Assignment = mongoose.model("Assignment", {
  candidateId: mongoose.Schema.Types.ObjectId,
  projectId: mongoose.Schema.Types.ObjectId,
  status: { type: String, default: "Pending" },
  score: { type: Number, default: 0 },
});

// API Endpoints
// Fetch all projects
app.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Assign a project to a candidate
app.post("/assignments", async (req, res) => {
  const { candidateId, projectId } = req.body;
  const assignment = new Assignment({ candidateId, projectId });
  await assignment.save();
  res.status(201).json({ message: "Project assigned successfully!" });
});

// Fetch assignments for a candidate
app.get("/assignments/:candidateId", async (req, res) => {
  const { candidateId } = req.params;
  const assignments = await Assignment.find({ candidateId }).populate("projectId");
  res.json(assignments);
});

// Update assignment status and score
app.put("/assignments/:assignmentId", async (req, res) => {
  const { assignmentId } = req.params;
  const { status, score } = req.body;
  const assignment = await Assignment.findByIdAndUpdate(
    assignmentId,
    { status, score },
    { new: true }
  );
  res.json({ message: "Assignment updated successfully!", assignment });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
