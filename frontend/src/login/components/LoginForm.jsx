import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

function LoginForm({ role }) {
  return (
    <div className="bg-white p-10 mt-10 w-1/4">
      <div className="flex flex-col items-center">
        <FaUserCircle fontSize={64} />
        <h2 className="mt-3 text-3xl font-semibold capitalize">{role}</h2>
      </div>
      <div className="mt-3 space-y-8">
        <div className="flex flex-col space-y-3">
          <label htmlFor="">Username</label>
          <input type="text" className="border-b border-black outline-none" />
        </div>
        <div className="flex flex-col space-y-3">
          <label htmlFor="">Password</label>
          <input type="password" className="border-b border-black outline-none" />
          <div>
            <a href="#lupapassoword" className="text-sm text-blue-600 hover:underline">
              Lupa Password
            </a>
          </div>
        </div>
        <div>
          <button className="w-full py-3 bg-black rounded-full text-white">Masuk</button>
        </div>
        <div className="text-center ">
          Belum punya akun ? <br />
          <a href="#daftar" className="text-blue-600">
            Daftar
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
