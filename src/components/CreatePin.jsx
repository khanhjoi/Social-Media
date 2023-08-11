import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md';

import Spinner from './Spinner';

const categories = [
  { name: 'Animals' },
  { name: 'Wallpapers'},
  { name: "Photography"},
  { name: "Gaming"},
  { name: "Coding"},
  { name: "Other"},
];

const CreatePin = ({ user }) => {

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage =  (e) => {
    const { type } = e.target.files[0];
    const file = e.target.files[0];
    if(type === 'image/png' || type === "image/svg" || type === 'image/jpeg' || type === "image/gif" || type === 'image/tiff') {   
      // uploadFile
      setLoading(true);

      // file reader -> to base64 string
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        // call api to upload
        try {
          const response = await fetch('http://localhost:7070/api/upload-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: reader.result }),
          });
          
          if (response.ok) {
            const data = await response.json();
            setImageAsset(data);
            setLoading(false);
          } else {
            console.log('Upload failed.');
          }

        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setWrongImageType(true);
    }

  }

  const removeImage = (e) => {
    console.log(imageAsset);
    fetch('http://localhost:7070/api/upload-image', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_id: imageAsset.public_id})
    }).then(res => {
      return res.json();
    }).then(data => {
      if(data.result) {
        setImageAsset(null);
      }else {
        throw new Error (data);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const savePin = () => {
    if(title &&  imageAsset && category) {
      fetch("http://localhost:7070/api/createPin" , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title, about, destination, category, imageAsset, 
          userId: user?._id || user.email,
          userImg: user?.image ? user?.image : user?.picture,
          postedBy: user.username ? user?.username : `${user?.firstName} ${user?.lastName}`
        })
    }).then(res => {
      return res.json();
    }).then(data => {
      if(data) {
        return navigate("/");
      }
    })
    } else {
      toast.error('Lack information')
    }
  }
  
  useEffect(() => {
    if(user.username === 'Guest') {
      toast.warn('You must be user to use this function');
      return navigate("/login");
    }
  }, [user]);

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
          Please fill in all the fields
        </p>
      )}
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-2xl'>
                      <AiOutlineCloudUpload /> 
                    </p>
                    <p className='text-lg'>click to upload</p>
                  </div>
                  <p className='mt-32 text-gray-400'>
                    Use hight-quality JPG, SVG, GIF, or TIFF less than 20mb
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  className='w-0 h-0'
                  onChange={uploadImage}
                />
              </label>
            ): (
              <div className='relative h-full'>
                <img src={`${imageAsset?.url}`} alt="upload-pic" className='h-full w-full'/>
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-noe hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={removeImage}
                >
                  <MdDelete/>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
            <input 
              type='text' 
              value={title} 
              onChange={(e) => {setTitle(e.target.value)}}
              placeholder='Add your title here'
              className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
            />
            {user && (
              <div className='flex gap-2 my-2 items-center bg-white rounded-md'>
                <img 
                  src={ user?.image ? user?.image : user?.picture}
                  alt="user-profile"
                  className='w-10 h-10 rounded-full'
                />
                {/* <p> user name</p> */}
                <p className='font-bold'>{user.username ? user.username : `${user.firstName} ${user.lastName}`}</p>
              </div>
            )}
            <input 
              type='text' 
              value={about} 
              onChange={(e) => {setAbout(e.target.value)}}
              placeholder='What is your pin about'
              className='outline-none text-2xl sm:text-lg border-b-2 border-gray-200 p-2'
            />
            <input 
              type='text' 
              value={destination} 
              onChange={(e) => {setDestination(e.target.value)}}
              placeholder='Add a destination link'
              className='outline-none text-2xl sm:text-lg border-b-2 border-gray-200 p-2'
            />
            <div className='flex flex-col'>
              <div>
                <p className='mb-2 font-semibold text-lg sm:text-xl'>Choose pin category</p>
                <select
                  onChange={(e) => {setCategory(e.target.value)}}
                  className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
                >
                  <option value="other" className='bg-white'>select Category</option>

                  {categories.map((category, i) => (
                    <option key={i} className='text-base border-0 outline-none capitalize bg-white text-black' value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex justify-end items-end mt-5'>
                <button 
                  type='button' 
                  onClick={savePin}
                  className='bg-red-500 text-white font-bold p-2 rounded-full outline-none'
                >
                  Save Pin
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin; 