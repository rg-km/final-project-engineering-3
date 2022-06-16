import { useState } from 'react'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import ChallengeCard from '../components/shared/ChallengeCard'

function MitraChallenges() {
  const [challenges, setChallenges] = useState([])

  return (
    <div className="container">
      <Link
        to="/add-challenge"
        className="px-14 py-3 rounded-full bg-blue-700 text-white font-semibold"
      >
        Post Challenge
      </Link>
      <div className="flex flex-col space-y-3 mt-10">
        {challenges.map((challenge) => (
          <ChallengeCard />
        ))}

        {challenges.length === 0 && (
          <div className="mx-auto mt-10 flex flex-col items-center">
            <HiOutlineEmojiSad fontSize={64} />
            <p className="mt-2">Belum ada Challenge dari Mitra</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MitraChallenges
