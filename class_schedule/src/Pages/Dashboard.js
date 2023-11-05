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
import SessionDetailPage from "./SessionDetailPage";
import ModuleDetailPage from "./ModuleDetailPage";

function Dashboard() {
  const userRole = useSelector((state) => state.userType.userType);
  const [user, setUser] = useState(null);
  // const [userRole, setUserRole] = useState("student");

  // a function to handle user login
  const handleLogin = (user, userType) => {
    setUser(user);
    //setUserRole(userType);
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
    <div className="flex flex-col h-screen relative">
      <div className="mb-4 p-2">
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      </div>
      <div className="flex mt-20 p-6 flex-grow">
        <div className="text-right top-0 right-0 mt-24 p-12 z-15 absolute">
          <Link to="/notifications">
            <IconButton
              color="primary"
              className="text-white bg-blue-300 rounded-full hover:bg-blue-600 focus:bg-blue-800 duration-150"
            >
              <NotificationsIcon className="text-blue" />
            </IconButton>
          </Link>
        </div>
        <div className="w-1/2 pr-2 border rounded border-gray-400 p-4">
          <h2 className="text-xl font-semibold ">Sessions</h2>
          <div className="mt-5 mb-5 items-center w-50%">
            <Link to="/session">
              <img
                src={process.env.PUBLIC_URL + "/Images/Session.jpg"}
                alt="Session"
                className="rounded-md w-full h-full object-cover transform scale-100 hover:scale-110 focus:scale-110 transition-transform duration-150"
              />
            </Link>
          </div>

          <h2 className="text-xl font-semibold">Session Description:</h2>
          <SessionDetailPage />
        </div>
        <div className="w-1/2 pl-2 border rounded border-gray-400 p-4 ml-2">
          <h2 className="text-xl font-semibold">Modules</h2>
          <div className="mt-5 mb-5 items-center w-50%">
            <Link to="/modules">
              <img
                src={process.env.PUBLIC_URL + "/Images/Modules.jpg"}
                alt="Module"
                className="rounded-md w-full h-full object-cover transform scale-100 hover:scale-110 focus:scale-110 transition-transform duration-150"
              />
            </Link>
          </div>
          <h2 className="text-xl font-semibold mt-5 mb-5">Module Details</h2>
          <ModuleDetailPage />

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
      <div className="bg-red-400 h-20 flex items-center mt-0">
        <div className="w-1/2">
          <div className="text-center pl-4">
            <h3 className="text-white">Contact Support</h3>
            <p className="text-black hover:text-blue-300 focus:text-blue-700 duration-150">
              Email: support@moringaschool.com
            </p>
            <p className="text-black hover:text-blue-300 focus:text-blue-700 duration-150">
              Phone: +254 70000000
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <div className="text-center pr-4">
            <h3 className=" text-white">Follow Us</h3>
            <a
              href="https://www.facebook.com"
              className="text-black mr-4 hover:text-blue-300 focus:text-blue-700 duration-150"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              className="text-black mr-4 hover:text-blue-300 focus:text-blue-700 duration-150"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              className="text-black hover:text-blue-300 focus:text-blue-700 duration-150"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
