import React from 'react';
import './App.css'
import UserProfile from './Components/UserProfile'
import Module from './Components/Module';

function App() {
  return (
  <>
     <div className="user-profile">
        <UserProfile />
      </div>
      <Module/>
     
  </>
)
}
export default App;
