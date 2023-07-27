import { useState } from "react";

const Input = ({ id, label}) => {

  const [Input, setInput] = useState('');

  return (
    <div className='relative mb-6'>  
      <input 
        id={id}
        name={id}
        value={Input}
        onChange={(e) => {setInput(e.target.value)}}
        className='peer h-10 w-full border-b-2 border-gray-300
          text-gray-900 focus:outline-none 
          placeholder-transparent
          focus:border-rose-600
        '
        placeholder='Email Address'
      />
      <label 
        htmlFor={id} 
        className='
          absolute left-1 -top-3.5 text-gray-600 text-sm
          transition-all
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-placeholder-shown:top-2
          peer-focus:-top-3.5
          peer-focus:text-gray-600
          peer-focus:text-sm
        '>
        {label}
      </label>
    </div>
  );
}
 
export default Input;