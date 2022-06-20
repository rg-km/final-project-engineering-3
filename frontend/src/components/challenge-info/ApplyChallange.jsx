import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBackIos } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import Accordion from '../shared/Accordion'

const ApplyChallange = ({ changeStep }) => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="flex flex-wrap w-auto">
        <div>
          <button to="#" className="flex items-center w-fit" onClick={() => navigate(-1)}>
            <MdArrowBackIos fontSize={24} />
            <span className="text-xl">Kembali</span>
          </button>
        </div>
        <div className="ml-auto">
          <button
            to="#"
            className="px-10 py-1 rounded-full bg-blue-700 text-white font-semibold"
            onClick={() => changeStep(2)}
          >
            APPLY
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-3 mt-8">
        <div className="space-y-6">
          <div className="bg-gray-100 p-5 rounded-md flex flex-col justify-center items-center lg:items-start">
            <div>
              <AiOutlineUser fontSize={64} />
            </div>
            <div className="mt-2 space-y-2 text-center lg:text-left">
              <div className="text-xl font-semibold">Nama Research</div>
              <div className="text-sm">Bidang Research</div>
              <div className="text-sm">Nama Mitra</div>
              <div className="text-sm">Periode</div>
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold mb-3">Download</div>
            <button className="p-2 flex space-x-3 items-center bg-gray-100 w-full rounded-md">
              <BsDownload />
              <span className="font-semibold">File Panduan</span>
            </button>
          </div>
        </div>
        <div className="px-5 bg-gray-100">
          <div className="flex flex-col mt-5 divide-y-2 space-y-3">
            <div className="py-2">
              <div className="text-xl font-semibold">Periode Pendaftaran</div>
              <div className="text-gray-500">2000-2000</div>
            </div>
            <div className="py-2">
              <div className="text-xl font-semibold">Dana Funding</div>
              <div className="text-gray-500">Rp. 1000</div>
            </div>
            <div className="py-4">
              <Accordion title={'Deskripsi'} isOpen={true}>
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
            <div className="py-4">
              <Accordion title={'Rincian Kegiatan'} isOpen={true}>
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

export default ApplyChallange
