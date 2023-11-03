// For TMs, create a form component to add or update session details.
import React, { useState } from 'react';

const SessionForm = ({ initialData, onSubmit }) => {
  const [sessionData, setSessionData] = useState(initialData);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the onSubmit function and pass the sessionData
    onSubmit(sessionData);
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
        <label>
          Invitation Link:
          <input
            type="text"
            value={sessionData.invitation_link}
            onChange={(e) =>
              setSessionData({ ...sessionData, invitation_link: e.target.value })
            }
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SessionForm;
