import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "./Table";

function ModuleDetails() {
  let { modId } = useParams();
  const [sess, setSession] = useState({});
  const [live, setLive] = useState(true);

  useEffect(() => {
    fetch(`/sessions/${modId}`)
      .then((r) => r.json())
      .then((sess) => setSession(sess));

    return () => setSession({});
  }, [modId]);

  const { name, date, start_time, end_time, invite_link, location } = sess;

  function handleToggleStock() {
    setLive(!live);
  }

  return (
    <div className="details border-grey border-2 rounded-xl shadow-lg p-4 m-4">
      <h1 className="text-3xl font-bold mb-2">Phase: {name}</h1>
      <h4 className="ext-2xl font-semibold mb-2">Date: {date}</h4>
      <h3 className="ext-2xl font-semibold mb-2">Start Time: {start_time}</h3>
      <h3 className="ext-2xl font-semibold mb-2">End Time: {end_time}</h3>
      <h3 className="ext-2xl font-semibold mb-2">Location: {location}</h3>
      <p className="text-sm ext-2xl text-indigo-600 mb-2">Invite Link: {invite_link}</p>
      <button className={`toggle-button mt-4 px-4 py-2 rounded text-white focus:outline-none ${live ? 'bg-green-500' : 'bg-red-500'}`} onClick={handleToggleStock}>
        {live ? 'In Session' : 'Postponed'}
      </button>
     
      <button className="nav-button" to={`/userlist/${modId}`}>
        <Link to={`/userlist/${modId}`} className="nav-link bg-sky-300 mt-4 px-4 py-2 rounded focus:outline-none text-blue-500">Add Module/Session attendees</Link>
      </button>
      <button className="nav-button mt-4" to="/mod">
        <Link to="/mod" className="nav-link text-indigo-200 mt-4 px-4 py-2 rounded focus:outline-none bg-orange-600">Back to Sessions Page</Link>
      </button>
      <Table />
    </div>
  );
}

export default ModuleDetails;