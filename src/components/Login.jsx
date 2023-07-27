import React, { useEffect } from 'react'

// import { Fcgoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

// import Components
import Form from './form/Form';

const Login = () => {

  function handleLogin(formData) {
    // Handle the login form submission here...
    console.log('Form data:', formData);
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
          <Form title="Login" onSubmit={handleLogin}/>
 
        </div>
      </div>
    </div>
  )
}

export default Login;