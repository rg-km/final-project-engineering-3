import { BsChevronRight } from 'react-icons/bs'

function TimePeriod() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="font-semibold">Pilih Periode Pendaftaran</h2>
      <div className="flex space-x-5 items-center mt-10">
        <input type="date" className="border-2 p-2" />
        <div>-</div>
        <input type="date" className="border-2 p-2" />
      </div>
      <button className="mt-10 self-end px-5 py-2 text-blue-700 font-semibold flex space-x-3 items-center">
        <span className="text-xl">Next</span> <BsChevronRight fontSize={24} />
      </button>
    </div>
  )
}

export default TimePeriod
