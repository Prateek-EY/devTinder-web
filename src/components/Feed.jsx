import React, { use, useEffect } from 'react'
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if(feed && feed.length > 0) return; // Avoid refetching if feed already exists
    const response = await axios.get(BASE_URL+'users/feed', { withCredentials: true });
    console.log("Feed data fetched:", response.data);
    dispatch(addFeed(response.data));
  }
  useEffect(() => {
    getFeed();
  }, []);
  console.log("Feed component render, feed:", feed);
  return (
    feed  && (<div className='flex justify-center my-10'>
    <UserCard user={feed[0]} />
   </div>
    )
  );
};

export default Feed