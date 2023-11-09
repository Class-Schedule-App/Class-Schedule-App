import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

function NewBirdForm({ onAddBird }) {
  const [time, setTime] = useState("");
  const [invite_link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [module_name, setModule] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/modules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: time,
        date: date,
        module_name: module_name,
        invite_link: invite_link,
      }),
    })
      .then((r) => r.json())
      .then((module) => onAddBird(module));
    setDate("");
    setLink("");
    setTime("");
    setModule("");
  }

  return (
    <Box className="new-bird-form" p={1}>
      <Typography variant="h5">New Module</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          label="Module Name"
          name="module_name"
          value={module_name}
          onChange={(e) => setModule(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          label="Time"
          type="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          label="Date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          label="Invite Link"
          name="invite_link"
          value={invite_link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Add Module
        </Button>
      </form>
    </Box>
  );
}

export default NewBirdForm;

