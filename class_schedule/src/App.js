import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProfilePage from "./Pages/ProfilePage";
import Register from "./Pages/Register";
import NotificationsList from "./Pages/NotificationsList";
import NotificationSettingsPage from "./Pages/NotificationSettingsPage";
import ModuleDetailPage from "./Pages/ModuleDetailPage";
import ModuleListPage from "./Pages/ModuleListPage";
import ModuleManagementPage from "./Pages/ModuleManagementPage";
import AnnouncementPage from "./Pages/AnnouncementPage";
import AnnouncementFormPage from "./Pages/AnnouncementFormPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
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
      </Routes>
    </BrowserRouter>
  );
}
