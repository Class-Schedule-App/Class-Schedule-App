import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './Pages/Register';
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Register/>} /> 
            <Route path='/login' element={<Login/>} />    
            <Route path='/resetpassword' element={<ResetPassword/>} />        
        </Routes>
    </BrowserRouter>
  );
}

export default App;
