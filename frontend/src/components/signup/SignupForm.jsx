import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { FaCheck, FaUserCircle } from 'react-icons/fa'
import { FaIcons } from 'react-icons/fa'
import axiosClient from '../../config/axiosClient'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const SignupForm = ({ role }) => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('')
  
  const [password, setPassword] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [MatchFocus, setMatchFocus] = useState(false)

  const [email, setEmail] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  // useEffect(()=>{
  //   userRef.current.focus();
  // },[])

  useEffect(()=>{
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPwd(result);
    const match = password === matchPassword
    setValidMatch(match);
  }, [password, matchPassword])

  useEffect(()=>{
    setErrMsg('');
  },[password, matchPassword])




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
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
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
            required
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
          <label htmlFor="">
            Password
            <span className={validPwd ? 'valid' : 'hide'}>
            </span>
            <span className={validPwd || !password ? 'hide' : 'invalid'}>
            </span>
          </label>
          <input
            type="password"
            className="border-b border-black outline-none"
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby='pwdnote'
            onFocus={()=> setPwdFocus(true)}
            onBlur={()=> setPwdFocus(false)}
          />
          <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
            minimal mengandung 8 karakter<br/>
            minimal mengandung 1 huruf kapital dan 1 angka
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="">Tulis Ulang Password</label>
          <input
            type="password"
            className="border-b border-black outline-none"
            onChange={(e) => setMatchPassword(e.currentTarget.value)}
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
