// Create a component to display a list of available sessions. Each session can be a card with details like date, time, title, and description.
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SessionList = () => {
  // State to store the list of sessions
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    // Define the URL of your API
    const apiUrl = "https://class-schedule-pp4h.onrender.com/sessions";

    // Fetch the list of sessions
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSessions(data.sessions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center mx-auto ">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-sm font-light italic">List of Class Sessions:</h2>

        {loading ? (
          <p>Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p>No sessions available.</p>
        ) : (
          <ul>
            {sessions.map((session) => (
              <li key={session.session_id}>
                <strong>{session.name}</strong>
                <br />
                {selectedSession === session.session_id ? (
                  <div>
                    <p>{session.announcements}</p>
                    <button
                      onClick={() => setSelectedSession(null)}
                      className="text-blue-600 underline"
                    >
                      Close Details
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedSession(session.session_id)}
                    className="text-blue-600 underline"
                  >
                    View Session Details
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-sm font-semibold absolute top-0 right-0 m-4">
        <Link
          to="/"
          className="text-red-400 hover:text-red-700 focus:text-red-800"
        >
          Go Back to Dashboard?
        </Link>
      </p>
      t{" "}
    </div>
  );
};

export default SessionList;