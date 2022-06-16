import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function ChallengeCard() {
  return (
    <div className="border-2 bg-gray-100 rounded-md p-3 grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_6fr_1fr] gap-3">
      <div className="flex items-center justify-center">
        <AiOutlineUser fontSize={56} />
      </div>
      <div>
        <div className="text-lg md:text-2xl font-semibold">Nama research</div>
        <div className="text-xs md:text-sm">Bidang research</div>
        <div className="text-xs md:text-sm">Nama mitra</div>
        <div className="text-xs md:text-sm">Periode</div>
      </div>
      <div className="hidden md:flex items-center justify-center">
        <Link to="#">
          <MdOutlineArrowForwardIos fontSize={48} />
        </Link>
      </div>
    </div>
  )
}

export default ChallengeCard
