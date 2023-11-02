import React from 'react';
import UserProfile from './Components/UserProfile'

function App() {
  const user = {
    username: 'SampleUser',
    email: 'sampleuser@example.com',
   
  };

  return (
    <>
      <UserProfile user={user} />
    </>
  );
}

export default App;
