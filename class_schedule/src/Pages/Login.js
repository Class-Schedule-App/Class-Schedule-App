import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/login.css'
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setError, togglePasswordVisibility } from "../redux/login_redux";


function Login({onLogin}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataObject = useSelector((state) => state.login);
  const { email, password, error, showPassword } = dataObject

  const userType = useSelector((state) => state.userType.userType);

  const handleChangeEmail = (event) => {
    dispatch(setEmail(event.target.value));
    dispatch(setError(null)); // Clear the error message when typing
  };
  // const handleUserTypeSelect = (userType) => {
  //   dispatch(setUserType(userType));
  // }

  const handleChangePassword = (event) => {
    dispatch(setPassword(event.target.value));
    dispatch(setError(null)); // Clear the error message when typing
  };
  const toggleVisibility = () => {
    dispatch(togglePasswordVisibility());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      'email': dataObject.email,
      'password': dataObject.password,
    };
    try {
      const response = await fetch("https://class-schedule-pp4h.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(formData);
        onLogin(userType);
        navigate("/dashboard");
      } else {
        console.log(formData);
        throw new Error(`Invalid username or password! ${response.status}`);
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      // Clear the username and password fields regardless of success or failure
      dispatch(setEmail(''));
      dispatch(setPassword(''));
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
        name="username"
        id="email"
        type="text"
        required =""
        placeholder=""      
        className="input" 
        value={email}
        onChange={handleChangeEmail} 
         />
        <div className="cut cut-short"></div>
        <label className="iLabel" htmlFor="email">Email</label>
      </div>

      <div className="input-container ic1">
        <input 
        required =""
        autoComplete="off"
        placeholder="" 
        value={password}
        type={showPassword ? 'text' : 'password'}
        className="input" 
        id="password" 
        onChange={handleChangePassword}      
        />
        <span 
            onClick={toggleVisibility} 
            className={`absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl ${
                showPassword ? "" : "text-gray-400"
              }`}        >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
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
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <div className="sign-up">
          Not a member? <a href="/signup">Signup now</a>
        </div>
      </form>
    </div>
  </div>
  );
}

export default Login;
