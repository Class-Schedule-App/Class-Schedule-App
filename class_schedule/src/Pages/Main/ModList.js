import React from 'react';
import { List, Typography, Divider } from '@mui/material';
import ModCard from './ModCard';

function ModList({ displayedModules }) {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Module List
      </Typography>
      <Divider />
      <List>
        {displayedModules.map((module) => (
          <ModCard key={module.id} module={module} />
        ))}
      </List>
    </div>
  );
}

export default ModList;
