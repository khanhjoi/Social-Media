import React from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
// import { Fcgoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';


// import Components
import Form from './form/Form';
import { useEffect } from "react";

const Login = () => {

  localStorage.clear();
  
  const navigate = useNavigate();
  
  function handleRegister(formData) {
    // call API here
    fetch('http://localhost:7070/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      // handle success response here
      return response.json();
    })
    .then(data => {
      // redirect and store use
      if(data.message) {
        toast.success(data.message);
        navigate('/login');
      }

      if(data.error) {
        toast.error(data.error);
      }
    })
  }

 

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex 
          flex-col justify-center items-center 
          top-0 right-0 left-0 bottom-0 bg-blackOverlay'
        >
          <div className='p-5 mb-6'>
            <img src={logo} width="130px" alt="logo"/>
          </div>
          {/* LoginForm */}
          <Form title="Register" method="POST" onSubmit={handleRegister} />

        </div>
      </div>
    </div>
  )
}

export default Login;