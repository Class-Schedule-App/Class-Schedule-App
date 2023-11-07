// Design a user profile component where students and 
//TMs can view and update their profile information.
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Switch,
  FormControlLabel,
} from '@mui/material';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true); // State for notification setting

useEffect(() => {
    
    fetch('http://127.0.0.1:5000/users/1')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user profile:', error));
  }, []);

const handleUpdateField = () => {
   
    fetch('http://127.0.0.1:5000/users/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setEditing(false);
      })
      .catch((error) => console.error('Error updating user profile:', error));
  };

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  };

  return (
    <Paper elevation={3} style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          User Profile
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notificationEnabled}
              onChange={handleNotificationToggle}
              color="primary"
            />
          }
          label="Enable Notifications"
        />
      </div>
      {user ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={user.profileImg}
            alt="Profile"
            sx={{ width: 100, height: 100, marginTop: '20px', marginBottom: '10px' }}
          />
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Username:
            </Typography>
            {editing ? (
              <TextField
                variant="outlined"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.username}</Typography>
            )}
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Email:
            </Typography>
            {editing ? (
              <TextField
                variant="outlined"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.email}</Typography>
            )}
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Phone Number:
            </Typography>
            {editing ? (
              <TextField
                variant="outlined"
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.phone}</Typography>
            )}
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Password:
            </Typography>
            {editing ? (
              <div>
                <TextField
                  variant="outlined"
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateField}
                  style={{ marginTop: '10px' }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  ********
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEditing(true)}
                  style={{ marginTop: '10px' }}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading user profile...</div>
      )}
    </Paper>
  );
};

export default UserProfile;