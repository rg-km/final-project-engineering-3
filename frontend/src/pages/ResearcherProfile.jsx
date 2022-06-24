import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Spinner from '../components/shared/Spinner'
import useFetchData from '../hooks/useFetchData'
import useUserStore from '../store/useUserStore'

const ResearcherProfile = () => {
    const { response, isFetching } = useFetchData(null, '/researcher/profile')
    const user = useUserStore((state) => state.user)
    const logout = useUserStore((state) => state.logout)

    if (isFetching || !response?.data) return <Spinner className="w-10 h-10 mt-10" />
    return (
    <div className="container">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-3">
        <div className="space-y-6">
          <div className="bg-gray-100 p-5 rounded-md flex flex-col justify-center items-center lg:items-start">
            <div>
              <AiOutlineUser fontSize={64} />
            </div>
            <div className="mt-2 space-y-2 text-center lg:text-left">
              <div className="text-xl font-semibold">{user?.username}</div>
            </div>
            <div className="flex gap-x-3">
              <Link
                to="/mitra/information"
                className="mt-5 text-white px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-800"
              >
                Edit Profile
              </Link>
              <button
                className="mt-5 text-white px-3 py-2 rounded-md bg-red-700 hover:bg-red-800"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="p-5 bg-gray-100">
          <h2 className="text-3xl font-semibold">Data Peneliti</h2>
          <div className="flex flex-col mt-5 divide-y-2 space-y-3">
            <div className="py-2">
              <div className="text-xl font-semibold">Nama Ketua Tim</div>
              <div className="text-gray-500">{response.data.team_name}</div>
            </div>
            <div className="py-2">
              <div className="text-xl font-semibold">Nama Ketua Team</div>
              <div className="text-gray-500">{response.data.leader_name}</div>
            </div>
            <div className="py-2">
              <div className="text-xl font-semibold">No. HP Ketua</div>
              <div className="text-gray-500">{response.data.phone_number}</div>
            </div>
            <div className="py-2">
              <div className="text-xl font-semibold">NIDN</div>
              <div className="text-gray-500">{response.data.nidn}</div>
            </div>
            <div className="py-2">
              <div className="text-xl font-semibold">Alamat</div>
              <div className="text-gray-500">{response.data.address}</div>
            </div>
            <div className="py-2">
              <div className="text-xl font-semibold">No Rekening</div>
              <div className="text-gray-500">{response.data.address}</div>
            </div>
            <div className="py-2">
              <div className="text-xl font-semibold">Bank</div>
              <div className="text-gray-500">{response.data.bank_name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ResearcherProfile