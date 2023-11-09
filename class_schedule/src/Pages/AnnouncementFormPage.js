// Build a page for TMs to post new announcements.

import React from 'react';
import AnnouncementForm from '../Components/AnnouncementForm';
// import Navbar from '../Components/Navbar';
import { Box, Container, Card, CardContent } from '@mui/material';

const centerContent = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
};

const cardStyle = {
  width: '50%',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

const cardContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const AnnouncementFormPage = ({ onAnnouncementSubmit }) => {
  return (
    <div>
      {/* <Navbar /> */}
      <Container style={centerContent}>
        <Box sx={cardStyle}>
          <Card variant="outlined">
            <CardContent sx={cardContentStyle}>
              <AnnouncementForm onAnnouncementSubmit={onAnnouncementSubmit} />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default AnnouncementFormPage;
// 