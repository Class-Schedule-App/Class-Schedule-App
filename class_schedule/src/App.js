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
import ModuleDetailPage from "./Pages/ModuleDetailPage";
import ModuleListPage from "./Pages/ModuleListPage";
import ModuleManagementPage from "./Pages/ModuleManagementPage";
import { setUserType } from "./redux/userType_redux";



export default function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("student");

  // a function to handle user login
  const handleLogin = (user, userType) => {
    setUser(user);
    setUserRole(userType);
  };
  
  const handleLogout = () => {
    setUser(null);
  }


  return (
    <Router>
      <div>
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <NotificationsList />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard userRole={userRole} onLogin={handleLogin}/>} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
              <Route path="/modules" element={<ModuleListPage />} />
              <Route path="/module-management" element={<ModuleManagementPage />} />
            </>
          ) : (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          )}
          <Route path="/notifications" element={< NotificationsList />} />
          <Route path="/notificationsettings" element={< NotificationSettingsPage/>} />        
          <Route path='/signup' element={<Register/>} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

