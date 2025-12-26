import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
    const store = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const fetchRequests = async () => {
        try{
            const response = await axios.get(BASE_URL+'user/requests/received', { withCredentials: true });
            console.log("Requests data fetched:", response.data);
            dispatch(addRequests(response.data));
        }
        catch(err){
            console.log("Error fetching requests", err.response);
        }
    }
    useEffect(() => {
        fetchRequests();
    }, []);
    if(!store) return;
    
    if(store.length === 0){
        return (
            <div className='flex justify-center my-10'>
                <h1 className='text-bold text-2xl'>No Requests Found</h1>
            </div>
        );
    }
  return (
    <div className='justify-center my-10'>
        <h1 className='text-bold text-2xl'>Requests</h1>
       {store.map((connection) => (
        <div className='m-4 p-4 bg-base-200 rounded-lg' key={connection.fromUser._id}>
            <h2>{connection.fromUser.firstName} {connection.fromUser.lastName}</h2>
        </div>
       ))}
    </div>
  );
};

export default Requests