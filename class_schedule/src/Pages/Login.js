import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';import '../styles/login.css'

function Login({ updateUsername }) {
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Perform any actions that should occur when newUsername changes here
    console.log(`newUsername has changed to: ${newUsername}`);
  }, [newUsername]);

  const handleLogin = () => {
    updateUsername(newUsername);
  };

  const toggleVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      'username': newUsername,
      'password': password,
    };
    try {
      const response = await fetch("http://127.0.0.1:5555/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(formData);
        navigate("/history");
      } else {
        console.log(formData);
        throw new Error(`Invalid username or password! ${response.status}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      // Clear the username and password fields regardless of success or failure
      handleLogin("");
      setPassword("");
    }
  };

  return (
  <div className="flex flex-col items-center justify-center h-screen dark">
    <div className="form text-white">
    <form action="#" onSubmit={handleSubmit}>
      <div className="title">Welcome</div>
      <div className="subtitle">Let's Login!</div>


      <div className="input-container ic2">
        <input 
        required =""
        placeholder="Email" 
        name="username"
        type="text" 
        id="email"
        className="input" 
        value={newUsername}
        onChange={(e) => {
          setNewUsername(e.target.value);
          setError(null); // Clear the error message when typing
        }} 
         />
        <div className="cut cut-short"></div>
        <label className="iLabel" htmlFor="email">Email</label>
      </div>

      <div className="input-container ic1">
        <input 
        required =""
        autoComplete="off"
        placeholder="Password" 
        value={password}
        type={showPassword ? 'text' : 'password'}
        className="input" 
        id="password" 
        onChange={(e) => {
          setPassword(e.target.value);
          // setError(null); 
          // Clear the error message when typing
        }}       
        />
        <div className="cut"></div>
        <label className="iLabel" htmlFor="firstname">Password</label>
      </div>
      <button className="submit" type="text">Submit</button>
      <div className="forgot-pass">
              Forgot Password?
      </div>
        <button 
        type="submit"
        className="button"
        >
          Sign in
        </button>
        <div className="sign-up">
          Not a member? <a href="/signup">Signup now</a>
        </div>
      </form>
    </div>
  </div>
  );
}

export default Login;
