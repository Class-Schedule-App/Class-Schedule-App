// Develop the main dashboard page where users can see the list of sessions, announcements, and navigate to their profile.
import React from 'react'
import SessionList from '../Components/SessionList';
import AnnouncementList from '../Components/AnnouncementList';



export default function Dashboard() {
  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Sessions</h2>
        <SessionList />

        <h2>Announcements </h2>
        <AnnouncementList />
    </div>
  );
}
