import React from 'react'
import AjuanProposal from '../components/shared/AjuanProposal'
import Spinner from '../components/shared/Spinner'
import useFetchData from '../hooks/useFetchData'

const PengajuanProposal = () => {
  const { response, isFetching } = useFetchData(null, '/researcher/proposal')

  if (isFetching || !response) return <Spinner className="mt-10 w-10 h-10" />
  return (
    <div className="container">
      <h1 className="text-2xl font-semibold">Daftar Pengajuan Proposal</h1>
      {response.data &&
        response.data.map((item) => {
          return (
            <AjuanProposal
              key={item.id}
              namaResearch={item.challenge_name}
              bidang={item.research_category}
              namaMitra={item.industry_name}
              periodeStart={item.period_start}
              periodeEnd={item.period_end}
              status={item.funding_status}
            />
          )
        })}
      {!response.data && <div className="mt-10 text-center">Anda belum mengajukan proposal</div>}
    </div>
  )
}

export default PengajuanProposal
