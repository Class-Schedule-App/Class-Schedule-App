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

  // a function to handle user login
  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <div>
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <Routes>
          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
              <Route path="/modules" element={<ModuleListPage />} />
              <Route path="/module-management" element={<ModuleManagementPage />} />
            </>
          ) : (
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
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

