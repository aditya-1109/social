import React from 'react'

export default function Buttons({text, onclick}) {
  return (
     <button onClick={onclick} className='rounded-lg flex px-2 cursor-pointer py-1 lg:px-4 lg:py-2 bg-gradient-to-r from-amber-400 to-red-400 text-white font-bold border border'>
        {text}
    </button>
  
  )
}
