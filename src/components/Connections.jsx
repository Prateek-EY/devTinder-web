import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const store = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
            // Function to fetch connections data
            const response = await axios.get(BASE_URL+ 'user/requests/connections', { withCredentials: true });
            console.log("Connections data fetched:", response.data);
            dispatch(addConnections(response.data));
        }
        catch(err){
            console.log("Error fetching connections", err.response);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!store) return;

    if(store.length === 0){
        return (
            <div className='flex justify-center my-10'>
                <h1 className='text-bold text-2xl'>No Connections Found</h1>
            </div>
        );
    }
  return (
    <div className='justify-center my-10'>
        <h1 className='text-bold text-2xl'>Connections</h1>
       {store.map((connection) => (
        <div className='m-4 p-4 bg-base-200 rounded-lg'>
            <h2>{connection.firstName} {connection.lastName}</h2>
        </div>
       ))}
    </div>
  );
};

export default Connections