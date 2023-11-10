// // Create a component to list course announcements. Each announcement can include the title, content, and date.
// // Create a component to list course announcements. Each announcement can include the title, content, and date.

// import React from 'react';
// import { Card, CardContent, Typography, Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Grid from '@mui/material/Grid';

// const AnnouncementList = ({ announcements, onDelete }) => {
//   return (
//     <div>
//       {/* <h2>Announcements</h2> */}
//       <Grid container spacing={2}>
//         {announcements.map((announcement) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={announcement.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{announcement.title}</Typography>
//                 <Typography variant="body1">{announcement.body}</Typography>
//                 <Typography variant="caption">
//                   Date: {new Date(announcement.date).toLocaleDateString()}
//                   <br />
//                   Time: {new Date(announcement.date).toLocaleTimeString()}
//                 </Typography>
//                 <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onDelete(announcement.id)}>Delete</Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default AnnouncementList;
