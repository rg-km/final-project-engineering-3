import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <h1 className="text-4xl">Page Not Found</h1>
      <Link
        to="/"
        className=" mt-10 px-10 py-3 text-white rounded-md bg-blue-700 hover:bg-blue-800"
      >
        Back to home
      </Link>
    </div>
  )
}

export default NotFound
