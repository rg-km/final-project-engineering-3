import { useState } from 'react'
import Role from '../components/signup/Role'
import SignupForm from '../components/signup/SignupForm'

const Signup = () => {
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

export default Signup
