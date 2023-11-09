import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SessionDetailPage = () => {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the session details from the API
    const apiUrl = `https://class-schedule-pp4h.onrender.com/sessions/${sessionId}`;

    fetch(apiUrl)
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Session Details:", data);
        setSessionDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching session details:", error);
        setLoading(false);
      });
  }, [sessionId]);

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center mx-auto">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-sm font-semibold italic">Session Details:</h2>

        {loading ? (
          <p>Loading session details...</p>
        ) : !sessionDetails ? (
          <p>Error fetching session details.</p>
        ) : (
          <div>
            <h3 className="text-xl font-bold">{sessionDetails.name}</h3>
            <p className="text-sm font-normal">
              Announcement: {sessionDetails.announcements}
            </p>
            <p className="text-sm font-normal">
              Location: {sessionDetails.location}
            </p>
            <p className="text-sm font-normal">Date: {sessionDetails.date}</p>
            <p className="text-sm font-normal">
              Start Time:{" "}
              <span className="font-bold">{sessionDetails.start_time}</span>
            </p>
            <p className="text-sm font-normal">
              End Time:{" "}
              <span className="font-bold">{sessionDetails.end_time}</span>
            </p>
            <p>
              Invite link:{" "}
              <span class="text-blue-300 hover:text-blue-600 focus:text-blue-800">
                {sessionDetails.invite_link}
              </span>
            </p>
          </div>
        )}
      </div>
      <p className="text-sm font-semibold absolute top-0 right-0 m-4">
        <a
          href="/sessionlist"
          className="text-red-400 hover:text-red-700 focus:text-red-800"
        >
          Go Back to Session List
        </a>
      </p>
    </div>
  );
};

export default SessionDetailPage;