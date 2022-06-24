import React from 'react'
import { useNavigate } from 'react-router-dom'
import bgImg from '../../assets/cyber-bg.png'

const Hero = () => {
    const navigate = useNavigate()
    const masuk = ()=>{
        navigate('/login')
    }
  return (

    <div name='home' className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <p className='text-2xl'>Ajukan Proposalmu dan beri proposal di</p>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Funding Research App</h1>
                <p className='text-2xl'>dan dapatkan dana funding segera.</p>
                <button className='py-3 px-6 sm:w-[60%] my-4 bg-black text-white' onClick={masuk}>Masuk</button>
            </div>
            <div>
                <img className='w-full' src={bgImg} alt="/" />
            </div>
        </div>
    </div>
  )
}

export default Hero