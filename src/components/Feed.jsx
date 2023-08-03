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
      console.log(categoryId)
      fetch("http://localhost:7070/api/pins" , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({categoryId})
      }).then(res => {
        return res.json();
      }).then(data => {
        if(data) {
          setPins(data);
        }
        setLoading(false);
      })
    } else {

      fetch("http://localhost:7070/api/pins" , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
        return res.json();
      }).then(data => {
        if(data) {
          setPins(data);
        }
        setLoading(false);
      })
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