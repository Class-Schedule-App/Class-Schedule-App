import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProfilePage from "./Pages/ProfilePage";
import Register from './Pages/Register';
import NotificationsList from './Pages/NotificationsList';
import NotificationSettingsPage from "./Pages/NotificationSettingsPage";
import Header from "./Components/Header";


export default function App() {
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
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" component={< Dashboard />} />
              <Route path="/profile" component={< ProfilePage />} />
            </>
            ) : (
              <Route
                path="/"
                render={() => <Login onLogin={handleLogin} />}
              />
          )}
          <Route path="/notifications" component={< NotificationsList />} />
          <Route path="/notificationsettings" component={< NotificationSettingsPage/>} />        
          <Route path='/signup' element={<Register/>} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

