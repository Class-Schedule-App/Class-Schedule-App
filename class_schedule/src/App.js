import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoginPage from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProfilePage from "./Pages/ProfilePage";

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
        {user ? (
          <Routes>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" Component={ProfilePage} />
          </Routes>
        ) : (
          <Route
            path="/login"
            render={() => <LoginPage onLogin={handleLogin} />}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
