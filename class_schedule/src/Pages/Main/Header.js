import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { School } from '@mui/icons-material';

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <School fontSize="large" />
        </IconButton>
        <Typography variant="h4">
          Class Schedule App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
