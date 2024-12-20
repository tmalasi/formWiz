import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Step1 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState(location.state?.userId || null);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    nationality: "",
    dob: "",
    linkedin: "",
    github: "",
    dateCreate: "",
    workExperience: [],
    projects: [],
    education: [],
  });

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3000/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setFormData({
              name: data.name || "",
              surname: data.surname || "",
              email: data.email || "",
              phone: data.phone || "",
              nationality: data.nationality || "", // corrected typo
              dob: data.dob || "",
              linkedin: data.linkedin || "",
              github: data.github || "",
              dateCreate: data.dateCreate || "",
              workExperience: data.workExperience || [],
              projects: data.projects || [],
              education: data.education || [],
            });
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cvs = {
      ...formData,
      dateCreate: new Date().toISOString(),
    };

    try {
      let response;
      if (userId) {
        response = await fetch(`http://localhost:5000/cvs/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cvs),
        });
      } else {
        response = await fetch("http://localhost:5000/cvs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cvs),
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log("CV saved/updated:", data);
        setFormData((prevData) => ({ ...prevData, id: data.id }));
        setUserId(data.id);
      } else {
        console.error("Failed to save/update CV:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1>Personal Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nationality:</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>LinkedIn:</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>GitHub:</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{userId ? "Update" : "Submit"}</button>
        <button
          type="button"
          onClick={() => navigate("/step2", { state: { userId } })}
        >
          Next
        </button>
      </form>
    </>
  );
};

export default Step1;
