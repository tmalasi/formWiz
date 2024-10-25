import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Display = () => {
  const { id } = useParams(); // Get the dynamic id from the URL
  const location = useLocation();
  const { cv } = location.state || {}; // Get the CV data from location state
  // const navigate = useNavigate(); 

  if (!cv) {
    return <p>No CV data available for ID: {id}.</p>; // Handle case where no CV data is found
  }
  // const handleEdit=()=>{
    
  // }

  return (
    <div className="cv-display-container">
      <h1>Display CV</h1>
      
      <div className="cv-section">
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> {cv.name}</p>
        <p><strong>Surname:</strong> {cv.surname}</p>
        <p><strong>Email:</strong> {cv.email}</p>
        <p><strong>Phone:</strong> {cv.phone}</p>
        <p><strong>Nationality:</strong> {cv.nationality}</p>
        <p><strong>Date of Birth:</strong> {cv.dob}</p>
        <p><strong>LinkedIn:</strong> {cv.linkedin}</p>
        <p><strong>GitHub:</strong> {cv.github}</p>
      </div>

      <div className="cv-section">
        <h2>Work Experience</h2>
        {cv.workExperience.length > 0 ? (
          <ul className="cv-list">
            {cv.workExperience.map((experience, index) => (
              <li key={index} className="cv-list-item">
                <p><strong>Position:</strong> {experience.position}</p>
                <p><strong>Company:</strong> {experience.company}</p>
                <p><strong>Start Date:</strong> {experience.startDate}</p>
                <p><strong>End Date:</strong> {experience.ongoing ? "Ongoing" : experience.endDate}</p>
                <p><strong>Job Description:</strong> {experience.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No work experience added.</p>
        )}
      </div>

      <div className="cv-section">
        <h2>Projects</h2>
        {cv.projects.length > 0 ? (
          <ul className="cv-list">
            {cv.projects.map((project, index) => (
              <li key={index} className="cv-list-item">
                <p><strong>Project Name:</strong> {project.projectName}</p>
                <p><strong>Category:</strong> {project.category}</p>
                <p><strong>Start Date:</strong> {project.startDate}</p>
                <p><strong>End Date:</strong> {project.ongoing ? "Ongoing" : project.endDate}</p>
                <p><strong>Description:</strong> {project.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects added.</p>
        )}
      </div>

      <div className="cv-section">
        <h2>Education</h2>
        {cv.education.length > 0 ? (
          <ul className="cv-list">
            {cv.education.map((edu, index) => (
              <li key={index} className="cv-list-item">
                <p><strong>Title:</strong> {edu.title}</p>
                <p><strong>School:</strong> {edu.school}</p>
                <p><strong>Year:</strong> {edu.year}</p>
                <p><strong>Country:</strong> {edu.country}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No education added.</p>
        )}
      </div>
      {/* <button onClick={handleEdit}>Edit</button> */}
    </div>
  );
};

export default Display;
