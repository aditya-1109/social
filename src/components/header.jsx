import React, { useState } from 'react'
import Buttons from './ui/buttons'
import CreatePost from './modals/createPost';

export default function Header() {
    const [showCreateModal, setShowCreateModal] = useState(false);


  return (
    <div className='bg-gradient-to-b from-gray-600 sticky top-0 via-black to-gray-600 w-full flex items-center px-2 lg:px-10 py-2 flex-row justify-between'>
      <div className='text-white font-extrabold text-4xl uppercase'>Social</div>
      <Buttons onclick= {()=> setShowCreateModal(!showCreateModal)} text="Create Post" />
    {showCreateModal && <CreatePost onclose={()=> setShowCreateModal(false)} />}
    </div>
  )
}
