// Create a component for displaying module information.
// This component can include the module name, description, 
//list of sessions within the module, and the option to invite students.

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Module = ({ moduleId }) => {
  const [module, setModule] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    // Fetch module details and sessions 
    const fetchModuleDetails = async () => {
      try {
        const moduleResponse = await axios.get(` http://127.0.0.1:5555/modules/${moduleId}`);
        setModule(moduleResponse.data);

        //  fetching sessions within the module
        const sessionsResponse = await axios.get(` http://127.0.0.1:5555/modules/${moduleId}/sessions`);
        setSessions(sessionsResponse.data);
      } catch (error) {
        console.error('Error fetching module details:', error);
      }
    };

    fetchModuleDetails();
  }, [moduleId]);

  const handleInviteStudents = async () => {
    try {
      // endpoint for inviting students to the module
      await axios.post(` http://127.0.0.1:5555/modules/${moduleId}/invite`, { inviteLink });
      // Handle success or show a confirmation message
      console.log('Students invited successfully!');
    } catch (error) {
      console.error('Error inviting students:', error);
    }
  };

  if (!module) {
    return <div>Loading...</div>;
  }

  return (
    <div className="module-details">
      <Typography variant="h2">{module.module_name}</Typography>
      <Typography variant="body1">Description: {module.description}</Typography>
      <Typography variant="body1">Invite Link: {module.invite_link}</Typography>

      <Typography variant="h4">Sessions</Typography>
      <List>
        {sessions.map((session) => (
          <ListItem key={session.id}>
            <Typography variant="h6">{session.session_name}</Typography>
            <Typography variant="body1">Description: {session.description}</Typography>
          </ListItem>
        ))}
      </List>

      <div className="invite-students">
        <TextField
          label="Enter invite link"
          variant="outlined"
          fullWidth
          margin="normal"
          value={inviteLink}
          onChange={(e) => setInviteLink(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleInviteStudents}>
          Invite Students
        </Button>
      </div>
    </div>
  );
};

export default Module;
