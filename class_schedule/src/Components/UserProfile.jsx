// Design a user profile component where students and TMs can view and update their profile information.
import React, { useState, useEffect } from 'react';
import { Paper,Typography,TextField,Button,Avatar,} from '@mui/material';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    
    fetch('https://class-schedule-pp4h.onrender.com/users')
      .then((response) => response.json())
      .then((data) => setUser(data.results[4]))
      .catch((error) => console.error('Error fetching user profile:', error));
  }, []);

  const handleUpdateField = () => {
   
    fetch('https://class-schedule-pp4h.onrender.com/users/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.result[4]);
        setEditing(false);
      })
      .catch((error) => console.error('Error updating user profile:', error));
  };
   return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {user ? (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="subtitle1">Username:</Typography>
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
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="subtitle1">Email:</Typography>
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
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="subtitle1">Phone Number:</Typography>
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
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="subtitle1">Profile Picture:</Typography>
            {editing ? (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // Handle file upload and update profile picture
                }}
              />
            ) : (
              <div>
                <Avatar
                  src={user.profileImg}
                  alt="Profile"
                  sx={{ width: 100, height: 100 }}
                />
              </div>
            )}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="subtitle1">Password:</Typography>
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
                  color="success"
                  onClick={handleUpdateField}
                  style={{ marginTop: '10px' }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <Typography variant="body1">********</Typography>
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