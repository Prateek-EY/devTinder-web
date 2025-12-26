import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const {_id,firstName,lastName,skills,email,gender,age} = user || {};
    const dispatch = useDispatch();
    const handleSendRequest = async  (status,toUserId) => {
        try{
            const response = await axios.post(BASE_URL+'request/send/'+status+'/'+toUserId,{},{withCredentials:true});
            dispatch(removeFeed(toUserId)); // To refresh the user data after sending request

        }
        catch(err){
        }
    }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">
       {firstName} {lastName}
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <h2 className="">
       {age} Yr, {gender == "male"? "M" : "F"}
      </h2>
      <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      <div className="card-actions justify-end my-8">
        <div className="btn btn-secondary bg-blue-400" onClick={() => handleSendRequest("ignored",_id)}>Ignore</div>
        <div className="btn btn-secondary bg-pink-400" onClick={() => handleSendRequest("interested",_id)}>Interested</div>
      </div>
    </div>
  </div>
  )
}

export default UserCard