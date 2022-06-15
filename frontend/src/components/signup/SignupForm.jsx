import React from 'react'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

import axiosClient from '../../config/axiosClient'

const SignupForm = ({ role }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSignUp = async () => {
    try {
      let role_id = 0
      role === 'mitra' ? (role_id = 2) : (role_id = 3)
      const data = await axiosClient.post('/register', { username, email, password, role_id })
      console.log(data)
      console.log(username)
      console.log(password)
      console.log(email)
      console.log(role_id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white p-10 mt-10 w-1/4">
      <div className="flex flex-col items-center">
        <FaUserCircle fontSize={64} />
        <h2 className="mt-3 text-3xl font-semibold capitalize">{role}</h2>
      </div>
      <div className="mt-3 space-y-8">
        <div className="flex flex-col space-y-3">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="border-b border-black outline-none"
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="border-b border-black outline-none"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="border-b border-black outline-none"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div>
          <button className="w-full py-3 bg-black rounded-full text-white" onClick={handleSignUp}>
            Daftar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
