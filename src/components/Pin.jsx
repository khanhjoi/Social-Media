import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';



const Pin = ({ pin }) => {

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => {setPostHovered(true)}}
        onMouseLeave={() => {setPostHovered(false)}}
        onClick={() => {navigate(`/pin-detail/${pin.id}`)}}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
      <img className="rounded-lg w-full" alt="user-post" src={pin.src}/>
      {postHovered && (
        <div
          className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
          style={{ height: '100%' }}
        >
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <a 
                href={`${pin.url}`}
                download
                onClick={(e) => {e.stopPropagation()}}
                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            {/* {alreadySaved?.length !== 0 ? (
              <button>
                Saved
              </button>
            ): (
              <button>
                Save
              </button>
            )} */}
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
      <Link to={`/user-profile/${123}`} className='flex gap-2 mt-2 items-center'>
        <img
          className='w-8 h-8 rounded-full object-cover'
          src='https://i.pinimg.com/564x/67/4d/e6/674de60418e08b784d91036d1de3c809.jpg'
          alt="user-profile"
        />
        <p className='font-semibold capitalize'>Khanh</p>
      </Link>
    </div>
  )
}

export default Pin;