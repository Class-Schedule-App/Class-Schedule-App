import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import {useState} from 'react'
import Register from './Pages/Register';
import Login from "./Pages/Login";

function App() {
  const [username, setUsername] = useState("");
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Register/>} /> 
            <Route path='/login' element={<Login username={username} updateUsername={updateUsername}/>} />           
        </Routes>
    </BrowserRouter>
  );
}

export default App;
