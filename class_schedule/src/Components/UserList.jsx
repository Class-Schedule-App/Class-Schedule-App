// Create a component to display a list of users within a module. TMs can use this to invite students to modules.
import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const API_URL = 'https://class-schedule-pp4h.onrender.com/users'

  useEffect(() => {
    // Fetch the list of users from your Flask API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
            {/* Display other user information here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
