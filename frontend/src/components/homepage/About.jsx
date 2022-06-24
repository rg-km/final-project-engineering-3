import React from 'react'

const About = () => {
  return (
    <div name='about' className='w-full my-32'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='text-center'>
                <h2 className='text-5xl font-bold'>Apa itu Funding Research ?</h2>
                <p className='text-3xl pt-6 pb-20 text-gray-500'>
                    Merupakan sebuah Web Aplikasi untuk perusahaan ataupun peneliti. Sebuah perusahaan
                    dapat memberikan challange untuk para peneliti dan peneliti dapat mengajukan proposal
                    dan akan diseleksi oleh mitra. proposal yang telah diterima dan disetujui oleh pihak Mitra
                    akan mendapatkan sebuah dana untuk penelitian tersebut
                </p>
            </div>

            <div className='grid md:grid-cols-3 gap-1 px-2 text-center'>
                <div className='border py-8 rounded-xl shadow-xl' >
                    <p className='text-6xl font-bold text-indigo-600'>100%</p>
                    <p className='text-gray-400 mt-2'>Pendanan</p>
                </div>
                <div  className='border py-8 rounded-xl shadow-xl' >
                    <p className='text-6xl font-bold text-indigo-600'>24/7</p>
                    <p className='text-gray-400 mt-2'>untuk apply challange</p>
                </div>
                <div className='border py-8 rounded-xl shadow-xl' >
                    <p className='text-6xl font-bold text-indigo-600'>100++</p>
                    <p className='text-gray-400 mt-2'>Pendaftar Mitra</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About