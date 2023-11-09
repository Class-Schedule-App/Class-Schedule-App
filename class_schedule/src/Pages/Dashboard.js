// Develop the main dashboard page where users can see the list of sessions, announcements, and navigate to their profile.
import React from 'react'
import SessionList from '../Components/SessionList';
import AnnouncementList from '../Components/AnnouncementList';
import ModuleListPage from '../Pages/ModuleListPage';
import ModuleManagementPage from '../Pages/ModuleManagementPage';
import getUserRole from '../Pages/Login';
import IconButton from '@mui/material/IconButton';
// import AccountCircleIcon from '@mui/icons-material/AccountCircleRounded'
import { Link } from 'react-router-dom';


export default function Dashboard() {
  const userRole = getUserRole();

  return (
    <div>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }} >
          <IconButton component={Link} to="/profile" color="primary" >
            Profile
          </IconButton>
        </div>
        <h1>Dashboard</h1>
        {userRole === 'mentor' ? <ModuleManagementPage /> : <ModuleListPage />}
       
        <h2>Sessions</h2>
        <SessionList />

        <h2>Announcements </h2>
        <AnnouncementList />
    </div>
  );
}
