import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Step4 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [education, setEducation] = useState({
    title: "",
    school: "",
    year: "",
    country: "",
  });

  const userId = location.state?.userId;

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cvs/${userId}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const userData = await response.json();

        if (userData.education && userData.education.length > 0) {
          setEducation(userData.education[0]); // Set to first education entry or modify as needed
        }
      } catch (error) {
        console.error(`Error fetching education data: ${error.message}`);
      }
    };

    if (userId) fetchEducation();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation((prev) => ({
      ...prev,
      [name]: value,
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
        body: JSON.stringify({ education: [education] }), // Send education data as an array
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User updated:", data);

        // Clear form fields after successful update
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
    navigate("/card");
  };

  const handlePrevious = () => {
    navigate("/step3", { state: { userId } });
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

        <button type="button" onClick={handleSubmit}>
          {education.title ? "Update Education" : "Add Education"}
        </button>

        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </>
  );
};

export default Step4;
