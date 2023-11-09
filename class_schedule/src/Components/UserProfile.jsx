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
import UploadFileForm from './Upload';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const userId = useSelector(state => state.userID.user_id);
  // Adjust this line based on your Redux store structure


  useEffect(() => {
    // Wait for the userId to be loaded before making the fetch request
    userId && fetch(`/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error('Error fetching user profile:', error));
  }, []);

  const handleUpdateField = () => {
    const { profileImg, ...sent_user } = student;
    fetch(`/students/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sent_user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(sent_user);
        setStudent(data);
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
      {student ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={student.profile_img}
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
                value={student.name || ''}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{student.name}</Typography>
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
                value={student.email || ''}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{student.email}</Typography>
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
                value={student.phone_number || ''}
                onChange={(e) => setStudent({ ...student, phone_number: e.target.value })}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{student.phone_number}</Typography>
            )}
          </div>
          <div style={{ marginBottom: '20px', width: '100%' }}>
            {editing ? (
              <div>
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
        <div>Loading student profile...</div>
      )}
      <UploadFileForm/>
    </Paper>
  );
};

export default UserProfile;
