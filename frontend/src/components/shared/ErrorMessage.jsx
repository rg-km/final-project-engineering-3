import React from 'react'
import { HiOutlineEmojiSad } from 'react-icons/hi'

function ErrorMessage({ message }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center ">
      <HiOutlineEmojiSad fontSize={64} />

      <p className="text-2xl mt-1">{message}</p>
    </div>
  )
}

export default ErrorMessage
