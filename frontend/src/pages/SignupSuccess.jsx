import React from 'react'
import { Link } from 'react-router-dom'


const SignupSuccess = () => {
  return (
    <div className='container'>
        <h1 className='font-bold text-xl text-center'>Sign Up Berhasil!</h1>
        <p className='text-center mt-3'>silahkan Login kembali dengan username dan password yang sudah dibuat</p>
        <div className='text-center'>
        <Link to = '/login' className='text-blue-600 center'>
            Masuk
        </Link>
        </div>
    </div>
  )
}

export default SignupSuccess