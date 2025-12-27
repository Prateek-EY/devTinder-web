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
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");
    const [skills,setSkills] = useState("");
    const [about,setAbout] = useState("");
    const [photo,setPhoto] = useState("");
    const [isLoginMode,setIsLoginMode] = useState(true); // true for login, false for signup

    const handlesignup =  async () => {
      try{
          const response = await axios.post(BASE_URL+'signup',{firstName,lastName,age,gender,skills,about,photo,email,password},{withCredentials:true});
          console.log("Signup successful", response);
          dispatch(addUser(response.data.data));
          navigate('/profile');
      }
      catch(error){
        setError(error.response?.data || "Signup failed");
        console.error("Signup failed", error);
      }
    }

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
    <>
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 text-primary-content w-96">
  <div className="card-body">
    <h2 className="card-title">{isLoginMode ? "Login" : "Sign Up"}</h2>
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
    {!isLoginMode &&<div>
    <fieldset className="fieldset">
      <legend className="fieldset-legend">FirstName</legend>
      <input type="text" value = {firstName} className="input" placeholder="Type here"  onChange={(e) => setFirstName(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
      <legend className="fieldset-legend">LastName</legend>
      <input type="text" value = {lastName} className="input" placeholder="Type here"  onChange={(e) => setLastName(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Age</legend>
      <input type="text" value = {age} className="input" placeholder="Type here"  onChange={(e) => setAge(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Gender</legend>
      <input type="text" value = {gender} className="input" placeholder="Type here"  onChange={(e) => setGender(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Skills</legend>
      <input type="text" value = {skills} className="input" placeholder="Type here"  onChange={(e) => setSkills(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
      <legend className="fieldset-legend">About</legend>
      <input type="text" value = {about} className="input" placeholder="Type here"  onChange={(e) => setAbout(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Photo</legend>
      <input type="text" value = {photo} className="input" placeholder="Type here"  onChange={(e) => setPhoto(e.target.value)}/>
    </fieldset>
    </div>
  }
    <p className="text-red-50">{error}</p>
    <div className="card-actions justify-center py-2">
      <button className="btn" onClick={isLoginMode ? handlelogin : handlesignup}>{isLoginMode ? "Log In":"Sign Up"}</button>
    </div>
    <p className="text-red-50 cursor-pointer"  onClick={() => setIsLoginMode(value => !value)}>{isLoginMode ? "New User? Signup here":"Existing User? Login here"}</p>
  </div>
</div>
    </div>


    </>
  );
};

export default Login