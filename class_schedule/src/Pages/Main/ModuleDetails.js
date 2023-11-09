import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ModuleDetails() {
  let { modId } = useParams();
  const [sess, setSession] = useState({});

  useEffect(() => {
    fetch(`/sessions/${modId}`)
      .then((r) => r.json())
      .then((sess) => {setSession(sess); console.log(sess)});

    return () => setSession({});
  }, [modId]);

  const { name, date, start_time, end_time, invite_link, location } = sess;

  const [live, setlive] = useState(true);

  function handleToggleStock() {
    setlive((live) => !live);
  }

  return (
    <div className="details">
      <h1>Phase: {name}</h1>
      <p>Date: {date}</p>
      <p>Start Time: {start_time}</p>
      <h4>End Time: {end_time}</h4>
      <h4>Location: {location}</h4>
      <p>Invite Link: {invite_link}</p>
      <button className={`toggle-button ${live ? 'in-session' : 'postponed'}`} onClick={handleToggleStock}>
        {live ? "In Session" : "Postponed"}
      </button>
      <Link to="/mod" className="nav-link">Back to Sessions Page</Link>
      <Link to={`/userlist/${modId}`} className="nav-link">Session attendees</Link>
    </div>
  );
}

export default ModuleDetails;
