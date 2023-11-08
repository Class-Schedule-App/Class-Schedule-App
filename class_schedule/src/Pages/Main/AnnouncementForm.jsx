// Build a form component to post announcements. TMs can use this to make announcements about sessions or courses.
// Build a form component to post announcements. TMs can use this to make announcements about sessions or courses.

import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const AnnouncementForm = ({ onAnnouncementSubmit }) => {
  const [announcementText, setAnnouncementText] = useState('');
  const [title, setTitle] = useState('');

  const handleInputChange = (e) => {
    setAnnouncementText(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        announcements: announcementText,
      }),
    })
    .then((r) => {
      if (r.status === 201) {
        alert('Announcement created successfully!');
        return r.json();
      } else {
        console.error(r);
        throw new Error('Failed to create announcement');
      }
    })
    .then(() => {
      setTitle('');
      setAnnouncementText('');
    })
    .catch((error) => console.error(error));
}
  

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
        <Button variant="contained" type='submit'>Post</Button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
