import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function RegistrantList() {
  return (
    <div className="container">
      <h1 className="text-2xl font-semibold">Daftar Peneliti</h1>
      <div className="space-y-3 mt-10">
        <div className="border-2 bg-gray-100 rounded-md p-3 grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_6fr_1fr] gap-3">
          <div className="flex items-center justify-center">
            <AiOutlineUser fontSize={56} />
          </div>
          <div>
            <div className="text-lg md:text-2xl font-semibold">Nama peneliti</div>
            <div className="text-xs md:text-sm mb-5">Nama universitas</div>
            <Link
              to="registrantId"
              className="text-xs md:text-sm text-blue-500 hover:text-blue-600"
            >
              Lihat detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrantList
