import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { convertISODate } from '../../helper/utils'

const ChallangeListItem = ({ id, namaResearch, bidang, periodeStart, periodeEnd, namaMitra }) => {
  const navigate = useNavigate()

  return (
    <div className="space-y-3 mt-5">
      <div
        className="border-2 bg-gray-100 rounded-md p-3 grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_6fr_1fr] "
        onClick={() => navigate(`${id}`)}
      >
        <div className="flex items-center justify-center">
          <AiOutlineUser fontSize={56} />
        </div>
        <div>
          <div className="text-lg md:text-2xl font-semibold mb-5">{namaResearch}</div>
          <div className="text-xs md:text-sm mb-2">{bidang}</div>
          <div className="text-xs md:text-sm mb-2">{namaMitra}</div>
          <div className="text-xs md:text-sm mb-2">
            {convertISODate(periodeStart)} - {convertISODate(periodeEnd)}
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <Link to={`${id}`}>
            <MdOutlineArrowForwardIos fontSize={48} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChallangeListItem
