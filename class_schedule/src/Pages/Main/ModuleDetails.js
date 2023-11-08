import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ModuleDetails() {
  let { modId } = useParams();
  const [module, setModule] = useState({});

  useEffect(() => {
    fetch(`/modules/${modId}`)
      .then((r) => r.json())
      .then((module) => {setModule(module); console.log(module)});

    return () => setModule({});
  }, [modId]);

  const { module_name, date, time, invite_link } = module;

  const [live, setlive] = useState(true);

  function handleToggleStock() {
    setlive((live) => !live);
  }

  return (
    <div className="details">
      <h1>{modId}</h1>
      <h4>{module_name}</h4>
      <p>Time: {time}</p>
      <p>Invite Link: {invite_link}</p>
      <p>Date: {date}</p>
      <button className={`toggle-button ${live ? 'in-session' : 'postponed'}`} onClick={handleToggleStock}>
        {live ? "In Session" : "Postponed"}
      </button>
      <Link to="/mod" className="nav-link">Back to Modules Page</Link>
      <Link to={`/userlist/${modId}`} className="nav-link">Student List</Link>
    </div>
  );
}

export default ModuleDetails;
