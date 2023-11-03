// Develop the main dashboard page where users can see the list of sessions, announcements, and navigate to their profile.
import React from "react";
import SessionList from "../Components/SessionList";
import AnnouncementList from "../Components/AnnouncementList";
import ModuleListPage from "../Pages/ModuleListPage";
import ModuleManagementPage from "../Pages/ModuleManagementPage";

import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Header from "../Components/Header";
import { useState } from "react";


function Dashboard() {
  // const userRole = useSelector((state) => state.userType.userType);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("student");

  // a function to handle user login
  const handleLogin = (user, userType) => {
    setUser(user);
    setUserRole(userType);
  };
  
  const handleLogout = () => {
    setUser(null);
  }



  // Check the notification settings in localStorage
  const savedSettings = JSON.parse(
    localStorage.getItem("notificationSettings")
  );
  const hasModuleInvites = savedSettings?.moduleInvites || false;
  const hasSessionInvites = savedSettings?.sessionInvites || false;

  // Determine if there are new notifications
  const hasNewNotifications = hasModuleInvites || hasSessionInvites;

  return (
    <div>
      <div className="mb-5 p-2">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />  
      </div>
      {/* <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <IconButton component={Link} to="/profile" color="primary">
          <AccountCircleIcon />
        </IconButton>
      </div> */}
      <h1 className="mt-20 p-10">Dashboard</h1>

    </div>
  );
}

export default Dashboard;