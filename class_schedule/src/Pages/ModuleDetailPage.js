
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, List, ListItem } from '@mui/material';

const ModuleDetailPage = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [sessions, setSessions] = useState([]);

  const handleLike = (sessionId) => {
    // Implement logic for liking the session with sessionId
    console.log(`Liked session with ID: ${sessionId}`);
  };

  const handleComment = (sessionId) => {
    // Implement logic for commenting on the session with sessionId
    console.log(`Commented on session with ID: ${sessionId}`);
  };

  useEffect(() => {
    // Fetch module details using the moduleId from the URL parameter
    const fetchModuleDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5555/modules/${moduleId}`);
        setModule(response.data);

        // Assuming there is an endpoint for fetching sessions within the module
        const sessionsResponse = await axios.get(`http://127.0.0.1:5555/modules/${moduleId}/sessions`);
        setSessions(sessionsResponse.data);
      } catch (error) {
        console.error('Error fetching module details:', error);
      }
    };

    fetchModuleDetails();
  }, [moduleId]);

  if (!module) {
    return <div>Loading...</div>;
  }

  return (
    <div className="module-detail-page">
      <Typography variant="h4" gutterBottom>
        {module.module_name} Details
      </Typography>
      <Typography>Date: {module.date}</Typography>
      <Typography>Time: {module.time}</Typography>
      <Typography>Invite Link: {module.invite_link}</Typography>

      <Typography variant="h5" gutterBottom>
        Sessions
      </Typography>
      <List>
        {sessions.map((session) => (
          <ListItem key={session.id}>
            <Typography variant="h6">{session.session_name}</Typography>
            <Typography>Description: {session.description}</Typography>
            <Typography>Invitation Link: {session.invitation_link}</Typography>
            <Button color="primary" variant="contained" onClick={() => handleLike(session.id)}>
              Like
            </Button>
            <Button color="primary" variant="contained" onClick={() => handleComment(session.id)}>
              Comment
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ModuleDetailPage;
