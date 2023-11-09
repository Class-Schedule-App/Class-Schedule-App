import "./App.css";
import React, {useState } from "react";
import LoginPage from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProfilePage from "./Pages/ProfilePage";
import { Routes, Route } from 'react-router-dom';
import AnnouncementFormPage from './Pages/AnnouncementFormPage';
import AnnouncementPage from "./Pages/AnnouncementPage";
import Comments from "./Pages/Comments";

function App() {
  const [user, setUser] = useState(null);
  // const [userRole, setUserRole] = useState(null);

  // a function to handle user login
  const handleLogin = (user) => {
    setUser(user);
  };

  // a function to handle user logout.

  // const handleLogout = () => {
  //   setUser(null);
  // };

  return (
    <>
    {/* <Router> */}
      {/* <div> */}
        <Comments />
        {/*header will be displayed here */}
        {/* handleLout and user will be passed as props to the header */}
        {/* <Routes>
          {user ? (
            <>
            <Route path="/dashboard" component={< Dashboard />} />
              <Route path="/profile" component={< ProfilePage />} />
            </>
            ) : (
              <Route
                path="/login"
                render={() => <LoginPage onLogin={handleLogin} />}
              />
          )}
          <Route path="/post" element={<AnnouncementFormPage />} />
          <Route path="/display" element={<AnnouncementPage />} />
        </Routes>
      </div> */}
    {/* </Router> */}

    </>
  );
}

export default App;
