import React, { useState } from 'react'
import Spinner from '../components/shared/Spinner'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import { MITRA_CATEGORIES } from '../helper/constants'
import useUserStore from '../store/useUserStore'

function MitraInformation() {
  const [filename, setFilename] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { data: defaultData } = useFetchData(null, '/industry/profile')
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      setIsLoading(true)
      await axiosClient.put('/industry/profile/edit', {
        ...data,
        industry_category_id: Number(data.industry_category_id),
        num_of_employees: Number(data.num_of_employees),
        logo: '',
      })
      setIsLoading(false)
      navigate('/posted-challenges')
      setUser({ ...user, isDataComplete: true })
    } catch (err) {
      console.error(err)
    }
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
              required
              defaultValue={defaultData?.name}
            />
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Alamat Perusahaan</label>
            <input
              type="text"
              className="py-2 border-b border-black outline-none  focus:border-blue-700"
              name="address"
              required
              defaultValue={defaultData?.address}
            />
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Deskripsi Industri</label>
            <textarea
              className="resize-none border border-black outline-none p-2 focus:border-blue-700"
              rows={5}
              placeholder="Tulis rincian kegiatan disini"
              name="description"
              defaultValue={defaultData?.description}
            ></textarea>
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Bidang/Kategori Industri</label>
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 outline-none"
              name="industry_category_id"
            >
              {MITRA_CATEGORIES.map((category) => (
                <option
                  value={category.id}
                  key={category.id}
                  selected={category.name === defaultData?.industry_category}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Jumlah Pegawai</label>
            <input
              type="number"
              min={0}
              className="border border-black p-2 outline-none focus:border-blue-700"
              name="num_of_employees"
              required
              defaultValue={defaultData?.num_of_employees}
            />
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">No Telp</label>
            <input
              type="tel"
              className="border border-black p-2 outline-none focus:border-blue-700"
              name="phone_number"
              required
              defaultValue={defaultData?.phone_number}
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
              className="mt-5 mx-auto py-3 font-semibold px-48 rounded-full bg-black text-white relative"
              type="submit"
              disabled={isLoading}
            >
              <span className={isLoading ? 'opacity-0' : ''}>Submit</span>
              {isLoading && (
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
                  <Spinner />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MitraInformation
