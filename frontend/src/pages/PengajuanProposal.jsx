import React from 'react'
import { useState } from 'react'
import AjuanProposal from '../components/shared/AjuanProposal'

const PengajuanProposal = () => {
    const [ajuan, setAjuan] = useState([
        {
            namaResearch: 'nama research 1',
            bidang: 'bidang 1',
            namaMitra: 'nama mitra 1',
            periode: '2022 - 2025',
            status: 'Pending'
        },
        {
            namaResearch: 'nama research 2',
            bidang: 'bidang 2',
            namaMitra: 'nama mitra 2',
            periode: '2022 - 2026',
            status: 'Diterima'
        },
        {
            namaResearch: 'nama research 3',
            bidang: 'bidang 3',
            namaMitra: 'nama mitra 3',
            periode: '2022 - 2026',
            status: 'Ditolak'
        }        
    ])
  return (
    <div className='container'>
    <h1 className="text-2xl font-semibold">Daftar Pengajuan Proposal</h1>
    {ajuan.map(item =>{
        return <AjuanProposal
        key = {item.id}
        namaResearch = {item.namaResearch}
        bidang = {item.bidang}
        namaMitra = {item.namaMitra}
        periode = {item.periode}
        status = {item.status}
        />
    })}
</div>
  )
}

export default PengajuanProposal