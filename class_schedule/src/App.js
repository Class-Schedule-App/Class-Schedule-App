import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/ModCard.css'
import './styles/ModuleDetails.css'
import React, { useEffect, useState } from "react";
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import ModuleDetails from "./Pages/Main/ModuleDetails";
import ModPage from "./Pages/Main/ModPage";

import UserList from "./Components/UserList";

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
import SessionDetailPage from "./Pages/SessionDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
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
        <Route path="/sessiondetails/:sessionId" element={<SessionDetailPage />}/>
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/mod" element={<ModPage />} />
        <Route path="/mod/:modId" element={<ModuleDetails />} />
            <Route path="/userprofile" element={ <UserProfile /> }/>
            <Route path="/userlist/:studentId" element={ <UserList /> }/>
      </Routes>
    </BrowserRouter>
  );
}
