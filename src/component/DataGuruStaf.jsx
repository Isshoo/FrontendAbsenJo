import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DataGuruStaf = () => {
    const [guru, setGuru] =useState([])
    const [kepsek, setKepsek] = useState([])
    const getGuru = async()=>{
        const response=await axios.get("http://localhost:5000/guru");
        setGuru(response.data)
    }  
    const getKepsek = async()=>{
      const response=await axios.get("http://localhost:5000/kepsek");
      setKepsek(response.data)
  }  
    useEffect(()=>{
        getGuru();
        getKepsek();
    },[])
    return (
    <div className="w-full">
      <h1 className="my-4 text-xl">
        Daftar Guru dan Staf
      </h1>
      <div className="border border-slate-950 p-3">
        <div className="flex justify-between items-center mb-2">
          <h1>Data Guru</h1>
          <div className="flex">
            <button className='border border-slate-600 p-1 px-2'>Tambah</button>
          </div>
        </div>
      <table className="border-collapse border-slate-400 border w-full text-left ">
        <thead className="">
        <tr>
            <th className="border border-slate-700 text-center bg-slate-400">No.</th>
            <th className="border border-slate-700 text-center bg-slate-400">NIP</th>
            <th className="border border-slate-700 text-center bg-slate-400">Nama Guru</th>
            <th className="border border-slate-700 text-center bg-slate-400">jabatan</th>
            <th className="border border-slate-700 text-center bg-slate-400">TTL</th>
        </tr>
        </thead>
        <tbody>
            {kepsek.map((item,index)=>(
            <tr key={item&&item.id_kepsek}>
            <td className="border border-slate-600 text-right pr-2">{index+1}.</td>
            <td className="border border-slate-600 text-justify pl-2">{item&&item.NIP}</td>
            <td className="border border-slate-600 text-justify pl-2">{item&&item.nama}</td>
            <td className="border border-slate-600 text-justify pl-2">{item&&item.role}</td>
            <td className="border border-slate-600 text-justify pl-2">{item&&item.ttl}</td>
            </tr>
            ))}
            
            {guru.map((item,index)=>(
            <tr key={item&&item.id_guru}>
            <td className="border border-slate-600 text-right pr-2">{index+2}.</td>
            <td className="border border-slate-600 text-justify pl-2">{item&&item.NIP}</td>
            <td className="border border-slate-600 text-justify pl-2">{item&&item.nama}</td>
            <td className="border border-slate-600 text-justify pl-2">{item&&item.role}</td>
            <td className="border border-slate-600 text-justify pl-2">{item&&item.ttl}</td>
            </tr>
            ))}
            
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default DataGuruStaf
