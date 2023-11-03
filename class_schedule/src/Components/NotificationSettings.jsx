// a component for users to manage their notification settings.
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";

const NotificationSettings = () => {
  // State to manage notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    moduleInvites: false,
    sessionInvites: false,
  });

  // Handle changes in notification settings
  const handleNotificationChange = (event) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.checked,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mt-10 text-justify-center text-lg font-semibold">Notification Settings</h2>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={notificationSettings.moduleInvites}
              onChange={handleNotificationChange}
              name="moduleInvites"
            />
          }
          label="Receive module invites"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={notificationSettings.sessionInvites}
              onChange={handleNotificationChange}
              name="sessionInvites"
            />
          }
          label="Receive session invites"
        />
      </FormGroup>
      <Button type="submit" variant="contained" color="primary">
        Save Settings
      </Button>
    </form>
  );
};

export default NotificationSettings;
