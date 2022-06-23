import React from 'react'
import { Link } from 'react-router-dom'

function ResearcherNavigation() {
  return (
    <>
      <Link to="/challenges" className="text-white font-semibold text-lg">
        Challenges
      </Link>
      <Link to="/proposal-status" className="text-white font-semibold text-lg">
        Proposals
      </Link>
    </>
  )
}

export default ResearcherNavigation
