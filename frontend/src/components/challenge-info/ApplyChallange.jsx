import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdArrowBackIos } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import Accordion from '../shared/Accordion'
import Spinner from '../shared/Spinner'
import useFetchData from '../../hooks/useFetchData'
import ErrorMessage from '../shared/ErrorMessage'
import { convertISODate, rupiahFormat } from '../../helper/utils'

const ApplyChallange = ({ changeStep }) => {
  const navigate = useNavigate()
  const { challengeId } = useParams()
  const { response, isFetching } = useFetchData(
    null,
    `/research/details?challenge_id=${challengeId}`,
  )

  if (isFetching) return <Spinner className="mt-10 h-10 w-10" />
  if (!response) return <ErrorMessage message="Challenge tidak ditemukan!" />
  return (
    <div className="container">
      <div className="flex flex-wrap w-auto">
        <div>
          <button to="#" className="flex items-center w-fit" onClick={() => navigate(-1)}>
            <MdArrowBackIos fontSize={24} />
            <span className="text-xl">Kembali</span>
          </button>
        </div>
        <div className="ml-auto">
          <button
            to="#"
            className="px-10 py-1 rounded-full bg-blue-700 text-white font-semibold"
            onClick={() => changeStep(2)}
          >
            APPLY
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-3 mt-8">
        <div className="space-y-6">
          <div className="bg-gray-100 p-5 rounded-md flex flex-col justify-center items-center lg:items-start">
            <div>
              <AiOutlineUser fontSize={64} />
            </div>
            <div className="mt-2 space-y-2 text-center lg:text-left">
              <div className="text-xl font-semibold">{response.data.name}</div>
              <div className="text-sm">{response.data.research_category}</div>
              <div className="text-sm">{response.data.industry_name}</div>
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold mb-3">Download</div>
            <a
              href={`http://localhost:8080/research/guide-file?challenge_id=${challengeId}`}
              target="_blank"
              download
              rel="noopener noreferrer"
              className="p-2 flex space-x-3 items-center bg-gray-100 w-full rounded-md"
            >
              <BsDownload />
              <span className="font-semibold">File Panduan</span>
            </a>
          </div>
        </div>
        <div className="px-5 bg-gray-100">
          <div className="flex flex-col mt-5 divide-y-2 space-y-3">
            <div className="py-2">
              <div className="text-xl font-semibold">Periode Pendaftaran</div>
              <div className="text-gray-500">
                {convertISODate(response.data.period_start)} -
                {convertISODate(response.data.period_end)}
              </div>
            </div>
            <div className="py-2">
              <div className="text-xl font-semibold">Kuota Pendaftaran</div>
              <div className="text-gray-500">{response.data.quota}</div>
            </div>
            <div className="py-2">
              <div className="text-xl font-semibold">Dana Funding</div>
              <div className="text-gray-500">{rupiahFormat(response.data.max_funding)}</div>
            </div>
            <div className="py-4">
              <Accordion title={'Rincian Kegiatan'} isOpen={true}>
                <p>{response.data.details}</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplyChallange
