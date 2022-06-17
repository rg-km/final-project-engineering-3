import React, { useState } from 'react'

function MitraInformation() {
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
        <p>Sebagai Mitra</p>
      </div>
      <div className="mt-10">
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Nama Perusahaan</label>
            <input
              type="text"
              className="py-2 border-b border-black outline-none  focus:border-blue-700"
              name="name"
            />
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Alamat Perusahaan</label>
            <input
              type="text"
              className="py-2 border-b border-black outline-none  focus:border-blue-700"
              name="address"
            />
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Deskripsi Industri</label>
            <textarea
              className="resize-none border border-black outline-none p-2 focus:border-blue-700"
              rows={5}
              placeholder="Tulis rincian kegiatan disini"
              name="description"
            ></textarea>
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Bidang/Kategori Industri</label>
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 outline-none"
              name="industry_category_id"
            >
              <option value="Descriptive">Descriptive</option>
              <option value="Exploratory">Exploratory</option>
              <option value="Corelational">Corelational</option>
              <option value="Explanatory">Explanatory</option>
            </select>
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Jumlah Pegawai</label>
            <input
              type="number"
              min={0}
              className="border border-black p-2 outline-none focus:border-blue-700"
              name="num_of_employee"
            />
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">No Telp</label>
            <input
              type="tel"
              className="border border-black p-2 outline-none focus:border-blue-700"
              name="phone"
            />
          </div>
          <div>
            <div className="">
              <label htmlFor="" className="">
                Logo Perusahaan:
              </label>
              <div className="flex mt-2">
                <input
                  type="text"
                  className=" flex-grow border border-black outline-none px-3 "
                  readOnly
                  placeholder="Upload file..."
                  value={filename}
                />
                <div className="relative p-1 px-3 bg-black text-white cursor-pointer">
                  <span>Add</span>
                  <input
                    type="file"
                    className="opacity-0 absolute inset-0 focus:border-black"
                    name="logo"
                    accept="image/*"
                    onChange={(e) => setFilename(e.target.files[0].name)}
                  />
                </div>
              </div>
            </div>
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

export default MitraInformation
