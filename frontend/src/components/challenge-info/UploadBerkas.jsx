import React from 'react'
import { MdArrowBackIos } from 'react-icons/md'
import { useState } from 'react'

const UploadBerkas = ({ changeStep }) => {
  const [filename, setFilename] = useState('')

  return (
    <div className="container">
      <button to="#" className="flex items-center w-fit mb-7" onClick={() => changeStep(2)}>
        <MdArrowBackIos fontSize={24} />
        <span className="text-xl">Kembali</span>
      </button>

      <div className="p-5 bg-gray-100">
        <h2 className="text-2xl font-semibold pb-5">Upload Berkas</h2>
        <div className="pb-7">
          <label htmlFor="" className="">
            Proposal :
          </label>
          <div className="flex mt-2">
            <input
              type="text"
              className=" flex-grow border border-black outline-none px-3 "
              readOnly
              placeholder="proposal.pdf"
              value={filename}
            />
            <div className="relative p-1 px-3 bg-sky-700 text-white cursor-pointer ">
              <span>Submit</span>
              <input
                type="file"
                className="opacity-0 absolute inset-0 focus:border-black"
                name="logo"
                accept="pdf/*"
                onChange={(e) => setFilename(e.target.files[0].name)}
              />
            </div>
          </div>
        </div>

        <div className="pb-7">
          <label htmlFor="" className="">
            Abstract :
          </label>
          <div className="flex mt-2">
            <input
              type="text"
              className=" flex-grow border border-black outline-none px-3 "
              readOnly
              placeholder="Abstract.pdf"
              value={filename}
            />
            <div className="relative p-1 px-3 bg-sky-700 text-white cursor-pointer ">
              <span>Submit</span>
              <input
                type="file"
                className="opacity-0 absolute inset-0 focus:border-black"
                name="logo"
                accept="pdf/*"
                onChange={(e) => setFilename(e.target.files[0].name)}
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
              className=" flex-grow border border-black outline-none px-3 "
              readOnly
              placeholder="Abstract.pdf"
              value={filename}
            />
            <div className="relative p-1 px-3 bg-sky-700 text-white cursor-pointer ">
              <span>Submit</span>
              <input
                type="file"
                className="opacity-0 absolute inset-0 focus:border-black"
                name="logo"
                accept="pdf/*"
                onChange={(e) => setFilename(e.target.files[0].name)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-full">
          <button
            className="mt-10 mx-auto py-1 font-semibold px-48 rounded-full bg-sky-700 text-white w-full"
            type="submit"
          >
            Ajukan Proposal
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadBerkas
