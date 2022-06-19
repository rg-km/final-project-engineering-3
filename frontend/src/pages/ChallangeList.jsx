import React from 'react'
import ChallangeListItem from '../components/shared/ChallangeListItem'
import { useState } from 'react'

const ChallangeList = () => {
const [challangeListItem, setChallangeListItem] = useState([
    {
        namaResearch: 'nama research 1',
        bidang: 'bidang 1',
        namaMitra: 'nama mitra 1',
        periode: '2022 - 2025'
    },
    {
        namaResearch: 'nama research 2',
        bidang: 'bidang 2',
        namaMitra: 'nama mitra 2',
        periode: '2022 - 2026'
    }
])

// const getChallangeListItem = () =>{
//     setChallangeListItem([
//         {
//             namaResearch: 'nama research 1',
//             bidang: 'bidang 1',
//             namaMitra: 'nama mitra 1',
//             periode: 2022 - 2025
//         }
//     ])
// }


return (
<div className='container'>
    <h1 className="text-2xl font-semibold">Challange</h1>
    <p className='pt-4 text-slate-500'>Yuk cari Challange yang cocok untuk kalian !</p>
    {challangeListItem.map(item =>{
        return <ChallangeListItem
        key = {item.id}
        namaResearch = {item.namaResearch}
        bidang = {item.bidang}
        namaMitra = {item.namaMitra}
        periode = {item.periode}
        />
    })}
</div>
)
}

export default ChallangeList