import React from 'react'

function FormChallenge() {
  return (
    <div className="space-y-5 mt-10">
      <div className="space-y-3 flex flex-col">
        <label htmlFor="">Nama Research</label>
        <input type="text" placeholder="Nama Research" />
      </div>
      <div className="space-y-3 flex flex-col">
        <label htmlFor="">Bidang Research</label>
        <select>
          <option value="Pilihan 1">Pilihan 1</option>
          <option value="Pilihan 2">Pilihan 2</option>
          <option value="Pilihan 3">Pilihan 3</option>
        </select>
      </div>
      <div className="space-y-3 flex flex-col">
        <label htmlFor="">Periode</label>
        <div className="flex space-x-5 items-center mt-10">
          <input type="date" className="border-2 p-2" />
          <div>-</div>
          <input type="date" className="border-2 p-2" />
        </div>
      </div>
      <div className="space-y-3 flex flex-col">
        <label htmlFor="">Dana Funding</label>
        <div>
          <span className="p-3 border">Rp.</span>
          <input type="text" placeholder="Nama Research" />
        </div>
      </div>
      <div className="space-y-3 flex flex-col">
        <label htmlFor="">Rincian Kegiatan</label>
        <input type="text" placeholder="Nama Research" />
      </div>
      <div className="space-y-3 flex flex-col">
        <label htmlFor="">Deskripsi Kegiatan</label>

        <textarea className="resize-none" rows={5}></textarea>
      </div>
    </div>
  )
}

export default FormChallenge
