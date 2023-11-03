// Develop the main dashboard page where users can see the list of sessions, announcements, and navigate to their profile.
import React from "react";
import SessionList from "../Components/SessionList";
import AnnouncementList from "../Components/AnnouncementList";
import ModuleListPage from "../Pages/ModuleListPage";

import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
  };

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
      <div className="flex mt-20 p-10">
        <div className="w-1/2 pr-2 border rounded border-gray-400 p-4">
          <h2 className="text-xl font-semibold ">Sessions</h2>
          <div className="mt-5 mb-5 items-center w-50%">
            {/* <SessionList /> */}
          </div>

          <h2 className="text-xl font-semibold">Annoucements:</h2>
          <AnnouncementList />
        </div>
        <div className="w-1/2 pl-2 border rounded border-gray-400 p-4 ml-2">
          <h2 className="text-xl font-semibold">Modules</h2>
          <ModuleListPage />

          <h3 className="text-sm font-semibold">
            Manage Modules?{" "}
            <span className="text-sm text-red-300"> for mentors </span>{" "}
          </h3>
          <Link to="/modulemanagement">
            <Button variant="outlined" color="primary">
              Manage Modules
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
