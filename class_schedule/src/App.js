import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import ModuleDetails from "./Pages/Main/ModuleDetails";
import ModPage from "./Pages/Main/ModPage";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import NotificationsList from "./Pages/NotificationsList";
import NotificationSettingsPage from "./Pages/NotificationSettingsPage";
import ModuleDetailPage from "./Pages/ModuleDetailPage";
import ModuleListPage from "./Pages/ModuleListPage";
import ModuleManagementPage from "./Pages/ModuleManagementPage";
import AnnouncementPage from "./Pages/AnnouncementPage";
import AnnouncementFormPage from "./Pages/AnnouncementFormPage";
import SessionList from "./Components/SessionList";
import UserProfile from "./Components/UserProfile";

export default function App() {
  const [user, setUser] = useState("mentor");
  const handleLogin = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard user={user} onLogin={handleLogin} onLogout={handleLogout}/>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
        <Route path="/modules" element={<ModuleListPage />} />
        <Route path="/modulemanagement" element={<ModuleManagementPage />} />
        <Route path="/notifications" element={<NotificationsList />} />
        <Route
          path="/notificationsettings"
          element={<NotificationSettingsPage />}
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/announcementpage" element={<AnnouncementPage />} />
        <Route path="/announcementform" element={<AnnouncementFormPage />} />
        <Route path="/session" element={<SessionList />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/mod" element={<ModPage />} />
        <Route path="/mod/:modId" element={<ModuleDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
