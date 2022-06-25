import React from 'react'
import { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../config/axiosClient'
import useDialogStore from '../../store/useDialogStore'
import Spinner from '../shared/Spinner'

function FormChallenge({ previous, timePeriod }) {
  const navigate = useNavigate()

  const [filename, setFilename] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { openDialog } = useDialogStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append('period_start', new Date(timePeriod.startDate).toISOString())
    formData.append('period_end', new Date(timePeriod.endDate).toISOString())

    try {
      setIsLoading(true)
      const { data } = await axiosClient.post('industry/challenge/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(data)
      setIsLoading(false)
      openDialog(
        {
          title: 'Berhasil',
          message: 'Challenge berhasil dibuat',
        },
        () => {
          navigate('/posted-challenges')
        },
      )
    } catch (err) {
      setIsLoading(false)
      console.error(err)
    }
  }

  return (
    <div className="mt-10">
      <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Nama Research</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="name"
            required
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Bidang Research</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 outline-none"
            name="research_category"
          >
            <option value="1">Descriptive</option>
            <option value="2">Exploratory</option>
            <option value="3">Corelational</option>
            <option value="3">Explanatory</option>
          </select>
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Kuota Pendaftar</label>
          <input
            type="number"
            min={0}
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="quota"
            required
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Dana Funding</label>
          <div>
            <span className="p-3 border border-black">Rp.</span>
            <input
              type="number"
              min={0}
              max={Infinity}
              className="border border-black p-2 outline-none focus:border-blue-700"
              name="max_funding"
              defaultValue={0}
              required
            />
          </div>
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Rincian Kegiatan</label>
          <textarea
            className="resize-none border border-black outline-none p-2 focus:border-blue-700"
            rows={5}
            required
            name="details"
          ></textarea>
        </div>
        <div>
          <div className="">
            <label htmlFor="" className="">
              File Panduan:
            </label>
            <div className="flex mt-2">
              <input
                type="text"
                className=" flex-grow border border-black outline-none px-3 focus:border-blue-700"
                readOnly
                placeholder="Upload file..."
                value={filename}
              />
              <div className="relative p-1 px-3 bg-blue-700 text-white cursor-pointer">
                <span>Submit</span>
                <input
                  type="file"
                  className="opacity-0 absolute inset-0 focus:border-blue-700"
                  name="guide_file"
                  onChange={(e) => setFilename(e.target.files[0].name)}
                  required
                  accept=".pdf"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-10">
          <button
            className="w-full text-white py-3 bg-blue-700 hover:bg-blue-800 relative"
            type="submit"
            disabled={isLoading}
          >
            <span className={isLoading ? 'opacity-0' : ''}>Post Challenge</span>
            {isLoading && (
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
                <Spinner />
              </div>
            )}
          </button>
        </div>
      </form>
      <button
        className="mt-10 py-2 text-blue-700 font-semibold flex space-x-3 items-center"
        onClick={previous}
      >
        <BsChevronLeft fontSize={24} />
        <span className="text-xl">Previous</span>
      </button>
    </div>
  )
}

export default FormChallenge
