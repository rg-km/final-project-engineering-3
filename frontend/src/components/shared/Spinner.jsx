import React from 'react'

function Spinner({ className = 'h-5 w-5' }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin  rounded-full border-4 border-t-4 border-t-black  ${className}`}
      ></div>
    </div>
  )
}

export default Spinner
