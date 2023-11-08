import { Link } from "react-router-dom";

function ModCard({ module }) {
  const { id, module_name, date, time, invite_link } = module;

  return (
    <li className="card">
      <Link to={`/mod/${id}`}>
        <div>
          <h1>Card {id}</h1>
          <h4>{module_name}</h4>
          <p>Time: {time}</p>
          <p>invite_link: {invite_link}</p>
          <p>date: {date}</p>   
        </div>  
      </Link>  
    </li>
  );
}

export default ModCard;
