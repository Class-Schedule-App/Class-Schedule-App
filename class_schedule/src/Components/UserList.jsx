// Create a component to display a list of users within a module. TMs can use this to invite students to modules.
import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const API_URL = 'https://class-schedule-pp4h.onrender.com/users'

  useEffect(() => {
    // Fetch the list of users from your JSON API (http://localhost:3000/users)
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.length > 0 ? ( // Check if users array is not empty
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img
                src={user.profileImg}
                alt={`${user.username}'s profile`}
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
              />
              <div>
                <p style={{ fontWeight: 'bold' }}>{user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                {/* Display other user information here */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserList;
