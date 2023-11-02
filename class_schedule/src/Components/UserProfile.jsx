// Design a user profile component where students and TMs can view and update their profile information.
import React, { useState } from 'react';

const UserProfile = ({ user, userType }) => {
  const [profileData, setProfileData] = useState(user);
  const [editing, setEditing] = useState(false);
  const API_URL = 'http://localhost/profile';

  const handleUpdateField = (field) => {
    
    fetch(API_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => response.json())
      .then((data) => setProfileData(data))
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
      width: '100%',
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
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.userProfile}>
      <h2>Profile</h2>
      <div style={styles.field}>
        <label style={styles.label}>Username:</label>
        {editing ? (
          <div>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
              style={styles.input}
            />
            <button style={styles.saveButton} onClick={() => handleUpdateField('username')}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <span>{profileData.username}</span>
            <button style={styles.editButton} onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
        )}
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Email:</label>
        {editing ? (
          <div>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              style={styles.input}
            />
            <button style={styles.saveButton} onClick={() => handleUpdateField('email')}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <span>{profileData.email}</span>
            <button style={styles.editButton} onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
        )}
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Phone Number:</label>
        {editing ? (
          <div>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              style={styles.input}
            />
            <button style={styles.saveButton} onClick={() => handleUpdateField('phone')}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <span>{profileData.phone}</span>
            <button style={styles.editButton} onClick={() => setEditing(true)}>
              Edit
            </button>
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
            <button style={styles.saveButton} onClick={() => handleUpdateField('profileImg')}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <img
              src={profileData.profileImg}
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
              value={profileData.password}
              onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
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
  );
};

export default UserProfile;
