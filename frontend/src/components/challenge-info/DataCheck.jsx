import React from 'react'
import { MdArrowBackIos } from 'react-icons/md'
import { MdArrowForwardIos } from 'react-icons/md'
import Spinner from '../../components/shared/Spinner'
import useFetchData from '../../hooks/useFetchData'

const DataCheck = ({ changeStep }) => {
  const { response, isFetching } = useFetchData(null, '/researcher/profile')

  if (isFetching || !response) return <Spinner className="mt-10 h-10 w-10" />
  return (
    <div className="container">
      <div className="flex flex-wrap w-auto mb-7">
        <div>
          <button to="#" className="flex items-center w-fit" onClick={() => changeStep(1)}>
            <MdArrowBackIos fontSize={24} />
            <span className="text-xl">Kembali</span>
          </button>
        </div>
        <div className="ml-auto">
          <button to="#" className="flex items-center w-fit" onClick={() => changeStep(3)}>
            <span className="text-xl mr-1">Berikutnya</span>
            <MdArrowForwardIos fontSize={24} />
          </button>
        </div>
      </div>

      <div className="p-5 bg-gray-100">
        <h2 className="text-2xl font-semibold">Data Peneliti</h2>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-3 mt-8">
          <div className="py-2">Nama Ketua Tim</div>
          <div className="py-2">: {response.data.leader_name}</div>
          <div className="py-2">Nama Perguruan Tinggi</div>
          <div className="py-2">: {response.data.college_name}</div>
          <div className="py-2">No. HP Ketua Tim</div>
          <div className="py-2">: {response.data.phone_number}</div>
          <div className="py-2">NIDN</div>
          <div className="py-2">: {response.data.nidn}</div>
          <div className="py-2">Alamat</div>
          <div className="py-2">: {response.data.address}</div>
          <div className="py-2">No. Rekening (opsional)</div>
          <div className="py-2">: {response.data.bank_account_number}</div>
          <div className="py-2">Bank</div>
          <div className="py-2">: {response.data.bank_name}</div>
        </div>
      </div>
    </div>
  )
}

export default DataCheck
