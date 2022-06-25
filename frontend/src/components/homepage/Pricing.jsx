import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/solid'

const Pricing = () => {
  const navigate = useNavigate()

  const daftar = () => {
    navigate('/signup')
  }
  return (
    <div name="pricing" className="w-full text-white my-24">
      <div className="w-full h-[800px] bg-slate-900 absolute mix-blend-overlay"></div>

      <div className="max-w-[1240px] mx-auto md:py-12">
        <div className="text-center py-8 text-slate-300">
          <h2 className="text-3xl uppercase">Pricing</h2>
          <h3 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white py-8">
            Tempat Terbaik untuk Pengajuan Proposal.
          </h3>
          <p className="text-3xl">dapatkan keuntungan untuk kedua belah pihak. Segera !</p>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
            <div>
              <p className="text-2xl 2xl:text-4xl font-bold py-4 flex">
                MITRA<span className="text-xl text-slate-500 flex flex-col justify-end"></span>
              </p>
            </div>
            <p className="text-lg 2xl:text-2xl py-8 text-slate-500">
              Beberapa Keuntungan untuk pihak mitra
            </p>
            <div className="text-xl md:text-2xl">
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Banyaknya peneliti.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Proses pengajuan mudah.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Data aman.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Menentukan pendanaan sendiri.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Kirim beberapa Proposal.
              </p>
              <button className="w-full py-4 my-4" onClick={daftar}>
                Daftar Sekarang
              </button>
            </div>
          </div>
          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
            <div>
              <p className="text-2xl 2xl:text-4xl font-bold py-4 flex">
                PENELITI<span className="text-xl text-slate-500 flex flex-col justify-end"></span>
              </p>
            </div>
            <p className="text-lg 2xl:text-2xl py-3 md:py-8 text-slate-500">
              Beberapa keuntungan untuk pihak peneliti
            </p>
            <div className="text-lg md:text-2xl">
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Banyaknya mitra.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Anggota Tim bebas.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Data aman.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Mendapatkan upah dari penelitian.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Ajukan beberapa Proposal.
              </p>
              <button className="w-full py-4 my-4" onClick={daftar}>
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
