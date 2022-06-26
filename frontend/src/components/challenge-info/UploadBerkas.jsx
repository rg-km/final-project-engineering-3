import React from 'react'
import { MdArrowBackIos } from 'react-icons/md'
import { useState } from 'react'
import axiosClient from '../../config/axiosClient'
import { useNavigate, useParams } from 'react-router-dom'
import useDialogStore from '../../store/useDialogStore'

const UploadBerkas = ({ changeStep }) => {
  const [proposalFileName, setProposalFileName] = useState('')
  const [optionalFileName, setOptionalFileName] = useState('')
  const { challengeId } = useParams()
  const navigate = useNavigate()
  const { openDialog } = useDialogStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    try {
      const { data } = await axiosClient.post(
        `researcher/challenge/apply?challenge_id=${challengeId}`,
      )
      await axiosClient.post(
        `researcher/challenge/upload?proposal_id=${data.proposal_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      openDialog(
        {
          title: 'Berhasil',
          message: 'Terima kasih telah mengirim proposal',
        },
        () => {
          navigate('/challenges')
        },
      )
    } catch (err) {
      const response = err.response?.data
      if (response) {
        openDialog(
          {
            title: 'Gagal',
            message: 'Anda sudah mengajukan proposal pada challenge ini',
          },
          () => {
            navigate('/challenges')
          },
        )
      }
      console.error(err)
    }
  }
  return (
    <div className="container">
      <button to="#" className="flex items-center w-fit mb-7" onClick={() => changeStep(2)}>
        <MdArrowBackIos fontSize={24} />
        <span className="text-xl">Kembali</span>
      </button>

      <div className="p-5 bg-gray-100">
        <h2 className="text-2xl font-semibold pb-5">Upload Berkas</h2>
        <form onSubmit={handleSubmit}>
          <div className="pb-7">
            <label htmlFor="" className="">
              Abstract :
            </label>
            <div className="flex mt-2">
              <textarea
                className="w-full resize-none border border-black outline-none p-2 focus:border-blue-700"
                rows={5}
                name="abstract"
                required
              ></textarea>
            </div>
          </div>

          <div className="w-full pb-7">
            <label htmlFor="" className="">
              Proposal :
            </label>
            <div className="flex mt-2">
              <input
                type="text"
                className="w-4/5 lg:grow lg:w-auto border border-black outline-none px-3 "
                readOnly
                placeholder="proposal.pdf"
                value={proposalFileName}
              />
              <div className="relative p-1 px-3 bg-sky-700 text-white cursor-pointer ">
                <button>Submit</button>
                <input
                  type="file"
                  className="opacity-0 absolute inset-0 focus:border-black"
                  name="proposal_file"
                  accept=".pdf"
                  required
                  onChange={(e) => setProposalFileName(e.target.files[0].name)}
                />
              </div>
            </div>
          </div>

          <div className="">
            <label htmlFor="" className="">
              Dokumen Pendukung :
            </label>
            <div className="flex mt-2">
              <input
                type="text"
                className="w-4/5 lg:grow lg:w-auto border border-black outline-none px-3 "
                readOnly
                placeholder="Abstract.pdf"
                value={optionalFileName}
              />
              <div className="relative p-1 px-3 bg-sky-700 text-white cursor-pointer ">
                <span>Submit</span>
                <input
                  type="file"
                  className="opacity-0 absolute inset-0 focus:border-black"
                  name="optional_file"
                  accept=".pdf"
                  required
                  onChange={(e) => setOptionalFileName(e.target.files[0].name)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap w-full">
            <button
              className="mt-10 mx-auto py-1 font-semibold rounded-full bg-sky-700 text-white w-full"
              type="submit"
            >
              Ajukan Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadBerkas
