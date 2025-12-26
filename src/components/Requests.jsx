import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/requestSlice';

const Requests = () => {

    const store = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const reviewrequest = async (status,requestId) => {
        try{
            const response = await axios.post(BASE_URL+'request/respond/'+status+'/'+requestId,{}, { withCredentials: true });
            dispatch(removeRequests(requestId));

        }
        catch(err){
            console.log("Error reviewing request", err.response);
        }
    }
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
    <div className='flex flex-col items-center my-10'>
        <h1 className='text-bold text-2xl'>Requests</h1>
       {store.map((connection) => (
        <>
        <div className='flex gap-8 m-4 p-4 mx-auto justify-between items-center bg-base-200 rounded-lg w-1/2' key={connection.fromUser._id}>
            <h2>{connection.fromUser.firstName} {connection.fromUser.lastName}</h2>
            <div className='flex gap-4 mt-2'>
            <button className="btn btn-primary" onClick={() => reviewrequest("rejected",connection._id)}>Reject</button>
            <button className="btn btn-secondary" onClick={() => reviewrequest("accepted",connection._id)}>Accept</button>
            </div>
        </div>
        </>
        
       ))}
    </div>
  );
};

export default Requests