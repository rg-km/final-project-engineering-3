import React from 'react'
import { useState } from 'react'
import ChooseRole from './components/ChooseRole'
import LoginForm from './components/LoginForm'

function Login() {
  const [role, setRole] = useState('')

  return (
    <div className="flex justify-center">
      {role === '' ? (
        <ChooseRole selectRole={(roleType) => setRole(roleType)} />
      ) : (
        <LoginForm role={role} />
      )}
    </div>
  )
}

export default Login
