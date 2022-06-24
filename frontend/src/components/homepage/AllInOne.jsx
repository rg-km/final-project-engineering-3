import React from 'react'
import { CheckIcon } from '@heroicons/react/outline';

const AllInOne = () => {
  return (
    <div name='platforms' className='w-full my-32'>
    <div className='max-w-[1240px] mx-auto px-2'>
      <h2 className='text-5xl font-bold text-center'>Mitra</h2>
      <p className='text-2xl py-8 text-gray-500 text-center'>
        Pihak Perusahaan dapat memberikan kesempatan untuk tim peneliti
        untuk memberikan beberapa challange / penelitian. Kalian pun dapat 
        menseleksi beberapa proposal yang dikirim oleh pihak tim peneliti.
      </p>

      <div className='grid sm:grid-cols-2 lg:grid-cols-2 gap-4 pt-4'>

        <div className='flex'>
          <div>
            <CheckIcon className='w-7 mr-4 text-green-600' />
          </div>
          <div>
            <h3 className='font-bold text-lg'>Peserta</h3>
            <p className='text-lg pt-2 pb-4'>
                Banyak Peserta yang mendaftar dan ingin mengajukan 
                Proposal untuk Perusahaan!
            </p>
          </div>
        </div>
        <div className='flex'>
          <div>
            <CheckIcon className='w-7 mr-4 text-green-600' />
          </div>
          <div>
            <h3 className='font-bold text-lg'>24/7</h3>
            <p className='text-lg pt-2 pb-4'>
                Layanan Website dapat diakses 24 jam dan dapat mengajukan 
                Propsal kapanpun!
            </p>
          </div>
        </div>
        <div className='flex'>
          <div>
            <CheckIcon className='w-7 mr-4 text-green-600' />
          </div>
          <div>
            <h3 className='font-bold text-lg'>Aman</h3>
            <p className='text-lg pt-2 pb-4'>
                Data - data dari perusahaan yang sudah diinput terjamin aman
            </p>
          </div>
        </div>
        <div className='flex'>
          <div>
            <CheckIcon className='w-7 mr-4 text-green-600' />
          </div>
          <div>
            <h3 className='font-bold text-lg'>Cepat</h3>
            <p className='text-lg pt-2 pb-4'>
                Proses pengajuan proposal dapat dilakukan dengan cepat dan pengecekan 
                Proposal dari peneliti pun sangat mudah
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AllInOne