// Create a component to display a list of users within a module. TMs can use this to invite students to modules.
import React, { useEffect, useState } from "react";
import { Paper, Typography, Avatar } from '@mui/material';

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Error fetching user list', error));
  }, []); 

  return (
    <Paper elevation={2} style={{ padding: '20px', maxWidth: '400px', margin: ' 0 auto' }}>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>

      {userList.map((user) => (
        <div key={user.id}>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="subtitle1">Username:</Typography>
            <Typography variant="body1">{user.username}</Typography>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="subtitle1">Email:</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="subtitle1">Phone Number:</Typography>
            <Typography variant="body1">{user.phone}</Typography>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="subtitle1">Profile Picture:</Typography>
            <Avatar src={user.profileImg} alt={user.username} />
          </div>
        </div>
      ))}
    </Paper>
  );
};

export default UserList;
