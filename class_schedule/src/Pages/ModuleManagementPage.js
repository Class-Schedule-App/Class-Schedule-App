
// for technical mentors
/* 
Create a page where Technical Mentors can manage modules. They can see a list of modules they have created 
or are responsible for.
On this page, they can also create new modules, invite students to modules, and update module details.

*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, List, ListItem } from '@mui/material';
const ModuleManagementPage = () => {
  const [modules, setModules] = useState([]);
  const [newModuleName, setNewModuleName] = useState('');
  const [invitedStudents, setInvitedStudents] = useState('');
  const [updatedModuleName, setUpdatedModuleName] = useState('');

  // Fetch ist of modules they have created 

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(' http://127.0.0.1:5555/modules');
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);

  // Create a new module
  const handleCreateModule = async () => {
    try {
      const response = await axios.post(' http://127.0.0.1:5555/modules', { module_name: newModuleName });
      setModules([...modules, response.data]);
      setNewModuleName('');
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  // Invite students to a module
  const handleInviteStudents = async (moduleId) => {
    try {
      const response = await axios.post(` http://127.0.0.1:5555/modules/${moduleId}/invite`, {
        studentIds: invitedStudents.split(','),
      });
      // Handle the response as needed (e.g., show a success message)
      console.log('Students invited successfully:', response.data);
    } catch (error) {
      console.error('Error inviting students:', error);
    }
  };

  // Update module details
  const handleUpdateModule = async (moduleId) => {
    try {
      const response = await axios.patch(` http://127.0.0.1:5555/modules/${moduleId}`, { module_name: updatedModuleName });
      // Handle the response as needed (e.g., show a success message)
      console.log('Module updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  return (
    <div className="module-management-page">
      <h1>Module Management</h1>
      <div>
        <TextField
          variant="outlined"
          label="Enter module name"
          value={newModuleName}
          onChange={(e) => setNewModuleName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleCreateModule}>
          Create New Module
        </Button>
      </div>
      <List>
        {modules.map((module) => (
          <ListItem key={module.id}>
            <Link to={`http://127.0.0.1:5555/modules/${module.id}`}>{module.module_name}</Link>
            <div>
              <TextField
                variant="outlined"
                label="Enter student IDs (comma separated)"
                value={invitedStudents}
                onChange={(e) => setInvitedStudents(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={() => handleInviteStudents(module.id)}>
                Invite Students
              </Button>
            </div>
            <div>
              <TextField
                variant="outlined"
                label="Enter updated module name"
                value={updatedModuleName}
                onChange={(e) => setUpdatedModuleName(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={() => handleUpdateModule(module.id)}>
                Update Module
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ModuleManagementPage;
