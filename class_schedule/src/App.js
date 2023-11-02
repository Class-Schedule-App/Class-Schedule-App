import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProfilePage from "./Pages/ProfilePage";
import Register from './Pages/Register';
import NotificationsList from './Pages/NotificationsList';
function App() {
  const [user, setUser] = useState(null);
  // const [userRole, setUserRole] = useState(null);

  // a function to handle user login
  const handleLogin = (user) => {
    setUser(user);
  };

  // a function to handle user logout.

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div>
        {/*header will be displayed here */}
        {/* handleLout and user will be passed as props to the header */}
        <Routes>
          {user ? (
            <>
            <Route path="/dashboard" component={< Dashboard />} />
              <Route path="/profile" component={< ProfilePage />} />
            </>
            ) : (
              <Route
                path="/"
                render={() => <Login onLogin={handleLogin} />}
              />
          )}
          <Route path="/notifications" component={< NotificationsList />} />
        
          <Route path='/signup' element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

