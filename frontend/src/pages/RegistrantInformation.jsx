import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import { MdArrowBackIos } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Accordion from '../components/shared/Accordion'

function RegistrantInformation() {
  return (
    <div className="container">
      <Link to="#" className="flex items-center w-fit">
        <MdArrowBackIos fontSize={24} />
        <span className="text-xl">Kembali</span>
      </Link>

      <div className="mt-10 grid lg:grid-cols-[1fr_2fr] gap-3">
        <div className="space-y-6">
          <div className="bg-gray-100 p-5 rounded-md flex flex-col justify-center items-center lg:items-start">
            <div>
              <AiOutlineUser fontSize={64} />
            </div>
            <div className="mt-2 space-y-2 text-center lg:text-left">
              <div className="text-xl font-semibold">Nama Peneliti</div>
              <div className="text-sm">Nama Universitas</div>
              <div className="text-sm">No. Telp</div>
              <div className="text-sm">Email</div>
            </div>
            <div className="mt-5 flex space-x-5">
              <button className="text-white rounded-md px-5 py-2 bg-red-600 hover:bg-red-700">
                Tolak
              </button>
              <button className="text-white rounded-md px-5 py-2 bg-green-600 hover:bg-green-700">
                Terima
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>Proposal :</div>
              <button className="p-2 flex space-x-3 items-center justify-center text-white bg-blue-700 w-full rounded-md hover:bg-blue-800">
                <BsDownload />
                <span>Download</span>
              </button>
            </div>
            <div>
              <div>Dokumen :</div>
              <button className="p-2 flex space-x-3 items-center justify-center text-white bg-blue-700 w-full rounded-md hover:bg-blue-800">
                <BsDownload /> <span>Download</span>
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Accordion title={'Data Peneliti'}>
              <div className="mt-5 space-y-3">
                <div className="grid grid-cols-2">
                  <div>Nama Ketua Tim</div>
                  <div>: lorem50</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Nama Perguruan Tinggi</div>
                  <div>: lorem</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>No. HP Ketua Tim</div>
                  <div>: lorem</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>NIDN</div>
                  <div>: lorem</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Email</div>
                  <div>: lorem</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Alamat</div>
                  <div>: lorem</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>No Rekening (Optsional)</div>
                  <div>: lorem</div>
                </div>
                <div className="grid grid-cols-2">
                  <div>Bank</div>
                  <div>: lorem</div>
                </div>
              </div>
            </Accordion>
          </div>
          <div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <Accordion title={'Abstract'} isOpen={true}>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, asperiores!
                  Excepturi voluptates praesentium numquam accusantium maiores fuga natus placeat
                  facilis odit, consequuntur modi hic laudantium pariatur magni quisquam tempore
                  labore veniam laborum eligendi nemo architecto repudiandae. Explicabo saepe
                  quisquam corrupti velit laborum fugiat quis aut, quia provident doloribus
                  aspernatur modi excepturi, hic unde. Illum reprehenderit animi officiis
                  voluptatibus molestias nam soluta sed facere, iusto amet accusantium tempore
                  cumque ipsa, odit, quo optio. Aut porro fugiat quasi pariatur vitae, facilis
                  labore, ipsa eum amet tempora nesciunt minima debitis eligendi, nulla provident
                  inventore et adipisci hic animi repudiandae. At fuga dolor officiis.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrantInformation
