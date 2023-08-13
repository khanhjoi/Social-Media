import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';

import logo from '../assets/logo.png'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray:500 hover:text-black transition-all duration-200 ease-in-out'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-back transition-all duration-200 ease-in-out'

const categories = [
  { name: 'Animals' },
  { name: 'Wallpapers'},
  { name: "Photography"},
  { name: "Gaming"},
  { name: "Coding"},
  { name: "Other"},
];

const SideBar = ({user, closeToggle}) => {

  const navigate = useNavigate();

  const loutOUt = () => {
    localStorage.clear();
    return navigate("/login");
  }

  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);
  }

  return (
    <div className='flex 
      flex-col justify-between 
      bg-white h-full overflow-y-scroll min-w-2010
      hide-scrollbar
    '>
      <div className='flex flex-col'>
        <Link
          to="/"
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='logo' className='w-full'/>
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill/>
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
          {categories.slice(0, categories.length - 1).map((category, i) => (
            <NavLink
              key={i}
              to={`/category/${category.name}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
              onClick={handleCloseSidebar}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <div className='flex my-6 mb-3 gap-2 items-center bg-white rounded-lg shadow-lg justify-between'> 
          <Link
            to={user._id ? `user-profile/${user._id}` : `user-profile/${user.email}`}
            className='flex gap-2 items-center mx-3 '
          >
            <img src={user.image ? user.image : user.picture} className='w-10 h-10 rounded-full' alt='user profile'/>
            <p>{user?.username ? user?.username : `${user.firstName} ${user.lastName}`}</p>
          </Link>
          <BiLogOut onClick={loutOUt}  className='w-8 h-8 mr-6'/>
          </div>
      )}
    </div>
  )
}

export default SideBar