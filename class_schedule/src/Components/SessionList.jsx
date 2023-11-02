// Create a component to display a list of available sessions. Each session can be a card with details like date, time, title, and description.
import React from 'react';
import AvailableSessions from './AvailableSessions'; // Import your component

const SessionPage = () => {
  // Sample session data
  const sessions = [
    {
      title: 'Session 1',
      date: '2023-11-01',
      time: '10:00 AM',
      description: 'Description for Session 1',
    },
    {
      title: 'Session 2',
      date: '2023-11-02',
      time: '2:00 PM',
      description: 'Description for Session 2',
    },
    // Add more session objects here...
  ];

  return (
    <div>
      <h1>Available Sessions</h1>
      <AvailableSessions sessions={sessions} />
    </div>
  );
};

export default SessionPage;
