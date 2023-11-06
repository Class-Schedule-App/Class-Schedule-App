// Build a component for displaying detailed information about a session, including the invitation link and attendees.
import React from 'react';

const SessionDetails = ({ session }) => {
  if (!session) {
    return <div>Loading session details...</div>;
  }

  return (
    <div>
      <h2>{session.session_name}</h2>
      <p>Time: {session.session_time}</p>
      <p>Description: {session.description}</p>

      <h3>Invitation Link</h3>
      <a href={session.invitation_link} target="_blank" rel="noopener noreferrer">
        Join Session
      </a>

      <h3>Attendees</h3>
      <ul>
        {session.attendees.map((attendee) => (
          <li key={attendee.id}>{attendee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SessionDetails;

