import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/shared/Spinner'
import useFetchData from '../hooks/useFetchData'

function RegistrantList() {
  const { challengeId } = useParams()

  const { response, isLoading } = useFetchData(
    null,
    `/industry/challenge/review/challengers?challenge_id=${challengeId}`,
  )

  if (isLoading) return <Spinner className="mt-10 h-10 w-10" />
  return (
    <div className="container">
      <h1 className="text-2xl font-semibold">Daftar Peneliti</h1>
      <div className="space-y-3 mt-10">
        {response?.challengers ? (
          response.challengers.map((challenger) => (
            <div
              className="border-2 bg-gray-100 rounded-md p-3 grid grid-cols-[1fr_2fr] md:grid-cols-[1fr_6fr_1fr] gap-3"
              key={challenger.review_id}
            >
              <div className="flex items-center justify-center">
                <AiOutlineUser fontSize={56} />
              </div>
              <div>
                <div className="text-lg md:text-2xl font-semibold">{challenger.team_name}</div>
                <div className="text-xs md:text-sm mb-5">{challenger.college_name}</div>
                <Link
                  className="text-xs md:text-sm text-blue-500 hover:text-blue-600"
                  to={`${challenger.review_id}`}
                >
                  Lihat detail
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Belum ada peneliti yang mendaftar</div>
        )}
      </div>
    </div>
  )
}

export default RegistrantList
