import React, { useState, useEffect }from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {

  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams();

  // add comment
  const addComment = () => {
    if(comment) {
      setAddingComment(true);
      setTimeout(() => {
        fetchPinDetail();
        setComment('');
        setAddingComment(false);
      }, 600);
    }
  }

  // get pin detail from BE
  const fetchPinDetail = () => {
    setTimeout(() => {
      setPinDetail({
        image: "https://i.pinimg.com/564x/67/4d/e6/674de60418e08b784d91036d1de3c809.jpg",
        description: "hello everyone",
        title: "Cat",
        about: "this is a cat",
        comments: [
          {postBy: {user: "khanh", img: "https://i.pinimg.com/564x/73/56/34/735634fe9be69fc2ac828277cadb8896.jpg"}, comment: "it cute"},
          {postBy: {user: "thu", img: "https://i.pinimg.com/564x/7c/bb/47/7cbb4725c110d39d2199ad1ff0a45732.jpg"}, comment: "i am cute"},
        ]
      });

      setPins([
        {id: 1, pin: {postBy: "khanh", destination: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg", src: "https://i.pinimg.com/564x/35/0e/c2/350ec2d3cf699f1115d998925ba14c89.jpg"}},
        {id: 2, pin: {postBy: "khanh2", destination: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg", src: "https://i.pinimg.com/564x/7d/c9/db/7dc9db9a0f11c20bbfa7752454a97c32.jpg"}},
        {id: 3, pin: {postBy: "khanh3", destination: "https://i.pinimg.com/564x/35/78/70/35787019bf53be64436256c8c37b874b.jpg", src: "https://i.pinimg.com/564x/35/78/70/35787019bf53be64436256c8c37b874b.jpg"}},
      ]);
    }, 1000);
  };

  useEffect(() => {
    fetchPinDetail();
  }, [pinId]);
  

  if(!pinDetail) return <Spinner message="Loading Pin" />

  return (
  <>
    <div className='flex xl-flex-row flex-col m-auto bg-white' style={{ maxWidth: '1500px', borderRadius: '32px'}}>
      <div className='flex justify-center items-center md:items-start flex-initial'>
        <img 
          src={pinDetail?.image}
          className='rounded-t-3xl rounded-b-lg'
          alt="user-post"
        />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
          <a 
                href={`${pinDetail.url}`}
                download
                onClick={(e) => {e.stopPropagation()}}
                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100'
              >
                <MdDownloadForOffline />
              </a>
          </div>
          <a
            href={`${pinDetail.description}`}
            target='_ blank'
            rel="noreferrer"
          >
            {pinDetail.description}
          </a>
        </div>
        <div>
          <h1 className='text-4xl font-bold break-words mt-3'>{pinDetail.title}</h1>
          <p className='mt-3'> {pinDetail.about}</p>
        </div>
        <Link to={user?._id ? `/user-profile/${user?._id}` : `/user-profile/${user?.email}`} className='flex gap-2 mt-2 items-center'>
          <img
            className='w-8 h-8 rounded-full object-cover'
            src={user?.image ? user?.image : user?.picture}
            alt="user-profile"
          />
          <p className='font-semibold capitalize cursor-pointer'>{user.username ? user.username : `${user.firstName} ${user.lastName}`}</p>
        </Link>
        <h2 className='mt-2 text-2xl'>Comments</h2>
        <div className='max-h-370 overflow-y-auto'>
          {pinDetail?.comments?.map((comment, i) => (
            <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={i}>
              <img 
                src={comment.postBy.img}
                alt="user-profile"
                className='w-10 h-10 rounded-full cursor-pointer'
              />
              <div className='flex flex-col'>
                <p className='font-bold'>{comment.postBy.user}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-wrap mt-6 gap-3'>
          <Link to={user?._id ? `user-profile/${user?.id}` : `user-profile/${user?.email}`} >
            <img
              className='w-10 h-10 rounded-full cursor-pointer'
              src={user?.image ? user?.image : user?.picture}
              alt="user-profile"
            />
          </Link>
          <input 
            className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
            type="text"
            placeholder='Add a comments'
            value={comment}
            onChange={(e) => {setComment(e.target.value)}}
          />
          <button
            type='button'
            className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
            onClick={addComment}
          >
            {addingComment ? 'Posting the comment...' : 'Posted'}
          </button>
        </div>
      </div>
    </div>
    
    {pins?.length > 0 ?  (
      <>
        <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
          More like this
        </h2>
        <MasonryLayout pins={pins}/>
      </>  
    ): (
      <Spinner message="Loading more Pins" />
    )}
  </>
  )
}

export default PinDetail;