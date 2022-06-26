import React from 'react'

import { PhoneIcon, ArrowSmRightIcon } from '@heroicons/react/outline'
import { SupportIcon } from '@heroicons/react/solid'

import supportImg from '../../assets/support.jpg'

const Support = () => {
  return (
    <div name="support" className="w-full mt-24">
      <div className="w-full h-[700px] bg-gray-900/90 absolute">
        <img className="w-full h-full object-cover mix-blend-overlay" src={supportImg} alt="/" />
      </div>

      <div className="max-w-[1240px] mx-auto text-white relative">
        <div className="px-4 py-12">
          <h2 className="text-xl lg:text-3xl xl:text-5xl pt-8 text-slate-300 uppercase text-center">
            Peneliti
          </h2>
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold py-6 text-center">
            Pilihlah Tim untuk Penelitian !
          </h3>
          <p className="py-4 md:text-lg xl:text-3xl text-slate-300">
            Bentuk Tim-mu sendiri untuk mengerjakan penelitian yang disediakan oleh pihak Mitra.
            kalian bisa melakukan apply challange yang sudah disediakan oleh pihak mitra dan
            dapatkan dana funding yang 100% untuk tim kalian !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 relative gap-5 md:gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black">
          <div className="bg-white rounded-xl h-[380px] shadow-2xl flex flex-col justify-between  ">
            <div className="p-8 mb-20">
              <PhoneIcon className="w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-xl md:text-2xl mt-6">Contact</h3>
              <p className="text-gray-600 md:text-xl">
                Hubungi kami jika mengalami beberapa kendala
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4 mb-10">
              <p className="flex items-center text-indigo-600">
                Contact Us <ArrowSmRightIcon className="w-5 ml-2" />
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl h-[380px] shadow-2xl flex flex-col justify-between ">
            <div className="p-8 ">
              <SupportIcon className="w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem]" />
              <h3 className="font-bold text-xl md:text-2xl mt-6">Technical Support</h3>
              <p className="text-gray-600 md:text-xl">
                Kalian juga dapat menghubungi Tim dari Technical Support Kami
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4 mb-10">
              <p className="flex items-center text-indigo-600">
                Contact Us <ArrowSmRightIcon className="w-5 ml-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
