import React from 'react'
import { Link } from 'react-router-dom'

function MitraNavigation() {
  return (
    <>
      <Link to="/add-challenge" className="text-white font-semibold text-lg">
        Post Challenge
      </Link>
      <Link to="/posted-challenges" className="text-white font-semibold text-lg">
        Posted Challenges
      </Link>
    </>
  )
}

export default MitraNavigation
