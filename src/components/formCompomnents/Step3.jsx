import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Step3 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [projects, setProjects] = useState({
    projectName: "",
    category: "",
    startDate: "",
    endDate: "",
    ongoing: false,
    description: "",
  });

  const userId = location.state?.userId;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cvs/${userId}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const userData = await response.json();

        if (userData.projects && userData.projects.length > 0) {
          setProjects(userData.projects[0]); // Set the first project or modify as needed
        }
      } catch (error) {
        console.error(`Error fetching project data: ${error.message}`);
      }
    };

    if (userId) fetchProjects();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjects((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID is missing. Cannot update user.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/cvs/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projects: [projects] }), // Replace with an array of projects if there are multiple
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User updated:", data);

        // Reset the form after updating
        setProjects({
          projectName: "",
          category: "",
          startDate: "",
          endDate: "",
          ongoing: false,
          description: "",
        });
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNext = () => {
    navigate("/step4", { state: { userId } });
  };

  const handlePrevious = () => {
    navigate("/step2", { state: { userId } });
  };

  return (
    <>
      <h1>Projects</h1>
      <form>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            name="projectName"
            value={projects.projectName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Project Category:</label>
          <input
            type="text"
            name="category"
            value={projects.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={projects.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={projects.endDate}
            onChange={handleChange}
            disabled={projects.ongoing}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="ongoing"
              checked={projects.ongoing}
              onChange={handleChange}
            />
            Ongoing
          </label>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={projects.description}
            onChange={handleChange}
          />
        </div>

        <button type="button" onClick={handlePrevious}>
          Previous
        </button>

        <button type="button" onClick={(e) => handleSubmit(e)}>
          {projects.projectName ? "Update Project" : "Add Project"}
        </button>

        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </>
  );
};

export default Step3;
