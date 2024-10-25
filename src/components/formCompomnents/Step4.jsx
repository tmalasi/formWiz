import React, { useState } from "react";
import { useNavigate } from "react-router";

const Step4 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [education, setEducation] = useState({
    title: "",
    school: "",
    year: "",
    country: "",
  });

  const existingEducationIndex = formData.education.findIndex(
    (edu) => edu.title === education.title
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      console.error("User ID is missing. Cannot update user.");
      return;
    }

    let updatedEducation;
    if (existingEducationIndex !== -1) {
      updatedEducation = formData.education.map((edu, index) =>
        index === existingEducationIndex ? education : edu
      );
    } else {
      updatedEducation = [...formData.education, education];
    }

    try {
      const response = await fetch(`http://localhost:5000/cvs/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ education: updatedEducation }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User updated:", data);

        setFormData((prevData) => ({
          ...prevData,
          education: updatedEducation,
        }));
        setEducation({
          title: "",
          school: "",
          year: "",
          country: "",
        });
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNext = () => {
    navigate ("/card" );
  };

  const handlePrevious = () => {
    navigate("/step3"); 
  };

  return (
    <>
        <h1>Education</h1>
    <form>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={education.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>School:</label>
        <input
          type="text"
          name="school"
          value={education.school}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="text"
          name="year"
          value={education.year}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={education.country}
          onChange={handleChange}
        />
      </div>

      <button type="button" onClick={handlePrevious}>
        Previous
      </button>

      <button type="button" onClick={(e) => handleSubmit(e, false)}>
        {existingEducationIndex !== -1 ? "Update Education" : "Add Education"}
      </button>

      <button type="button" onClick={handleNext}>
        Next
      </button>
    </form>
    </>
  );
};

export default Step4;
