import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handlelogin = async () => {
        try {
           const response =  await  axios.post('http://localhost:3000/login',{
                email: email,
                password: password
            },{withCredentials: true});
        }
        catch (error) {
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
    <div className="card-actions justify-center py-2">
      <button className="btn" onClick={handlelogin}>Log In</button>
    </div>
  </div>
</div>
</div>
  );
};

export default Login