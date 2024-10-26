import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

///TAKES ONLY ONE WORK EXPERIENCE WITH THWE UPDATES HAVE TO FIX.
const Step2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [workExperience, setWorkExperience] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    ongoing: false,
    description: "",
  });

  const userId = location.state?.userId;

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const userData = await response.json();

        if (userData.workExperience && userData.workExperience.length > 0) {
          const userExperience = userData.workExperience[0];
          setWorkExperience(userExperience);
        }
      } catch (error) {
        console.error(`Error fetching experience data: ${error.message}`);
      }
    };

    if (userId) fetchWorkExperience();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkExperience((prev) => ({
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
        body: JSON.stringify({ workExperience: [workExperience] }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User updated:", data);

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
    navigate("/step3", { state: { userId } });
  };

  const handlePrevious = () => {
    navigate("/step1", { state: { userId } });
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

        <button type="button" onClick={handleSubmit}>
          {workExperience.position ? "Update Work Experience" : "Add Work Experience"}
        </button>

        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </>
  );
};

export default Step2;
