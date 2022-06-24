import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { convertISODate } from '../../helper/utils'
import { APPROVAL_STATUS_NAME } from '../../helper/constants'

const AjuanProposal = ({ namaResearch, bidang, namaMitra, periodeStart, periodeEnd, status }) => {
  return (
    <div className="space-y-3 mt-10">
      <div className="border-2 bg-gray-100 rounded-md p-3 grid grid-cols-[1fr_2fr] md:grid-cols-[1.5fr_5fr_1.5fr] gap-3">
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
          {status === APPROVAL_STATUS_NAME.Approved && (
            <div className="text-xs md:text-sm mb-2 text-lime-500">Diterima</div>
          )}
          {status === APPROVAL_STATUS_NAME.Pending && (
            <div className="text-xs md:text-sm mb-2 text-indigo-300">Pending</div>
          )}
          {status === APPROVAL_STATUS_NAME.Rejected && (
            <div className="text-xs md:text-sm mb-2 text-rose-600">Ditolak</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AjuanProposal
