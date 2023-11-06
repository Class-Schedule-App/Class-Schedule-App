import React, { useState, useEffect } from 'react';

const SessionDetailPage = ({ sessionID }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://class-schedule-pp4h.onrender.com/sessions/' + sessionID;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setSession(data))
      .catch((error) => console.error('Error:', error));
  }, [sessionID]);

  if (!session) {
    return <div>Loading session details...</div>;
  }

  return (
    <div>
      <h2>{session.session_name}</h2>
      <p>Time: {session.session_time}</p>
      <p>Description: {session.description}</p>

      {/* You can include additional details or components here */}
    </div>
  );
};

export default SessionDetailPage;

