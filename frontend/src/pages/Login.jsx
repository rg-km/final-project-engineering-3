import { FaUserCircle } from 'react-icons/fa'
import { BiShow, BiHide } from 'react-icons/bi'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import useUserStore from '../store/useUserStore'
import useUserErrorMessage from '../hooks/useUserErrorMessage'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = useUserStore((state) => state.login)
  const errorMessage = useUserErrorMessage()

  const submitHandler = (e) => {
    e.preventDefault()
    login({ username, password })
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 md:p-10 md:mt-10 w-full md:w-2/5 2xl:w-1/4">
        <div className="flex flex-col items-center">
          <FaUserCircle fontSize={64} />
          <h2 className="mt-3 text-xl md:text-3xl font-semibold capitalize">Login</h2>
        </div>
        <div className="mt-3">
          <form className="space-y-5" onSubmit={submitHandler}>
            <div className="flex flex-col space-y-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="border-b border-black outline-none"
                required
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>
            <div className="flex flex-col space-y-3 relative">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="border-b border-black outline-none"
                required
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <button
                type="button"
                className="absolute right-0 bottom-0 p-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </button>
            </div>
            <div>
              <a href="#lupapassoword" className="text-sm text-blue-600 hover:underline">
                Lupa Password
              </a>
              {errorMessage && (
                <div className="mt-2 text-red-500 italic text-sm">{errorMessage}</div>
              )}
            </div>
            <div>
              <button className="w-full py-3 bg-black rounded-full text-white" type="submit">
                Masuk
              </button>
            </div>
            <div className="text-center ">
              Belum punya akun ? <br />
              <Link to="/signup" className="text-blue-600">
                Daftar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
