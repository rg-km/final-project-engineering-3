import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { BiShow, BiHide } from 'react-icons/bi'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 md:p-10 mt-10 w-4/5 md:w-2/5 2xl:w-1/4">
        <div className="flex flex-col items-center">
          <FaUserCircle fontSize={64} />
          <h2 className="mt-3 text-xl md:text-3xl font-semibold capitalize">Login</h2>
        </div>
        <div className="mt-3 space-y-8">
          <div className="flex flex-col space-y-3">
            <label htmlFor="">Username</label>
            <input type="text" className="border-b border-black outline-none" />
          </div>
          <div className="flex flex-col space-y-3 relative">
            <label htmlFor="">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="border-b border-black outline-none"
            />
            <div>
              <a href="#lupapassoword" className="text-sm text-blue-600 hover:underline">
                Lupa Password
              </a>
            </div>
            <button
              className="absolute right-0 bottom-8 p-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
          <div>
            <button className="w-full py-3 bg-black rounded-full text-white">Masuk</button>
          </div>
          <div className="text-center ">
            Belum punya akun ? <br />
            <Link to="/signup" className="text-blue-600">
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
