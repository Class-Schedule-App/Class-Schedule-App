import '../styles/signup.css'
import React from 'react';
import {  useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserField,
  togglePasswordVisibility,
  toggleConfPasswordVisibility,
  setMismatchedPasswords,
  setError,
} from '../redux/register_redux';


function Register() {
const navigate = useNavigate();
const dispatch = useDispatch();
const dataObject = useSelector((state) => state.user);
const { showPassword, showConfPassword, passwordsMatch, error } = dataObject;

const handleChange = (event) => {
  const { name, value } = event.target;
  dispatch(updateUserField({ field: name, value }));
};


const toggleVisibility = () => {
  dispatch(togglePasswordVisibility());
};

const toggleConfirmVisibility = () => {
  dispatch(toggleConfPasswordVisibility());
};
function handleSubmit(e) {
  e.preventDefault();
  // Check if passwords match
  if (dataObject.password !== dataObject.confirmPassword) {
    dispatch(setMismatchedPasswords(false)); // Dispatch the action with payload false
    return;
  }

const formData = {
  username: `${dataObject.firstname} ${dataObject.lastname}`,
  password: dataObject.password,
  email: dataObject.email,
  user_type: dataObject.user_type,
  phone_number: dataObject.phone_number,
};

fetch('http://127.0.0.1:5555/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
})
  .then((r) => {
    // Log the response body content
    return r.json().then((responseData) => {
      console.log(responseData, formData);
      if (r.ok) {
        navigate('/login');
      } else {
        throw new Error(`Oops! Invalid details or try again later! : ${r.status};`);
      }
    });
  })
  .catch((error) => {
    setError(error.message);
  });
}
  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <p className="title hover:scale-110 transition-all duration-500">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <input
              placeholder="First Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              required
              name="firstname"
              minLength={2}
              maxLength={80}
              value={dataObject.firstname}
              onChange={handleChange}
            />
            <input
              placeholder="Last Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              required
              name="lastname"
              minLength={2}
              maxLength={80}
              value={dataObject.lastname}
              onChange={handleChange}
            />
          </div>
          <input
            placeholder="Email"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            required
            name="email"
            value={dataObject.email}
            onChange={handleChange}
          />
          {/* <input
            placeholder="Confirm Email"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            required
            value={dataObject.email}
            onChange={handleChange}
          /> */}
           <label className="relative">
            <input
              placeholder="Password"
              className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              required
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={dataObject.password}
              onChange={handleChange}
              minLength={8}       
          />
            {/* <span>Password</span> */}
            <span 
            onClick={toggleVisibility} 
            className={`absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl ${
                showPassword ? "" : "text-gray-400"
              }`}        >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
         </label>
         <label className="relative">
            <input
              placeholder="Confirm Password"
              className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              required
              name="confirmPassword"
              type={showConfPassword ? 'text' : 'password'}
              value={dataObject.confirmPassword}
              minLength={8}
              onChange={handleChange}    
            />
           {/* <span>Confirm password</span> */}
            <span 
            onClick={toggleConfirmVisibility} 
            className={`absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xl ${
              showConfPassword ? "" : "text-gray-400"
              }`}        >
                {showConfPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </label>
          {!passwordsMatch && (
              <p className="text-red-500">Passwords do not match. Please try again.</p>
            )}
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

          <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="user_type">
            User_Type
          </label>
          <select
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            name="user_type"
            value={dataObject.user_type}
            onChange={handleChange}
          >
            <option  value="">Select User Type</option>
            <option  value="student">Student</option>
            <option  value="technical_mentor">TechnicalMentors</option>
            <option  value="other">Other</option>
          </select>
          <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="tel">
            Phone Number
          </label>
          <input
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
            id="phone_number"
            type="tel"
            name='phone_number'
            required
            value={dataObject.phone_number}
            onChange={handleChange}
          />
          <p className="text-white mt-4">
            Already have an account?
            <a className="text-sm text-blue-500 -200 hover:underline mt-4" href="/login">
              Login
            </a>
          </p>
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
