// Design a user profile component where students and TMs can view and update their profile information.
import React, { useState, useEffect } from 'react';

const UserProfile = ({ user, userType }) => {
  const [profileData, setProfileData] = useState(user);
  const [editing, setEditing] = useState(false);
  const API_URL = 'http://localhost/profile';

  // Function to handle profile updates
  const handleUpdateProfile = () => {
    // Make an API request to update the user's profile
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

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={() => setEditing(!editing)}>Edit Profile</button>
      {editing ? (
        <div>
          {/* Form to update profile information */}
          <input
            type="text"
            value={profileData.username}
            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
          />
          {/* Add input fields for other profile information */}
          <button onClick={handleUpdateProfile}>Save</button>
        </div>
      ) : (
        <div>
          {/* Display user information here */}
          <p>Username: {profileData.username}</p>
          {/* Display other user information here */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
