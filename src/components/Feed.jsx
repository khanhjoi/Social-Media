import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {

  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if(categoryId) {  
      setTimeout(()=> {
        setLoading(false);

        // fake database
        setPins([
          {id: 1, pin: {postBy: "khanh", destination: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg", src: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg"}},
          {id: 2, pin: {postBy: "khanh2", destination: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg", src: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg"}},
          {id: 3, pin: {postBy: "khanh3", destination: "https://i.pinimg.com/564x/35/78/70/35787019bf53be64436256c8c37b874b.jpg", src: "https://i.pinimg.com/564x/35/78/70/35787019bf53be64436256c8c37b874b.jpg"}},
        ])
      },2000)
    } else {
      // fake database
      setPins([
        {id: 1, pin: {postBy: "khanh", destination: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg", src: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg"}},
        {id: 2, pin: {postBy: "khanh2", destination: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg", src: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg"}},
        {id: 3, pin: {postBy: "khanh3", destination: "https://i.pinimg.com/564x/35/78/70/35787019bf53be64436256c8c37b874b.jpg", src: "https://i.pinimg.com/564x/35/78/70/35787019bf53be64436256c8c37b874b.jpg"}},
      ])
      setLoading(false);
    }
    return () => { 
    }
  }, [categoryId])
  

  if(loading) return <Spinner message="wa are adding new ideas to your feed" />
  
  if(!pins?.length) return <h2>No pins available</h2>
  
  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed;