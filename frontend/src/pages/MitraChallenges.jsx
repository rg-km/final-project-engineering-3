import { HiOutlineEmojiSad } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import ChallengeCard from '../components/shared/ChallengeCard'
import useFetchData from '../hooks/useFetchData'

function MitraChallenges() {
  const { response } = useFetchData(null, '/industry/challenge/list')

  return (
    <div className="container">
      <Link
        to="/add-challenge"
        className="px-14 py-3 rounded-full bg-blue-700 text-white font-semibold"
      >
        Post Challenge
      </Link>
      <div className="flex flex-col space-y-3 mt-10">
        {response &&
          response.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}

        {response === null && (
          <div className="mx-auto mt-10 flex flex-col items-center">
            <HiOutlineEmojiSad fontSize={64} />
            <p className="mt-2">Anda belum membuat challenge</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MitraChallenges
