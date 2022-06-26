import React from 'react'
import ChallangeListItem from '../components/shared/ChallangeListItem'
import useFetchData from '../hooks/useFetchData'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import Spinner from '../components/shared/Spinner'

const ChallangeList = () => {
  const { response, isFetching } = useFetchData(null, 'researcher/challenge/list')

  if (isFetching) return <Spinner className="mt-10 h-10 w-10" />
  return (
    <div className="container">
      <h1 className="text-2xl font-semibold">Challenge</h1>
      <p className="pt-4 text-slate-500">Yuk cari Challenge yang cocok untuk kalian !</p>
      {response &&
        response.map((item) => {
          return (
            <ChallangeListItem
              key={item.id}
              id={item.id}
              namaResearch={item.name}
              bidang={item.research_category}
              namaMitra={item.industry_name}
              periodeStart={item.period_start}
              periodeEnd={item.period_end}
            />
          )
        })}
      {response === null && (
        <div className="mx-auto mt-10 flex flex-col items-center">
          <HiOutlineEmojiSad fontSize={64} />
          <p className="mt-2">Belum ada Challenge dari Mitra</p>
        </div>
      )}
    </div>
  )
}

export default ChallangeList
