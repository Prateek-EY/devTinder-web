import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [error,setError] = useState("");
    const [gender,setGender] = useState(user.gender);
    const [age,setAge] = useState(user.age);
    const [skills,setSkills] = useState(user.skills);
    const dispatch = useDispatch();
    const saveProfile = async () => {
        try{
            const response = await axios.patch(BASE_URL+'profile/edit',{
                firstName,
                lastName,
                gender,
                age,
                skills},{withCredentials:true}
            );
            console.log("Profile updated successfully", response.data);
            dispatch(addUser(response.data));

        }
        catch(error){
            setError("Failed to save profile");
        }

    };
  return (
    <>
    <div className='flex justify-center my-10'>
    <div className='flex justify-center mx-10'>
    <div className="card bg-base-300 text-primary-content w-96">
  <div className="card-body">
    <h2 className="card-title">Edit Profile</h2>
    <div>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">FirstName</legend>
  <input type="text" value={firstName}  className="input" placeholder="Type here"  onChange={(e) => setFirstName(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">LastName</legend>
  <input type="text" value={lastName} className="input" placeholder="Type here" onChange={(e) => setLastName(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
    <legend className="fieldset-legend">Gender</legend>
    <input type="text" value={gender} className="input" placeholder="Type here" onChange={(e) => setGender(e.target.value)}/>
    </fieldset>
    <fieldset className="fieldset">
    <legend className="fieldset-legend">Age</legend>
    <input type="text" value={age} className="input" placeholder="Type here" onChange={(e) => setAge(e.target.value)}/>
    </fieldset>
    </div>
    <p className="text-red-50">{error}</p>
    <div className="card-actions justify-center py-2">
      <button className="btn" onClick={() => saveProfile()}>Save Profile</button>
    </div>
  </div>
</div>
    </div>
    <UserCard user = {{firstName,lastName,skills,gender,age}}/>
    </div>
    </>
  );
};

export default EditProfile