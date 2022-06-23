import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import { MdArrowBackIos } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import Accordion from '../components/shared/Accordion'
import Spinner from '../components/shared/Spinner'
import useFetchData from '../hooks/useFetchData'
import axiosClient from '../config/axiosClient'
import { APPROVAL_STATUS } from '../helper/constants'
import { useEffect } from 'react'

const getUrl = (pathname) => {
  const DOWNLOAD_PATHNAME = 'http://localhost:8080/proposal/files?file_name='
  return `${DOWNLOAD_PATHNAME}${pathname.replace('\\', '/')}`
}

function RegistrantInformation() {
  const navigate = useNavigate()
  const { registrantId } = useParams()
  const { response } = useFetchData(
    null,
    `industry/challenge/review/details/?review_id=${registrantId}`,
  )
  const [status, setStatus] = useState(APPROVAL_STATUS.Pending)

  const confirmationHandler = async (status) => {
    try {
      await axiosClient.put(
        `/industry/challenge/review/details/approval?review_id=${registrantId}`,
        {
          funding_status_id: status,
        },
      )
      setStatus(status)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (response) {
      setStatus(response.funding_status.id)
    }
  }, [response])

  if (!response) return <Spinner className="mt-10 w-10 h-10" />
  return (
    <div className="container">
      <button to="#" className="flex items-center w-fit" onClick={() => navigate(-1)}>
        <MdArrowBackIos fontSize={24} />
        <span className="text-xl">Kembali</span>
      </button>

      <div className="mt-10 grid lg:grid-cols-[1fr_2fr] gap-3">
        <div className="space-y-6">
          <div className="bg-gray-100 p-5 rounded-md flex flex-col justify-center items-center lg:items-start">
            <div>
              <AiOutlineUser fontSize={64} />
            </div>
            <div className="mt-2 space-y-2 text-center lg:text-left">
              <div className="text-xl font-semibold">{response.researcher_profile.team_name}</div>
              <div className="text-sm">{response.researcher_profile.college_name}</div>
              <div className="text-sm">{response.researcher_profile.phone_number}</div>
            </div>
            <div className="mt-5 w-full">
              {status === APPROVAL_STATUS.Pending && (
                <div className="flex space-x-5">
                  <button
                    className="text-white rounded-md px-5 py-2 bg-red-600 hover:bg-red-700"
                    onClick={() => confirmationHandler(APPROVAL_STATUS.Rejected)}
                  >
                    Tolak
                  </button>
                  <button
                    className="text-white rounded-md px-5 py-2 bg-green-600 hover:bg-green-700"
                    onClick={() => confirmationHandler(APPROVAL_STATUS.Approved)}
                  >
                    Terima
                  </button>
                </div>
              )}
              {status === APPROVAL_STATUS.Approved && (
                <div className="text-center w-full bg-green-600 py-2 text-white">
                  <p>Diterima</p>
                </div>
              )}
              {status === APPROVAL_STATUS.Rejected && (
                <div className="text-center w-full bg-red-600 py-2 text-white">
                  <p>Ditolak</p>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>Proposal :</div>
              <a
                href={getUrl(response.proposal.proposal_doc)}
                className="p-2 flex space-x-3 items-center justify-center text-white bg-blue-700 w-full rounded-md hover:bg-blue-800"
                download
              >
                <BsDownload />
                <span>Download</span>
              </a>
            </div>
            <div>
              <div>Dokumen :</div>
              <a
                href={getUrl(response.proposal.other_doc)}
                className="p-2 flex space-x-3 items-center justify-center text-white bg-blue-700 w-full rounded-md hover:bg-blue-800"
                download
              >
                <BsDownload /> <span>Download</span>
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Accordion title={'Data Peneliti'}>
              <div className="mt-5 space-y-3">
                <div className="grid grid-cols-2">
                  <div>Nama Ketua Tim</div>
                  <div>: {response.researcher_profile.leader_name}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Nama Perguruan Tinggi</div>
                  <div>: {response.researcher_profile.college_name}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>No. HP Ketua Tim</div>
                  <div>: {response.researcher_profile.phone_number}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>NIDN</div>
                  <div>: {response.researcher_profile.nidn}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Alamat</div>
                  <div>: {response.researcher_profile.address}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>No Rekening (Optsional)</div>
                  <div>: {response.researcher_profile.bank_account_number}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Bank</div>
                  <div>: {response.researcher_profile.bank_name}</div>
                </div>
              </div>
            </Accordion>
          </div>
          <div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <Accordion title={'Abstract'} isOpen={true}>
                <p>{response.proposal.abstract}</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrantInformation
