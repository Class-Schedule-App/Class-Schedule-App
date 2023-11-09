// Create a component to display a list of users within a module. TMs can use this to invite students to modules.
import React, { useEffect, useState } from "react";
import { Paper, Typography, Avatar, Button, Card, CardContent, CardActions, TextField } from '@mui/material';
import {  useParams } from "react-router-dom";

const UserList = () => {
  let { id } = useParams();
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    fetch('http://localhost:5555/students')
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error('Error fetching user list', error));
  }, []);

  const handleAddToModule = (user) => {

    const studentId = user.id;
    const moduleId = id; 
    const postData = { student_id: studentId, module_id: moduleId }
    fetch('/add-student-to-module', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          alert(`Added ${user.name} to the module!`);
          console.log(postData) 
          // Perform any other action upon successful association
        } else {
          throw new Error('Failed to add user to the module');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUserList = userList.filter((user) => {
    const username = user.name.toLowerCase();
    const email = user.email.toLowerCase();
    return username.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
  });

  return (
    <Paper elevation={2} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Students List
      </Typography>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />

      {filteredUserList.map((user) => (
        <Card
          key={user.id}
          style={{ marginBottom: '20px', border: '1px solid #e0e0e0', transition: 'background-color 0.3s' }}
          sx={{
            '&:hover': {
              backgroundColor: '#f7f7f7',
            },
          }}
        >
          <CardContent style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={user.profile_img} alt={user.username} style={{ marginRight: '20px' }} />
            <div>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body1" color="textSecondary">{user.email}</Typography>
              <Typography variant="body1" color="textSecondary">Phone: {user.phone_number}</Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={() => handleAddToModule(user)}>
              Add to Module
            </Button>
          </CardActions>
        </Card>
      ))}
    </Paper>
  );
};

export default UserList;