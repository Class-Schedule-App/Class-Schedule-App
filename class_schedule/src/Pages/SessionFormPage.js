import React, { useState } from 'react';

const SessionFormPage = () => {
  const [sessionData, setSessionData] = useState({
    session_name: '',
    session_time: '',
    description: '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const apiUrl = 'http://127.0.0.1:5555/api/sessions';

    fetch(apiUrl, {
      method: 'POST', // Change to 'PUT' for updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    })
      .then((response) => response.json())
      .then((data) => console.log('Session created:', data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Create or Update Session</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Session Name:
          <input
            type="text"
            value={sessionData.session_name}
            onChange={(e) =>
              setSessionData({ ...sessionData, session_name: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Session Time:
          <input
            type="text"
            value={sessionData.session_time}
            onChange={(e) =>
              setSessionData({ ...sessionData, session_time: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={sessionData.description}
            onChange={(e) =>
              setSessionData({ ...sessionData, description: e.target.value })
            }
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SessionFormPage;

