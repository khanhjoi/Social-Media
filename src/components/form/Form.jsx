import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import Components
import Input from '../form/Input'


const Form = ({ title, onSubmit, method }) => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, username } = e.target;
    onSubmit({ email: email?.value, password: password?.value, username: username?.value });
  }


  const responseGoogle = (response) => {
    localStorage.setItem('userGoogle', JSON.stringify(response));
    navigate("/")
  }

  return (
    <form method={method} onSubmit={handleSubmit} className="bg-white flex flex-col justify-center items-center w-5/6 sm:w-4/6 md:w-3/6 lg:w-4/12 p-8 rounded-2xl shadow-2xl">         
      {/* login */}
      {title === 'Login' && (
        <>
          <p className='flex justify-center items-center font-bold mb-6 mr-4 text-2xl text-black'>{title}</p>
          <Input type="text" id="email" label="Email address" />
          <Input type="password" id="password" label="Password" />
          <div className='flex'>
            <button type="submit" className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mx-4'>{title}</button>
            <button onClick={() => {navigate('/register')}} className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mx-4' >Register</button>
          </div>
        </>
      )}
      {/* register */}
      {title === 'Register' && (
        <>
          <p className='flex justify-center items-center font-bold mb-6 mr-4 text-2xl text-black'>{title}</p>
          <Input id="username" label="Your name" />
          <Input id="email" label="Email address" />
          <Input type="password" id="password" label="Password"  />
          <div className='flex'>
            <button type="submit" className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mx-4'>{title}</button>
          </div>
        </>
      )}
      
      {/* handle error */}

      {/* Login to google */}
      <div 
        className='my-4 w-5/12 flex items-center
        before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300
        after:mt-05 after:flex-1 after:border-t after:border-neutral-300'
      >
        <p className='mx-2 mb-0 text-center font-semibold dark:text-black'>OR</p>
      </div>
      <div className='shadow-2xl'>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin
            type='standard'
            onSuccess={responseGoogle}
            onError={() => {
              toast.error('Login Failed');
            }}
            shape='pill'
          />
      </GoogleOAuthProvider>
    </div>
  </form>
  );
}
 
export default Form;