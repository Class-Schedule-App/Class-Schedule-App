import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import './styles/ModCard.css'
import './styles/ModuleDetails.css'
import Register from './Pages/Register';
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import ModuleDetails from "./Pages/Main/ModuleDetails";
import ModPage from "./Pages/Main/ModPage";
import UserProfile from './Components/UserProfile'
import UserList from "./Components/UserList";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/resetpassword' element={<ResetPassword/>} /> 
            <Route path="/mod" element={ <ModPage /> }/>
            <Route path="/mod/:modId" element={ <ModuleDetails /> }/>
            <Route path="/userprofile" element={ <UserProfile /> }/>
            <Route path="/userlist/:studentId" element={ <UserList /> }/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
