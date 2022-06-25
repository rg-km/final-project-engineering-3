import { useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'

function TimePeriod({ setTimePeriod, next, timePeriod }) {
  const [startDate, setStartDate] = useState(timePeriod?.startDate)
  const [endDate, setEndDate] = useState(timePeriod?.endDate)

  const validate = () => startDate && endDate
  const handleNext = () => {
    setTimePeriod({ startDate, endDate })
    next()
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="font-semibold">Pilih Periode Pendaftaran</h2>
      <div className="flex space-x-5 items-center mt-10">
        <input
          type="date"
          name="Start Date"
          className="border p-2 focus:border-blue-700 outline-none"
          value={startDate}
          onChange={(e) => setStartDate(e.currentTarget.value)}
        />
        <div>-</div>
        <input
          type="date"
          name="End Date"
          value={endDate}
          className="border p-2 focus:border-blue-700 outline-none"
          onChange={(e) => setEndDate(e.currentTarget.value)}
        />
      </div>
      <button
        className={`mt-10 self-end py-2 ${
          validate() ? 'text-blue-700' : 'text-gray-500'
        } font-semibold flex space-x-3 items-center`}
        disabled={!validate()}
        onClick={handleNext}
      >
        <span className="text-xl">Berikutnya</span>
        <BsChevronRight fontSize={24} />
      </button>
    </div>
  )
}

export default TimePeriod
