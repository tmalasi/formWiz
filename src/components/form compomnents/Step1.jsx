import React, { useState } from 'react';

const Step1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    nationality: '',
    dob: '',
    linkedin: '',
    github: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here, such as saving the data or moving to the next step.
    console.log(formData);
  };

  return (
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
      <button type="submit">Next</button>
    </form>
  );
};

export default Step1;
