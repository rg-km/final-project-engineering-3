import React from 'react'
import { Link } from 'react-router-dom'

function Modal({ path }) {
  return (
    <div
      id="popup-modal"
      tabindex="-1"
      class="fixed top-0 right-0 left-0 z-50 inset-0  bg-black/[0.2] flex items-center justify-center"
    >
      <div class="p-10 bg-white rounded-lg shadow-lg dark:bg-gray-700 ">
        <div class="p-6 text-center">
          <svg
            class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Anda belum melengkapi data profil
          </h3>
          <Link
            to={path}
            data-modal-toggle="popup-modal"
            type="button"
            class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Isi sekarang
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Modal
