import React from 'react';
import { useNavigate } from "react-router-dom";
import { faHome, faBullhorn, faListAlt, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Header({ activeComponent, setActiveComponent }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  return (
  <>
     <header>
      <h1>
        Moringa Technical Mentors
        <span className="logo" role="img">
          📚
        </span>
      </h1>
    </header>  

    <nav className="bg-zinc-100 py-4">
        <div className="container flex justify-between items-center text-2xl">
          <div className=" lg:flex justify-around w-full">
            <ul className="flex items-center space-x-6 w-full justify-around">
              <li 
              onClick={() => setActiveComponent('search')}
              className={activeComponent === 'search' ? 'active' : ''}
              >
                  <FontAwesomeIcon icon={faListAlt} className="beat" size="1x" />
                  <span>View Schedules</span>
              </li>
              <li 
              onClick={() => setActiveComponent('newMod')}
              className={activeComponent === 'newMod' ? 'active' : ''}
              >
                  <FontAwesomeIcon icon={faHome} className="d-lg-none" />
                  <span>Create a new Schedule</span>
              </li>
              <li 
              onClick={() => setActiveComponent('announcement')}
              className={activeComponent === 'announcement' ? 'active' : ''}
              >
                  <FontAwesomeIcon icon={faBullhorn} className="d-lg-none" />
                  <span>Make an announcement</span>
              </li>
              <li 
              onClick={() => setActiveComponent('A-List')}
              className={activeComponent === 'A-List' ? 'active' : ''}
              >
                  <FontAwesomeIcon icon={faListAlt} className="beat" size="1x" />
                  <span>View Announcement</span>
              </li>             
              <li>
                  <FontAwesomeIcon icon={faUser} beat size="1x" className="faThrob d-lg-none" />
                  < Link to={`/userprofile`}><span>TM-Profile</span></Link>
              </li>
              <li onClick={() => handleLogout()}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="d-lg-none" />
                  <span>Log-Out</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;