// Design a page to view course announcements and interact with them (e.g., commenting and liking).

import React, { useState, useEffect } from "react";
import AnnouncementList from "../Components/AnnouncementList";
import Header from "../Components/Header";
// import { Link } from 'react-router-dom';

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // BACKEND
    fetch("https://class-schedule-pp4h.onrender.com/sessions")
      .then((response) => response.json())
      .then((data) => {
        const sessionAnnouncements = data.sessions.map((session) => ({
          id: session.session_id[1],
          text: session.announcements,
          sessionName: session.name,
        }));
        setAnnouncements(sessionAnnouncements);
      })

      .catch((error) => console.error("Error fetching announcements:", error));
  }, []);

  const handleDeleteAnnouncement = (announcementId) => {
    // BACKEND
    fetch(`http://127.0.0.1:5555/announcements/${announcementId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedAnnouncements = announcements.filter(
          (announcement) => announcement.id !== announcementId
        );
        setAnnouncements(updatedAnnouncements);
      })
      .catch((error) => console.error("Error deleting announcement:", error));
  };

  return (
    <div>
      <Header />
      {/* <h2>Announcements</h2> */}
      <AnnouncementList
        announcements={announcements}
        onDelete={handleDeleteAnnouncement}
      />
      {/* <Link to="/post">
        <button>Post an Announcement</button>
      </Link> */}
    </div>
  );
};

export default AnnouncementPage;
