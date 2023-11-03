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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
        <Route path="/modules" element={<ModuleListPage />} />
        <Route path="/module-management" element={<ModuleManagementPage />} />
        <Route path="/notifications" element={<NotificationsList />} />
        <Route
          path="/notificationsettings"
          element={<NotificationSettingsPage />}
        />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
