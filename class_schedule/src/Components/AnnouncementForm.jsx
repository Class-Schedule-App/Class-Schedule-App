// Build a form component to post announcements. TMs can use this to make announcements about sessions or courses.

import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const AnnouncementForm = ({ onAnnouncementSubmit }) => {
  const [announcementText, setAnnouncementText] = useState('');
  const [title, setTitle] = useState('');

  const handleInputChange = (e) => {
    setAnnouncementText(e.target.value);
  };
// 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '' && announcementText.trim() !== '') {
      // BACKEND
      fetch('http://127.0.0.1:5555/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body: announcementText }),
      })
        .then((response) => response.json())
        .then((data) => {
          onAnnouncementSubmit(data);
        })
        .catch((error) => console.error('Error posting announcement:', error));

      setTitle('');
      setAnnouncementText('');
    }
  };

  const labelStyle = {
    fontSize: '1.2rem', // Adjust the font size
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" style={labelStyle}>
          Announcement Title
        </Typography>
        <TextField
          required
          id="outlined-size-small"
          size="small"
          margin="normal"
          label="Announcement Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Typography variant="h6" style={labelStyle}>
          Announcement Body
        </Typography>
        <TextField
          required
          id="outlined-multiline-static"
          size="small"
          margin="normal"
          label="Announcement Body"
          variant="outlined"
          multiline
          rows={6}
          value={announcementText}
          onChange={handleInputChange}
        />
        <br />
        <Button variant="contained">Post</Button>
      </form>
    </div>
  );
};

export default AnnouncementForm;

