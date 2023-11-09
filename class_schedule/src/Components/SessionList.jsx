import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SessionList = () => {
  // State to store the list of sessions
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Define the URL of your API
    const apiUrl = "https://class-schedule-pp4h.onrender.com/sessions";

    // Fetch the list of sessions
    fetch(apiUrl)
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSessions(data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        setLoading(false);
      });
  }, []);

  const handleOnClick = (session) => {
    // Navigate to the session details page, passing the session ID as a param
    navigate(`/sessiondetails/${session.id}`);
  };

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center mx-auto ">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-sm font-light italic">List of Class Sessions:</h2>

        {loading ? (
          <p>Loading sessions...</p>
        ) : !Array.isArray(sessions) || sessions.length === 0 ? (
          <p>No sessions available.</p>
        ) : (
          <div className="flex flex-wrap justify-between">
            {sessions.map((session) => (
              <div
                className="m-2 p-4 border rounded-md"
                key={session.id}
                onClick={() => handleOnClick(session)}
              >
                <h3>{session.name}</h3>
                <p>Date: {session.date}</p>
                <Link
                  to={`/sessiondetails/${session.id}`}
                  className="text-blue-600 underline"
                >
                  Show More
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-sm font-semibold absolute top-0 right-0 m-4">
        <Link
          to="/"
          className="text-red-400 hover:text-red-700 focus:text-red-800"
        >
          Go Back to Dashboard?
        </Link>
      </p>{" "}
    </div>
  );
};

export default SessionList;
