import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserField, setMismatchedPasswords} from '../redux/register_redux';

function ResetPassword() {

const navigate = useNavigate();
const dispatch = useDispatch();
const dataObject = useSelector((state) => state.user);
const { passwordsMatch, error } = dataObject;

function handleSubmit(e){
    e.preventDefault();
    if (dataObject.password !== dataObject.confirmPassword) {
      dispatch(setMismatchedPasswords(false)); // Setting mismatch flag to true when passwords don't match
    } else {
      dispatch(setMismatchedPasswords(true)); // Setting mismatch flag to false when passwords match
      patchRequest();
    }
  }
function patchRequest(){
    const formData = {
        email: dataObject.email,
        password: dataObject.password
    };
    const url = 'http://127.0.0.1:5555/resetpassword';
    const patchData = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }
    fetch(url, patchData).then(r =>r.json()).then(r=>{
      console.log(r); 
      navigate("/login"); 
      alert('Password updated successfully!');
    })
    .catch(error => {
      // Handle any errors in the fetch or JSON parsing
      console.error('Error:', error);
    });
}
return (
  <section>
    <div class="flex justify-center items-center h-screen">
      <div className="bg-white relative items-center w-[600px] h-[500px]  px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
        <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex flex-col">
            <div>
              <h2 className="text-4xl text-black">Reset password</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 space-y-6">
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600"> Email </label>
                    <input
                    type="email"
                    placeholder="Email"
                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    value={dataObject.email}
                    onChange={(e) => dispatch(updateUserField({ field: 'email', value: e.target.value }))}
                    />
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600"> Password </label>
                <input
                  type= 'password'
                  name="password"
                  value={dataObject.password}                  placeholder="******"
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  onChange={(e) => dispatch(updateUserField({ field: 'password', value: e.target.value }))}
                />
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600"> Confirm password </label>
                <input
                  name="confirmPassword"
                  type= 'password'
                  value={dataObject.confirmPassword}
                  placeholder="******"
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"  
                  onChange={(e) => dispatch(updateUserField({ field: 'confirmPassword', value: e.target.value }))}
              
                />
                  {!passwordsMatch && (
              <p className="text-red-500">Passwords do not match. Please try again.</p>
            )}
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
              </div>               
              <div className="col-span-full">
                <button
                  type="submit"
                  className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                >
                  Submit your request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>

    </section>
  );
};

export default ResetPassword;