// Create a component to display a list of available sessions. Each session can be a card with details like date, time, title, and description.
import React, { useEffect, useState } from 'react';

const SessionList = () => {
  // State to store the list of sessions
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the URL of your API
    const apiUrl = 'https://class-schedule-pp4h.onrender.com/sessions';

    // Fetch the list of sessions
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSessions(data.sessions);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sessions:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className='text-sm font-light italic'>List of Class Sessions:</h2>
      {loading ? (
        <p>Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p>No sessions available.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.session_id}>
              <strong>{session.name}</strong>
              <br />
              {session.announcements}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionList;
