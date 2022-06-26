import React, { useState } from 'react'
import Spinner from '../components/shared/Spinner'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import { MITRA_CATEGORIES } from '../helper/constants'
import useUserStore from '../store/useUserStore'
import { useEffect } from 'react'
import useDialogStore from '../store/useDialogStore'

function MitraInformation() {
  const navigate = useNavigate()

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const { openDialog } = useDialogStore()
  const { response } = useFetchData(null, '/industry/profile')

  const [isLoading, setIsLoading] = useState(false)
  const [filename, setFilename] = useState('')
  const [defaultCategory, setDefaultCategory] = useState(0)

  useEffect(() => {
    if (response?.data) {
      const category = MITRA_CATEGORIES.find(
        (item) => item.name === response.data.industry_category,
      )

      if (category) {
        setDefaultCategory(category.id)
      }
    }
  }, [response])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    try {
      setIsLoading(true)
      await axiosClient.put('/industry/profile/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setIsLoading(false)
      openDialog(
        {
          title: 'Berhasil',
          message: 'Data berhasil disimpan',
        },
        () => {
          navigate('/posted-challenges')
        },
      )
      setUser({ ...user, isDataComplete: true })
    } catch (err) {
      setIsLoading(false)
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
              defaultValue={response?.data?.name}
            />
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Alamat Perusahaan</label>
            <input
              type="text"
              className="py-2 border-b border-black outline-none  focus:border-blue-700"
              name="address"
              required
              defaultValue={response?.data?.address}
            />
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Deskripsi Industri</label>
            <textarea
              className="resize-none border border-black outline-none p-2 focus:border-blue-700"
              rows={5}
              placeholder="Tulis rincian kegiatan disini"
              name="description"
              defaultValue={response?.data?.description}
            ></textarea>
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">Bidang/Kategori Industri</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 outline-none"
              name="industry_category_id"
              value={defaultCategory}
              onChange={(e) => setDefaultCategory(e.currentTarget.value)}
            >
              {MITRA_CATEGORIES.map((category) => (
                <option value={category.id} key={category.id}>
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
              defaultValue={response?.data?.num_of_employees}
            />
          </div>
          <div className="space-y-3 flex flex-col">
            <label htmlFor="">No Telp</label>
            <input
              type="tel"
              className="border border-black p-2 outline-none focus:border-blue-700"
              name="phone_number"
              required
              defaultValue={response?.data?.phone_number}
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
                    required
                    onChange={(e) => setFilename(e.target.files[0].name)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              className="mt-5 mx-auto py-3 font-semibold w-full rounded-full bg-black text-white relative"
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
