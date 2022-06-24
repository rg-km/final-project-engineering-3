
import React from 'react'

import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTwitter,
    FaTwitch,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full mt-24 bg-black text-gray-300 py-y px-2'>
        <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8'>
        <div>
                <h6 className='font-bold uppercase pt-2'>Alamat</h6>
                <ul>
                    <li className='py-1'>Apartemen Mansion City Lantai 7 No. 32, Jalan Rumput Hijau Kav. 18, Matraman, Jakarta Timur, 13120</li>

                </ul>
            </div>
            <div>
                <h6 className='font-bold uppercase pt-2'>No. Whatsapp</h6>
                <ul>
                    <li className='py-1'>(+62) 83782342123</li>
                    <li className='py-1'>(+62) 85956013755</li>
                    <li className='py-1'>(+62) 85732927132</li>
                </ul>
            </div>
            <div>
                <h6 className='font-bold uppercase pt-2'>Call</h6>
                <ul>
                    <li className='py-1'>022 86066413</li>

                </ul>
            </div>
            <div>
                <h6 className='font-bold uppercase pt-2'>Email</h6>
                <ul>
                    <li className='py-1'>fundingresearch@gmail.com</li>

                </ul>
            </div>
            <div className='col-span-2 pt-8 md:pt-2'>
                <p className='font-bold uppercase'>Hubungi Via Hotline</p>
                <p className='py-4'>kirim pesan via hotline dan dapatkan jawaban via email</p>
                <form className='flex flex-col sm:flex-row'>
                    <input className='w-full p-2 mr-4 rounded-md mb-4' type="email" placeholder='Enter email..'/>
                    <button className='p-2 mb-4'>kirim</button>
                </form>
            </div>
        </div>

        <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
        <p className='py-4'>2022 Workflow, LLC. All rights reserved</p>
        <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaTwitch />
            <FaGithub />
        </div>
        </div>
    </div>
  )
}

export default Footer