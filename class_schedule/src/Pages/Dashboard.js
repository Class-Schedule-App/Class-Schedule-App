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


export default function Dashboard({userRole, onLogin}) {
  // const userRole = useSelector((state) => state.userType.userType);


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
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <IconButton component={Link} to="/profile" color="primary">
          <AccountCircleIcon />
        </IconButton>
      </div>
      <h1>Dashboard</h1>
      {userRole === "mentor" ? <ModuleManagementPage /> : <ModuleListPage />}

      <h2>Sessions</h2>
      <SessionList />

      <h2>Announcements </h2>
      <AnnouncementList />
      {userRole === "student" && (
        <>
          {hasNewNotifications ? (
            <IconButton color="warning">
              {" "}
              {/* Display yellow icon when there are new notifications */}
              <NotificationsIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit">
              {" "}
              {/* Display white icon when no new notifications */}
              <NotificationsIcon />
            </IconButton>
          )}
        </>
      )}
      {userRole === "student" && (
        <Link to="/notificationsettings">
          <Button variant="outlined" color="primary">
            Manage Notification Settings
          </Button>
        </Link>
      )}
    </div>
  );
}
