import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

const ModuleListPage = () => {
  const [modules, setModules] = useState([]);
  const [showInviteLink, setShowInviteLink] = useState({});

  useEffect(() => {
    // Fetch modules data for students
    const fetchModules = async () => {
      try {
        const response = await axios.get(
          "https://class-schedule-pp4h.onrender.com/modules"
        );
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, []);

  const handleToggleShowInviteLink = (moduleId) => {
    setShowInviteLink((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  return (
    <div className="module-list-page flex flex-wrap">
      <Typography
        variant="h6"
        style={{ fontWeight: "600", alignItems: "center", content: "center" }}
      >
        Available Modules:
      </Typography>
      {modules.map((module) => (
        <div
          key={module.id}
          className="border p-4 m-2 flex-1 min-w-1/4 max-w-1/3"
        >
          <Link
            to={`/modules/${module.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6">{module.module_name}</Typography>
          </Link>
          <Typography>Date: {module.date}</Typography>
          <Typography>Time: {module.time}</Typography>
          {showInviteLink[module.id] ? (
            <div>
              <Typography>Invite Link: {module.invite_link}</Typography>
              <button
                className="bg-blue-500 text-white border-none px-2 py-1 rounded mt-2 cursor-pointer hover:bg-blue-700"
                onClick={() => handleToggleShowInviteLink(module.id)}
              >
                Show Less
              </button>
            </div>
          ) : (
            <div>
              <button
                className="bg-blue-500 text-white border-none px-2 py-1 rounded mt-2 cursor-pointer hover:bg-blue-700"
                onClick={() => handleToggleShowInviteLink(module.id)}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModuleListPage;