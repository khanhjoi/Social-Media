import React, { useEffect, useState } from 'react'

import MasonryLayout from './MasonryLayout';
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(searchTerm) {
      setLoading(true);
      // call API to search pin
    
      setTimeout(() => {
        setLoading(false);
        setPins([
          {id: 1, pin: {postBy: "khanh", destination: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg", src: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg"}},
          {id: 2, pin: {postBy: "khanh2", destination: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg", src: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg"}},
        ])
      }, 600)
    } else {
      setLoading(false);
    }
  }, [searchTerm])
  

  return (
    <div>
      {loading && <Spinner message="Searching for pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins}/>}
      {pins?.length === 0 && searchTerm !== '' && !loading && 
        <div className='mt-10 text-center text-xl'>No Pins For</div>
      }
    </div>
  )
}

export default Search