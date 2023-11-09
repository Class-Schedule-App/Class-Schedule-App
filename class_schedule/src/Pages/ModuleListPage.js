import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@mui/material';


const ModuleListPage = () => {
  const [userModules, setUserModules] = useState([]);
  const userId = useSelector(state => state.userID.user_id);

  useEffect(() => {
    console.log("UserID:", userId); // Log the userId
  
    userId &&
      fetch(`/attendeestudent/${userId}`)
        .then((response) => {
          console.log("Response:", response); // Log the response
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then((data) => {
          console.log("Data received:", data); // Log the data
          setUserModules(data);
        })
        .catch((error) => console.error('Error fetching user profile:', error));
  }, [userId]);
  

  if (userModules.length === 0) {
    return (
      <div className="module-list-page flex flex-wrap">
        <Typography variant="h4">No modules assigned</Typography>
      </div>
    );
  }

  return (
    <div className="module-list-page">
      <Grid container spacing={2}>
        {userModules.map((module) => (
          <Grid item xs={12} key={module.module_id}>
            <Link to={`/mod/${module.module_id}`} style={{ textDecoration: 'none' }}>
              <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  {module.module_name}
                </Typography>
                <Typography variant="subtitle1" style={{ marginBottom: '5px' }}>
                   {module.module_name}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '5px' }}>
                  Date: Replace with your data
                </Typography>
                {/* Add other details in a similar manner */}
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ModuleListPage;