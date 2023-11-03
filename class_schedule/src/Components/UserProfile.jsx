// Design a user profile component where students and TMs can view and update their profile information.
import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    
    fetch('http://localhost:3000/users/1')
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user profile:', error));
  }, []);

  const handleUpdateField = () => {
   
    fetch('http://localhost:3000/users/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setEditing(false);
      })
      .catch((error) => console.error('Error updating user profile:', error));
  };
  const styles = {
    userProfile: {
      backgroundColor: '#f5f5f5',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '0 auto',
    },
    field: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
    },
    input: {
      width: '90%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
    },
    editButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    saveButton: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      padding: '10px',
      border: '10px',
      margin: '15px',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '90%',
    },
  };

  return (
    <div style={styles.userProfile}>
      <h2>Profile</h2>
      {user ? (
        <div>
          <div style={styles.field}>
            <label style={styles.label}>Username:</label>
            {editing ? (
              <div>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  style={styles.input}
                />
              </div>
            ) : (
              <div>
                <span>{user.username}</span>
              </div>
            )}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email:</label>
            {editing ? (
              <div>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  style={styles.input}
                />
              </div>
            ) : (
              <div>
                <span>{user.email}</span>
              </div>
            )}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Phone Number:</label>
            {editing ? (
              <div>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  style={styles.input}
                />
              </div>
            ) : (
              <div>
                <span>{user.phone}</span>
              </div>
            )}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Profile Picture:</label>
            {editing ? (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    // Handle file upload and update profile picture
                  }}
                />
              </div>
            ) : (
              <div>
                <img
                  src={user.profileImg}
                  alt="Profile"
                  style={{ maxWidth: '100px', borderRadius: '50%' }}
                />
                <button style={styles.editButton} onClick={() => setEditing(true)}>
                  Edit
                </button>
              </div>
            )}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password:</label>
            {editing ? (
              <div>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  style={styles.input}
                />
                <button style={styles.saveButton} onClick={() => handleUpdateField('password')}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <span>********</span>
                <button style={styles.editButton} onClick={() => setEditing(true)}>
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading user profile...</div>
      )}
    </div>
  );
};

export default UserProfile;
