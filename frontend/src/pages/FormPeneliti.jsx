import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BANK_NAME } from '../helper/constants'
import useUserStore from '../store/useUserStore'
import useFetchData from '../hooks/useFetchData'
import axiosClient from '../config/axiosClient'
import Spinner from '../components/shared/Spinner'
const FormPeneliti = () => {
  const navigate = useNavigate()

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const { response } = useFetchData(null, '/researcher/profile')

  const [isLoading, setIsLoading] = useState(false)
  const [defaultBank, setDefaultBank] = useState(0)

  useEffect(() => {
    if (response?.data) {
      const bank = BANK_NAME.find(
        (item) => item.name === response.data.bank_name,
      )

      if (bank) {
        setDefaultBank(bank.id)
      }
    }
  }, [response])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    try {
      setIsLoading(true)
      await axiosClient.put('/researcher/profile/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setIsLoading(false)
      navigate('/challenges')
      setUser({ ...user, isDataComplete: true })
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
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
          <label htmlFor="">Nama Tim</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="team_name"
            required
            defaultValue={response?.data?.team_name}
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Nama Ketua Tim</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="leader_name"
            defaultValue={response?.data?.leader_name}
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Nama Perguruan Tinggi</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="collage_name"
            defaultValue={response?.data?.collage_name}
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">No. HP Ketua Tim</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="phone"
            defaultValue={response?.data?.phone}
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">NIDN</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="nidn"
            defaultValue={response?.data?.nidn}
          />
        </div>
        {/* <div className="space-y-3 flex flex-col">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="email"
          />
        </div> */}
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">Alamat</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="address"
            defaultValue={response?.data?.address}
          />
        </div>
        <div className="space-y-3 flex flex-col">
          <label htmlFor="">No. Rekening</label>
          <input
            type="text"
            className="py-2 border-b border-black outline-none  focus:border-blue-700"
            name="bank_account_num"
            defaultValue={response?.data?.bank_account_num}
          />
        </div>

        <div className="space-y-3 flex flex-col">
            <label htmlFor="">Bank</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 outline-none"
              name="bank_name_id"
              value={defaultBank}
              onChange={(e) => setDefaultBank(e.currentTarget.value)}
            >
              {BANK_NAME.map((bank) => (
                <option value={bank.id} key={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

        <div className="flex">
          <button
            className="mt-5 mx-auto py-3 font-semibold px-48 rounded-full bg-black text-white"
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

export default FormPeneliti