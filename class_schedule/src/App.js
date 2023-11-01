import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './Pages/Register';
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Register/>} /> 
            <Route path='/' element={<Login/>} />           
        </Routes>
    </BrowserRouter>
  );
}

export default App;
