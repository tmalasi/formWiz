import React, { useState } from "react";
import { useNavigate } from "react-router";

const Step3 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState({
    projectName: "",
    category: "",
    startDate: "",
    endDate: "",
    ongoing: false,
    description: "",
  });

  const existingProjectIndex = formData.projects.findIndex(
    (project) => project.projectName === projects.projectName
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjects((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      console.error("User ID is missing. Cannot update user.");
      return;
    }

    let updatedProjects;
    if (existingProjectIndex !== -1) {
      updatedProjects = formData.projects.map((project, index) =>
        index === existingProjectIndex ? projects : project
      );
    } else {
      updatedProjects = [...formData.projects, projects];
    }

    try {
      const response = await fetch(
        `http://localhost:5000/cvs/${formData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projects: updatedProjects }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User updated:", data);

        setFormData((prevData) => ({
          ...prevData,
          projects: updatedProjects,
        }));

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
    navigate("/step4");
  };

  const handlePrevious = () => {
    navigate("/step2"); 
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

      <button type="button" onClick={(e) => handleSubmit(e, false)}>  {existingProjectIndex !== -1 ? "Update Project" : "Add Project"}</button>

      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
    </>
  );
};

export default Step3;
