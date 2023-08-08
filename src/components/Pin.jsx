import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiTwotoneHeart } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';



const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPin, setSavingPin] = useState([]);
  const [alreadySaved, setAlreadySaved] = useState(false);

  const navigate = useNavigate();

  const savePin = (e) => {
    e.stopPropagation()

    const user  = JSON.parse(localStorage.getItem('user'));

    const userId = user?._id ? user._id : user.email;

    fetch('http://localhost:7070/api/pin/save', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idUser: userId, idPin: pin._id})
    }).then(res => {
      return res.json();
    }).then(data => {  
      console.log(data);
      setSavingPin(data.result.Save);
      setAlreadySaved(data.alreadySaved);
    })
  }

  useEffect(() => {
    const user  = JSON.parse(localStorage.getItem('user'));

    const userId = user?._id ? user._id : user.email;

    fetch(`http://localhost:7070/api/pin/${pin._id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }).then(data => {
      const check = data.save.includes(userId);
      console.log(check);
      if(check) {
        setAlreadySaved(true);
      }else {
        setAlreadySaved(false);
      }
    })
  },[])

  return (

    <div className='m-2'>
      <div
        onMouseEnter={() => {setPostHovered(true)}}
        onMouseLeave={() => {setPostHovered(false)}}
        onClick={() => {navigate(`/pin-detail/${pin._id}`)}}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
      <img className="rounded-lg w-full" alt="user-post" src={pin?.image?.url}/>
      {postHovered && (
        <div
          className='absolute top-0 w-full h-full flex flex-col justify-between p-2 pr-2 pt-2 pb-2 z-50'
          style={{ height: '100%' }}
        >
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <a 
                href={`${pin?.image?.url}`}
                download
                onClick={(e) => {e.stopPropagation()}}
                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            {!alreadySaved ? (
              <button className='text-pink-400 bg-pink-100 rounded-full w-9 h-9 flex items-center justify-center text-xl opacity-75 hover:opacity-100' onClick={savePin}>
                <AiOutlineHeart/>
              </button>
            ): (
              <button className='text-pink-400 bg-pink-100 rounded-full w-9 h-9 flex items-center justify-center text-xl opacity-75 hover:opacity-100'  onClick={savePin}>
                <AiTwotoneHeart/>
              </button>
            )}
          </div>
          <div className='flex justify-between items-center gap-2 w-full'>
            {pin?.destination && (
              <a
                href={pin.destination}
                target="_blank"
                rel="noreferrer"
                className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full truncate opacity-70 hover:opacity-100 hover:shadow-md'
                onClick={(e) => {e.stopPropagation()}}
              >
                <BsFillArrowUpRightCircleFill />
                <p className='w-full truncate'>{pin.destination}</p>
              </a>
            )}
            {pin?.postBy && (
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  //delete_pin
                }}
                className='bg-white opacity-70 h-10 hover:opacity-100 text-center text-dark font-bold px-5 py-1 text-base rounded-full hover:shadow-md outline-none'
              >
              <AiTwotoneDelete/>
              </button>
            )}
          </div>
        </div>
      )}
      </div>
      <Link to={`/user-profile/${pin.userId}`} className='flex gap-2 mt-2 items-center'>
        <img
          className='w-8 h-8 rounded-full object-cover'
          src={pin.userImg}
          alt="user-profile"
        />
        <p className='font-semibold capitalize'>Khanh</p>
      </Link>
    </div>
  )
}

export default Pin;