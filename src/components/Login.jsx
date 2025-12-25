import axios from 'axios';
import React, { use, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState("");

    const handlelogin = async () => {
        try {
           const response =  await  axios.post(BASE_URL+'login',{
                email: email,
                password: password
            },{withCredentials: true});

            console.log("Login successful", response.data);
            dispatch(addUser(response.data.user));
            return navigate('/');
        }
        catch (error) {
          setError(error.response?.data || "Login failed");
            console.error("Login failed", error);
        }
    }
  return (
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 text-primary-content w-96">
  <div className="card-body">
    <h2 className="card-title">Login</h2>
    <div>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email Id</legend>
  <input type="text" value = {email} className="input" placeholder="Type here"  onChange={(e) => setEmail(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" value={password} className="input" placeholder="Type here" onChange={(e) => setPassword(e.target.value)}/>
    </fieldset>
    </div>
    <p className="text-red-50">{error}</p>
    <div className="card-actions justify-center py-2">
      <button className="btn" onClick={handlelogin}>Log In</button>
    </div>
  </div>
</div>
</div>
  );
};

export default Login