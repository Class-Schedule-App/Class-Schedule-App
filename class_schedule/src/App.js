import React from 'react';
import './App.css'
import UserProfile from './Components/UserProfile'
import UserList from './Components/UserList';

function App() {
  return (
  <>
     <div className="user-profile">
        <UserProfile />
      </div>
     <UserList/>
     
  </>
)
}
export default App;
