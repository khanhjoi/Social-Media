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
      fetch(`http://localhost:7070/api/pins/${searchTerm}`, {
        method: 'GET'
      }).then(res => {
        return res.json();
      }).then(data => {
        setPins(data);
        setLoading(false);
      })
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