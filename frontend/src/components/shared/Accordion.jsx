import React, { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

function Accordion({ isOpen = false, title, children }) {
  const [showMore, setShowMore] = useState(isOpen)

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="mr-8" onClick={() => setShowMore(!showMore)}>
          {showMore ? <BsChevronUp size={24} /> : <BsChevronDown size={24} />}
        </button>
      </div>
      <div
        className={`${
          showMore ? 'max-h-[999px]' : 'max-h-0'
        } overflow-hidden transition-all duration-500 `}
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion
