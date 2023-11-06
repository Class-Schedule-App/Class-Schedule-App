import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";

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
      {/* <img src={image} alt={name} /> */}
      <Header />
      <h1>{modId}</h1>
      <h4>{module_name}</h4>
      <p>Time: {time}</p>
      <p>invite_link: {invite_link}</p>
      <p>date: {date}</p>
      {live ? (
        <button className="primary" onClick={handleToggleStock}>
          In Session
        </button>
      ) : (
        <button onClick={handleToggleStock}>Postponed</button>
      )}
      <Link to='/mod'>back to Modules Page</Link>
    </div>
  );
}

export default ModuleDetails;
