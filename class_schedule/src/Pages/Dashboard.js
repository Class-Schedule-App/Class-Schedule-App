// Develop the main dashboard page where users can see the list of sessions, announcements, and navigate to their profile.
import React from "react";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Header from "../Components/Header";
import { logoutUser } from "../redux/authActions";

function Dashboard() {
  //const userRole = useSelector((state) => state.user.user_type);
  const user = useSelector(state => state.userID.user_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [array, setArray] = useState([]);

  useEffect(() => {
    // Check if the user ID is defined.
    if (!user) {
      // Navigate to the login page if the user is not logged in.
      navigate('/login');
  
      // Add a message to the user informing them that they need to log in to access the dashboard.
      alert('You need to log in to access the dashboard.');
    }
  
    // Get the user ID from the Redux state.
    const userId = user;
  
    // Make a GET request to the `/user/userId` endpoint, passing the user ID.
    fetch(`/users/${userId}`)
      .then((response) => {
        // Check if the response is OK before converting to JSON.
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        // Update the state with the retrieved data.
        setArray(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        // Handle the error if needed.
      });
  }, [user]);
  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    dispatch(logoutUser());
    navigate('/login')
    
  };

  // State for search query and results
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to update search results
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    
  };
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  // Check the notification settings in localStorage
  const savedSettings = JSON.parse(
    localStorage.getItem("notificationSettings")
  );
  const hasModuleInvites = savedSettings?.moduleInvites || false;
  const hasSessionInvites = savedSettings?.sessionInvites || false;

  // Determine if there are new notifications
  const hasNewNotifications = hasModuleInvites || hasSessionInvites;

  return (
    <div className="flex flex-col h-screen relative">
      <div className="mb-4 p-2">
        <Header
          user={user}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          searchResults={searchResults}
          setSearchResults={handleSearchResults}
        />
      </div>
      <div >
        {/* Display search results */}
        {searchResults.length > 0 && (
          <div className="flex mt-20 p-6 flex-grow">
            <h3 className="justify-center items-center mb-2 p-2 font-semibold">
              Search Results:{" "}
            </h3>
            <ul className="list-none p-0 m-0">
              {searchResults.map((result, index) => (
                <li key={index}>
                  <Link to={`/sessiondetails/${result.id}`}>
                    <strong>{result.name}</strong>
                  </Link>
                  <br />
                  {/* Display session invite link */}
                  {result.invite_link}
                </li>
              ))}
            </ul>
            <p>
              <button
                type="button"
                className="mt-4 mx-auto bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setSearchResults([])}
              >
                Clear Search
              </button>
            </p>
          </div>
        )}
      </div>
      <div className="flex mt-20 p-6 flex-grow">
        <div className="text-right top-0 right-0 mt-24 p-12 z-15 absolute">
          <Link to="/notifications">
            <IconButton
              color="primary"
              className="text-white bg-blue-300 rounded-full hover:bg-blue-600 focus:bg-blue-800 duration-150"
            >
              <NotificationsIcon className="text-blue" />
            </IconButton>
          </Link>
        </div>
        <div className="w-1/2 pr-6 border rounded border-gray-400 p-4">
          <h2 className="text-xl font-semibold ">Sessions</h2>
          <div className="mt-5 mb-5 items-center w-50%">
            <Link to="/session">
              <img
                src={process.env.PUBLIC_URL + "/Images/Session.jpg"}
                alt="Session"
                className="rounded-md w-full h-full object-cover transform scale-100 hover:scale-110 focus:scale-110 transition-transform duration-150"
              />
            </Link>
          </div>
          <p>Click the image to view sessions </p>
          {/* <h2 className="text-xl font-semibold">Session Description:</h2>
          <SessionDetailPage /> */}
        </div>
        <div className="w-1/2 pl-6 border rounded border-gray-400 p-4 ml-2">
          <h2 className="text-xl font-semibold">Modules</h2>
          <h1>Welcome, {array.username}!</h1>
          {console.log(array)}
          <div className="mt-5 mb-5 items-center w-50%">
            <Link to="/modules">
              <img
                src={process.env.PUBLIC_URL + "/Images/Modules.jpg"}
                alt="Module"
                className="rounded-md w-full h-full object-cover transform scale-100 hover:scale-110 focus:scale-110 transition-transform duration-150"
              />
            </Link>
          </div>
          <p>Click the image to view Modules </p>
          {/* <h2 className="text-xl font-semibold mt-5 mb-5">Module Details</h2>
          <ModuleDetailPage /> */}

          {/* <h3 className="text-sm font-semibold">
            Manage Modules?{" "}
            <span className="text-sm text-red-300"> for mentors </span>{" "}
          </h3>
          <Link to="/modulemanagement">
            <Button variant="outlined" color="primary">
              Manage Modules
            </Button>
          </Link> */}
        </div>
      </div>
      <div className="bg-red-400 h-20 flex items-center mt-0">
        <div className="w-1/2">
          <div className="text-center pl-4">
            <h3 className="text-white">Contact Support</h3>
            <p className="text-black hover:text-blue-300 focus:text-blue-700 duration-150">
              Email: support@moringaschool.com
            </p>
            <p className="text-black hover:text-blue-300 focus:text-blue-700 duration-150">
              Phone: +254 70000000
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <div className="text-center pr-4">
            <h3 className=" text-white">Follow Us</h3>
            <a
              href="https://www.facebook.com"
              className="text-black mr-4 hover:text-blue-300 focus:text-blue-700 duration-150"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              className="text-black mr-4 hover:text-blue-300 focus:text-blue-700 duration-150"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              className="text-black hover:text-blue-300 focus:text-blue-700 duration-150"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;