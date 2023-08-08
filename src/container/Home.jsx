import React, { useState, useRef, useEffect } from 'react'
import { Link,  Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';

import { SideBar, UserProfile } from '../components';
import Pins from './Pins';
import logo from '../assets/logo.png';


const Home = () => {

  const [user, setUser] = useState(null)
  const [toggleSidebar, setToggleSideBar] = useState(false);
  const scrollRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // check if user is logged in with Google
    const googleUser = JSON.parse(localStorage.getItem('userGoogle'));
    if (googleUser) {
      // call backend to log in user with Google
      fetch('http://localhost:7070/api/auth/loginGoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credential:  googleUser.credential })
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
        }else {
          throw new Error('some Thing wrong')
        }
      })
      .catch(error => {
        console.log(error)
      });
    } else {
      // check if user is logged in with backend
      const backendUser = JSON.parse(localStorage.getItem('user'));
      if (backendUser) {
        setUser(backendUser);
      }
    }

    if(!user) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }

  }, []);

  // if user not exit redirect to login

  useEffect(()=> {
    scrollRef.current.scrollTo(0,0)
  },[]);

  return (
    <div className='
      flex bg-gray-50 md:flex-row 
      flex-col h-screen
      transaction-height duration-75 ease-out
    '>
        <div className='hidden md:flex h-screen flex-initial'>
          <SideBar user={user && user}/>
        </div>
        <div className='flex md:hidden flex-row'>
          <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
            <HiMenu fontSize={40} className='cursor-pointer' onClick={() => {setToggleSideBar(true)}}/>
            <Link to="/">
              <img src={logo} alt="logo" className='w-28'/>
            </Link>
            <Link to={user?._id  ? `user-profile/${user?._id}` : `user-profile/${user?.email}`}>
              <img src={user?.image ? user?.image : user?.picture} alt="logo" className='w-28'/>
            </Link>
          </div>
          {toggleSidebar && (
              <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                <div className="absolute w-full flex justify-end items-center p-2">
                  <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => {setToggleSideBar(false)}}/>
                </div>
                <SideBar user={user && user} closeToggle={setToggleSideBar}/>
              </div>
          )}
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile/>}/>
          <Route path='/*' element={<Pins user={user && user}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home;