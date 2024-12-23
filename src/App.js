// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const candidateId = "676946442d3e1364b9957df4"; 

  // Fetch projects
  useEffect(() => {
    axios.get("http://localhost:5000/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // Fetch assignments
  useEffect(() => {
    axios.get(`http://localhost:5000/assignments/${candidateId}`)
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, [candidateId]);

  // Assign a project
  const assignProject = (projectId) => {
    axios.post("http://localhost:5000/assignments", { candidateId, projectId })
      .then(() => alert("Project assigned successfully!"))
      .catch((error) => console.error("Error assigning project:", error));
  };

  // Update assignment
  const updateAssignment = (assignmentId, status, score) => {
    axios.put(`http://localhost:5000/assignments/${assignmentId}`, { status, score })
      .then(() => alert("Assignment updated successfully!"))
      .catch((error) => console.error("Error updating assignment:", error));
  };

  return (
    <div className="App">
      <h1>Project Management</h1>

      <section>
        <h2>Available Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button onClick={() => assignProject(project._id)}>Assign Project</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Your Assignments</h2>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment._id}>
              <h3>{assignment.projectId.title}</h3>
              <p>Status: {assignment.status}</p>
              <p>Score: {assignment.score}</p>
              <button onClick={() => updateAssignment(assignment._id, "In Progress", assignment.score)}>Mark In Progress</button>
              <button onClick={() => updateAssignment(assignment._id, "Completed", assignment.score + 10)}>Mark Completed</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
