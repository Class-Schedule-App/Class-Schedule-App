// NotificationsList.js
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import AnnouncementList from "../Components/AnnouncementList";

const NotificationsList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch announcements related to sessions created on the same day
    fetch("http://127.0.0.1:5555/sessions") 
      .then((response) => response.json())
      .then((data) => {
        // Extract announcements from session data
        const allAnnouncements = data.sessions
          .flatMap((session) => session.announcements);

        setAnnouncements(allAnnouncements);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching announcements: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-20 p-10 bg-white">
      <Typography variant="h5">Announcements:</Typography>
      {loading ? (
        <p>Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className=" text-red-500">No announcements today.</p>
      ) : (
        <AnnouncementList announcements={announcements} />
      )}
    </div>
  );
};

export default NotificationsList;
