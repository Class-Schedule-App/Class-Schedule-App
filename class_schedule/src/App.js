import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import LoginPage from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProfilePage from "./Pages/ProfilePage";
import ModuleDetailPage from "./Pages/ModuleDetailPage";
import ModuleListPage from "./Pages/ModuleListPage";
import ModuleManagementPage from "./Pages/ModuleManagementPage";

function App() {
  const [user, setUser] = useState(null);

  // a function to handle user login
  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <div>
        {/* Header will be displayed here */}
        {/* handleLogout and user will be passed as props to the header */}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
