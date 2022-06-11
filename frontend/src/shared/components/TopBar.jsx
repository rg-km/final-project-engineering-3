import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

function TopBar() {
  return (
    <div className="w-full bg-black p-6 flex justify-end">
      <button
        className="flex space-x-3 bg-white px-5 py-3 rounded-full
      "
      >
        <FaUserCircle fontSize={24} />
        <span>Masuk</span>
      </button>
    </div>
  )
}

export default TopBar
