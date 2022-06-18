import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../../store/useUserStore'
import MitraNavigation from '../navigation/MitraNavigation'

function TopBar() {
  const user = useUserStore((state) => state.user)
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (user.role === 'industry') {
      navigate('/mitra/profile')
    } else {
      navigate('/researcher/profile')
    }

    setShowMenu(!showMenu)
  }
  return (
    <div className="w-full bg-black p-6 flex justify-end items-center space-x-5">
      <div className="flex space-x-5  ">
        {user.role === 'industry' ? <MitraNavigation /> : null}
      </div>
      <div className="relative">
        <button
          className="flex space-x-3 bg-white px-5 py-3 rounded-full
      "
          onClick={user ? () => setShowMenu(!showMenu) : () => navigate('/login')}
        >
          <FaUserCircle fontSize={24} />
          {!user && <span className="">Masuk</span>}
        </button>
        {showMenu && (
          <div className="absolute fle flex-col top-14 right-0 p-3 bg-white shadow-md rounded-md">
            <button onClick={handleNavigate} className="px-10 py-2 hover:bg-gray-100">
              Profile
            </button>
            <button className="px-10 py-2 hover:bg-gray-100 mt-2">Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBar
