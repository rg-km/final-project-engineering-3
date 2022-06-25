import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const Role = ({ selectRole }) => {
  return (
    <div className="bg-white p-10 md:mt-10 w-full md:w-2/5 2xl:w-1/4">
      <h1 className="text-4xl font-semibold">Daftar</h1>
      <p className="mt-2 font-light">sebagai</p>
      <div className="space-y-5 mt-8">
        <button
          className="w-full bg-black px-5 py-5 flex rounded-md space-x-3 items-center"
          onClick={() => selectRole('mitra')}
        >
          <FaUserCircle fontSize={28} color="white" />
          <span className="text-white text-xl">Mitra</span>
        </button>

        <button
          className="w-full bg-black px-5 py-5 flex rounded-md space-x-3 items-center"
          onClick={() => selectRole('peneliti')}
        >
          <FaUserCircle fontSize={28} color="white" />
          <span className="text-white text-xl">Peneliti</span>
        </button>
      </div>
    </div>
  )
}

export default Role
