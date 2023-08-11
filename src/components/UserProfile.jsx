import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import { AiOutlineLogout } from 'react-icons/ai';
import { googleLogout  } from '@react-oauth/google';
import { toast } from 'react-toastify';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {

  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('created');
  const [activeBtn, setActiveBtn] = useState('created');

  const navigate = useNavigate();
  const { userId } =useParams();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));

    if(!user) {
      user = {
        username: 'Guest',
        image: 'https://res.cloudinary.com/dxkokmfiu/image/upload/v1691221086/Sosial%20Media/wkxjlekeuq2y2cvejvtr.jpg',
        email: 'guest@example.com',
      }
    }
    // check user is a guest or user in system
    if(user.username === 'Guest') {
      toast.warn('You must be user to use this function');
      return navigate("/login");
    }else {
      if(user) {
        setUser(user);
      }else {
        fetch(`http://localhost:7070/api/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => {
          return res.json();
        }).then(data => {
          if(data.pins) {
            setPins(data.pins)
          }
        })
      }
    }  
  }, [userId])

  
  useEffect(() => {
    fetch(`http://localhost:7070/api/user/${activeBtn}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      if(data.pins) {
        setPins(data.pins)
      }else {
        setPins(null)
      }
    })
  },[text]);

  if(!user) {
    return <Spinner message="Loading profile..."/>
  } 


  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          {/* top user */}
          <div className='flex flex-col justify-center items-center'>
            <img 
              src="https://res.cloudinary.com/dxkokmfiu/image/upload/v1691290661/Sosial%20Media/xngr7cc1crlxbd26erun.jpg"
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt='banner-pic'
            />
            <img 
              src={user?.image ? user.image : user.picture}
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              alt='user-pic'
           />
           <h1 className='font-bold text-3xl text-center mt-3'>
            {user?.username ? user.username : `${user.firstName} ${user.lastName}`}
           </h1>
           <div className='absolute top-0 z-1 right-1 pt-2'>
            {userId === user._id && (
              <button
                type='button'
                className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                onClick={googleLogout()}
              >
                <AiOutlineLogout />
              </button>
            )}
           </div>
          </div>
          {/* user create  */}
          <div className='text-center mb-7'>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('saved');
              }}
              className={`${activeBtn === 'saved' ?  activeBtnStyles : notActiveBtnStyles }`}
            >
              Saved
            </button>
          </div>
          
          {/* save and created */}
          {pins?.length ? (
            <div className='px-2'>
              <MasonryLayout pins={pins}/>
            </div>
          ) : (
            <div className='flex justify-center font-bold item-center w-full text-xl mt-2'>
              No Pins Found!
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default UserProfile