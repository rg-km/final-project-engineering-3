import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { convertISODate } from '../../helper/utils'

function ChallengeCard({ challenge }) {
  const navigate = useNavigate()
  return (
    <div
      className="border-2 bg-gray-100 rounded-md p-3 grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_6fr_1fr] gap-3"
      onClick={() => navigate(`${challenge.id}`)}
    >
      <div className="flex items-center justify-center">
        <AiOutlineUser fontSize={56} />
      </div>
      <div className="space-y-1">
        <div className="text-lg md:text-2xl font-semibold">{challenge.name}</div>
        <div className="text-xs md:text-sm">{challenge.research_category}</div>
        <div className="text-xs md:text-sm">{challenge.industry_name}</div>
        <div className="text-xs md:text-sm">
          {convertISODate(challenge.period_start)} - {convertISODate(challenge.period_end)}
        </div>
      </div>
      <div className="hidden md:flex items-center justify-center">
        <Link to={`${challenge.id}`}>
          <MdOutlineArrowForwardIos fontSize={48} />
        </Link>
      </div>
    </div>
  )
}

export default ChallengeCard
