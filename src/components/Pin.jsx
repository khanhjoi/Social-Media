import React from 'react'

const Pin = ({ pin }) => {
  return (
    <div>
      <img className="rounded-lg w-full" alt="user-post" src={pin.src}/>
    </div>
  )
}

export default Pin;