const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/projectManagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");

  const Candidate = mongoose.model("Candidate", { name: String, email: String });
  const Project = mongoose.model("Project", { title: String, description: String });
  const Assignment = mongoose.model("Assignment", {
    candidateId: mongoose.Schema.Types.ObjectId,
    projectId: mongoose.Schema.Types.ObjectId,
    status: String,
    score: Number
  });

  Promise.all([
    Candidate.insertMany([
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Smith", email: "bob@example.com" },
      { name: "Charlie Brown", email: "charlie@example.com" }
    ]),
    Project.insertMany([
      { title: "Website Redesign", description: "Redesign the company website to improve user experience." },
      { title: "Mobile App Development", description: "Build a mobile app for online shopping." },
      { title: "AI Research", description: "Research and develop AI algorithms for data analysis." }
    ])
  ]).then(([candidates, projects]) => {
    return Assignment.insertMany([
      { candidateId: candidates[0]._id, projectId: projects[0]._id, status: "Pending", score: 0 },
      { candidateId: candidates[1]._id, projectId: projects[1]._id, status: "In Progress", score: 20 },
      { candidateId: candidates[2]._id, projectId: projects[2]._id, status: "Completed", score: 50 }
    ]);
  }).then(() => {
    console.log("Database populated successfully");
    mongoose.connection.close();
  }).catch(err => {
    console.error("Error populating database:", err);
    mongoose.connection.close();
  });
});
