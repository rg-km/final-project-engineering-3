import React from 'react'
import { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

function FormChallenge({ previous }) {
  const [filename, setFilename] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    console.log(data)
  }

  return (
    <div className="mt-10">
      <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Nama Research</label>
          <input
            type="text"
            placeholder="Nama research"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="name"
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Bidang Research</label>
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 outline-none"
            name="research_category_id"
          >
            <option value="Descriptive">Descriptive</option>
            <option value="Exploratory">Exploratory</option>
            <option value="Corelational">Corelational</option>
            <option value="Explanatory">Explanatory</option>
          </select>
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Periode</label>
          <div className="flex space-x-5 items-center mt-10">
            <input
              type="date"
              className="border border-black p-2 focus:border-blue-700 outline-none"
              name="period_start"
            />
            <div>-</div>
            <input
              type="date"
              className="border border-black p-2 focus:border-blue-700 outline-none"
              name="period_end"
            />
          </div>
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Dana Funding</label>
          <div>
            <span className="p-3 border border-black">Rp.</span>
            <input
              type="number"
              min={0}
              placeholder="Nama Research"
              className="border border-black p-2 outline-none focus:border-blue-700"
              name="max_funding"
            />
          </div>
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Rincian Kegiatan</label>
          <textarea
            className="resize-none border border-black outline-none p-2 focus:border-blue-700"
            rows={5}
            placeholder="Rincian kegiatan"
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-10">
          <button className="w-full text-white py-2 bg-blue-700" type="submit">
            Post Challenge
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
