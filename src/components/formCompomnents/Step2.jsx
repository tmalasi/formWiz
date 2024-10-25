import React, { useState } from "react";
import { useNavigate } from "react-router";

const Step2 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [workExperience, setWorkExperience] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    ongoing: false,
    description: "",
  });

  const existingWorkIndex = formData.workExperience.findIndex(
    (experience) => experience.position === workExperience.position
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkExperience((prev) => ({
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

    let updatedWorkExperience;
    if (existingWorkIndex !== -1) {
      updatedWorkExperience = formData.workExperience.map((experience, index) =>
        index === existingWorkIndex ? workExperience : experience
      );
    } else {
      updatedWorkExperience = [...formData.workExperience, workExperience];
    }

    try {
      const response = await fetch(`http://localhost:5000/cvs/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workExperience: updatedWorkExperience }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User updated:", data);

        setFormData((prevData) => ({
          ...prevData,
          workExperience: updatedWorkExperience,
        }));

        setWorkExperience({
          position: "",
          company: "",
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
    navigate("/step3");
  };

  const handlePrevious = () => {
    navigate("/step1");
  };

  return (
    <>
        <h1>Work Experience</h1>
    <form>
      <div>
        <label>Position:</label>
        <input
          type="text"
          name="position"
          value={workExperience.position}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Company:</label>
        <input
          type="text"
          name="company"
          value={workExperience.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={workExperience.startDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={workExperience.endDate}
          onChange={handleChange}
          disabled={workExperience.ongoing} 
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="ongoing"
            checked={workExperience.ongoing}
            onChange={handleChange}
          />
          Ongoing
        </label>
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={workExperience.description}
          onChange={handleChange}
        />
      </div>

      <button type="button" onClick={handlePrevious}>
        Previous
      </button>

      <button type="button" onClick={(e) => handleSubmit(e, false)}>
        {existingWorkIndex !== -1 ? "Update Work Experience" : "Add Work Experience"}
      </button>

      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
    </>
  );
};

export default Step2;
