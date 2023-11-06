// NotificationsList.js
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AnnouncementList from "../Components/AnnouncementList";
import { Link } from "react-router-dom";

const NotificationsList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch announcements related to sessions created on the same day
    fetch("http://127.0.0.1:5555/sessions")
      .then((response) => response.json())
      .then((data) => {
        // Extract announcements from session data
        const allAnnouncements = data.sessions.flatMap(
          (session) => session.announcements
        );

        setAnnouncements(allAnnouncements);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching announcements: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-6 p-2 bg-white">
      <div>
        <Typography variant="h5">Announcements:</Typography>
        {loading ? (
          <p>Loading announcements...</p>
        ) : announcements.length === 0 ? (
          <p className=" text-red-500">No announcements today.</p>
        ) : (
          <AnnouncementList announcements={announcements} />
        )}
      </div>
      <div className=" flex space-x-2 mt-5">
        <h3 className="font-semibold">Change your Notifications settings?</h3>
        <Link to="/notificationsettings">
          <button className="text-blue-300 hover:text-blue-600 focus:text-blue-700 duration-150">
            click here
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotificationsList;
