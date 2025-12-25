import React, { use, useEffect } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addUser} from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
      fetchUser();
  }, []);
  const fetchUser = async () => {
    // Function to fetch user data
    try{
    const response = await axios.get(BASE_URL+'user', { withCredentials: true });
    console.log("User data fetched:", response.data);
    dispatch(addUser(response.data))

    }
    catch(err){
      if(err.response && err.response.status === 401)
        navigate('/login');
      console.log("Error fetching user data", err);
    }
  }
  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  );
};

export default Body;