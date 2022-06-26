import React from 'react'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import useSignupStore from '../../store/useSignupStore'
import useSignupErrorMessage from '../../hooks/useSignupErrorMessage'
import axiosClient from '../../config/axiosClient'
import { useNavigate } from 'react-router-dom'

const SignupForm = ({ role }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const signup = useSignupStore((state) => state.signup)
  const errorMessage = useSignupErrorMessage()
  let role_id = 0

  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      role === 'mitra' ? (role_id = 2) : (role_id = 3)
      await axiosClient.post('/register', { username, email, password, role_id })
      navigate('/signupsuccess')
    } catch (error) {
      signup({ username, email, password, role_id })
    }
  }

  return (
    <div className="bg-white p-10 md:mt-10 w-full md:w-2/5 2xl:w-1/4">
      <div className="flex flex-col items-center">
        <FaUserCircle fontSize={64} />
        <h2 className="mt-3 text-3xl font-semibold capitalize">{role}</h2>
      </div>
      <div className="mt-3 space-y-8">
        <form className="space-y-5" onSubmit={submitHandler}>
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
          {errorMessage && <div className="mt-2 text-red-500 italic text-sm">{errorMessage}</div>}
          <div>
            <button className="w-full py-3 bg-black rounded-full text-white" type="submit">
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
