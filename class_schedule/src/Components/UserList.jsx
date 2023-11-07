// Create a component to display a list of users within a module. TMs can use this to invite students to modules.
import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";

const UserList = ({ moduleId }) => {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error("Error fetching user list", error));
  }, []);

  const handleAddToModule = (user) => {
    try {
      // Update the user's modules in the database
      const updatedUser = { ...user, modules: [...user.modules, moduleId] };
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then(() => {
          console.log(`Added ${user.username} to Module ${moduleId}.`);
        })
        .catch((error) => console.error("Error adding user to module:", error));
    } catch (error) {
      console.error("Error adding user to module:", error);
    }
  };

  const handleAddToSession = (user) => {
    // Placeholder logic to add the user to a session
    // You should implement your actual logic here
    console.log(`Added ${user.username} to a session.`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUserList = userList.filter((user) => {
    const username = user.username.toLowerCase();
    const email = user.email.toLowerCase();
    return (
      username.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Paper elevation={2} style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Students List
      </Typography>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />

      {filteredUserList.map((user) => (
        <Card
          key={user.id}
          style={{ marginBottom: "20px", border: "1px solid #e0e0e0", transition: "background-color 0.3s" }}
          sx={{
            "&:hover": {
              backgroundColor: "#f7f7f7",
            },
          }}
        >
          <CardContent style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={user.profileImg} alt={user.username} style={{ marginRight: "20px" }} />
            <div>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body1" color="textSecondary">{user.email}</Typography>
              <Typography variant="body1" color="textSecondary">Phone: {user.phone}</Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={() => handleAddToModule(user)}>
              Add to Module
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleAddToSession(user)}>
              Add to Session
            </Button>
          </CardActions>
        </Card>
      ))}
    </Paper>
  );
};

export default UserList;
