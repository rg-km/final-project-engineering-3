import React from 'react'
import { useState } from 'react'
import Role from './components/Role'
import SignupForm from './components/SignupForm'


export const Signup = () => {
  const [role, setRole] = useState('')

  return (
    <div className="flex justify-center">
      {role === '' ? (
        <Role selectRole={(roleType) => setRole(roleType)} />
      ) : (
        <SignupForm role={role} />
      )}
    </div>
  )
}
