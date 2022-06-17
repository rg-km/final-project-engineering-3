import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { useState } from 'react'

const ChallangeList = () => {
  const [filename, setFilename] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    console.log(data)
  }

  return (
    <div className="container">
    <div>
      <h1 className="font-bold text-5xl">Lengkapi Data</h1>
      <p className='pt-4 text-slate-500'>Sebagai Peneliti</p>
    </div>
    <div className="mt-10">
      <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Nama Ketua Tim</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="namaKetua"
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Nama Perguruan Tinggi</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="namaPT"
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">No. HP Ketua Tim</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="nohp"
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">NIDN</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="NIDN"
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="email"
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Alamat</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="alamat"
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">No. Rekening</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="norek"
          />
        </div>
        <div className="flex">
          <button
            className="mt-5 mx-auto py-3 font-semibold px-48 rounded-full bg-black text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)

}

export default ChallangeList