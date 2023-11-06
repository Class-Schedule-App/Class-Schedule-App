import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, List, ListItem } from '@mui/material';

const ModuleListPage = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Fetch modules data for students
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5555/modules');
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="module-list-page">
      <Typography variant="h6" gutterBottom>
        Available Modules:
      </Typography>
      <List>
        {modules.map((module) => (
          <ListItem key={module.id} disablePadding>
            <Link to={`/modules/${module.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">{module.module_name}</Typography>
            </Link>
            <Typography>Date: {module.date}</Typography>
            <Typography>Time: {module.time}</Typography>
            <Typography>Invite Link: {module.invite_link}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ModuleListPage;
