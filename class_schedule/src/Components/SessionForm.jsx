// For TMs, create a form component to add or update session details.
import React, { useState } from 'react';

const SessionForm = () => {
  const [sessionData, setSessionData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the sessionData object to make an API call to add/update the session details
    console.log('Session Data:', sessionData); // Replace with actual API call
    // Reset form fields
    setSessionData({
      title: '',
      date: '',
      time: '',
      description: '',
    });
  };

  return (
    <div className="session-form">
      <h2>Add or Update Session</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={sessionData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={sessionData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={sessionData.time}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={sessionData.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SessionForm;
