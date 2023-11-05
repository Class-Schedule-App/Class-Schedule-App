import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './Pages/Register';
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import ModuleDetails from "./Pages/Main/ModuleDetails";
import ModPage from "./Pages/Main/ModPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/resetpassword' element={<ResetPassword/>} /> 
            <Route path="/mod" element={ <ModPage /> }/>
            <Route path="/mod/:modId" element={ <ModuleDetails /> }/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
