// Design a user profile component where students and TMs can view and update their profile information.
import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateUserField } from "../redux/register_redux";
import { useNavigate } from "react-router-dom";


const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate(); 

  const handleUpdateField = () => {
    dispatch(updateUserField(user));

    fetch("https://class-schedule-pp4h.onrender.com/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateUserField(data));
        setEditing(false);
        navigate("/profile");
      })
      .catch((error) => console.error("Error updating user profile:", error));
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Construct the URL based on user's user_type and ID
    const uploadUrl = `https://class-schedule-pp4h.onrender.com/${
      user.user_type === "student"
        ? `students/upload-profile-picture/${user.id}`
        : `mentors/upload-mentor-picture/${user.id}`
    }`;

    const formData = new FormData();
    formData.append("file", file);

    fetch(uploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the user's profile image in Redux state
        dispatch(
          updateUserField({ field: "profileImg", value: data.profileImg })
        );
      })
      .catch((error) =>
        console.error("Error uploading profile picture:", error)
      );
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}
    >
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {user ? (
        <div>
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="subtitle1">Username:</Typography>
            {editing ? (
              <TextField
                variant="outlined"
                value={user.username}
                onChange={(e) => handleUpdateField("username", e.target.value)}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.username}</Typography>
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="subtitle1">Email:</Typography>
            {editing ? (
              <TextField
                variant="outlined"
                type="email"
                value={user.email}
                onChange={(e) => handleUpdateField("email", e.target.value)}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.email}</Typography>
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="subtitle1">Phone Number:</Typography>
            {editing ? (
              <TextField
                variant="outlined"
                type="tel"
                value={user.phone}
                onChange={(e) => handleUpdateField("phone", e.target.value)}
                fullWidth
              />
            ) : (
              <Typography variant="body1">{user.phone}</Typography>
            )}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="subtitle1">Profile Picture:</Typography>
            {editing ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
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
          <div style={{ marginBottom: "15px" }}>
            <Typography variant="subtitle1">Password:</Typography>
            {editing ? (
              <div>
                <TextField
                  variant="outlined"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    handleUpdateField("password", e.target.value)
                  }
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpdateField}
                  style={{ marginTop: "10px" }}
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
                  style={{ marginTop: "10px" }}
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
