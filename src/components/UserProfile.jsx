import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import { AiOutlineLogout } from 'react-icons/ai';
import { googleLogout  } from '@react-oauth/google';

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
    setTimeout(() => {
      setUser({
        _id: "123",
        userName: "khanh",

      })
    },500);
  }, [userId])

  useEffect(() => {
    setTimeout(() => {
      if(text === 'Created') {
        setPins([
          {id: 1, pin: {postBy: "khanh", destination: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg", src: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg"}},
          {id: 2, pin: {postBy: "khanh2", destination: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg", src: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg"}},
          {id: 3, pin: {postBy: "khanh3", destination: "https://i.pinimg.com/564x/35/78/70/35787019bf53be64436256c8c37b874b.jpg", src: "https://i.pinimg.com/564x/35/78/70/35787019bf53be64436256c8c37b874b.jpg"}},
        ])
      } else {
        setPins([
         
        ])
      }
    },500);
  }, [text, userId])
  

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
              src="https://i.pinimg.com/564x/c2/aa/4c/c2aa4c16f703bf71e0045227dbdaa0d6.jpg"
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt='banner-pic'
            />
            <img 
              src='https://i.pinimg.com/564x/67/4d/e6/674de60418e08b784d91036d1de3c809.jpg'
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              alt='user-pic'
           />
           <h1 className='font-bold text-3xl text-center mt-3'>
            {user.userName}
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