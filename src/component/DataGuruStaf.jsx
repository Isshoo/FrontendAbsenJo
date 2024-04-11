import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DataGuruStaf = () => {
    const [guru, setGuru] =useState([])
    const getGuru = async()=>{
        const response=await axios.get("http://localhost:5000/guru");
        setGuru(response.data)
    }  
    useEffect(()=>{
        getGuru();
    },[])
    return (
    <div>
      <table>
        <thead>
        <tr>
            <th>No.</th>
            <th>NIP</th>
            <th>Nama Guru</th>
            <th>jabatan</th>
            <th>TTL</th>
        </tr>
        </thead>
        <tbody>
            {guru.map((item,index)=>(
            <tr key={item&&item.id_guru}>
            <td>{index+1}</td>
            <td>{item&&item.NIP}</td>
            <td>{item&&item.nama}</td>
            <td>{item&&item.role}</td>
            <td>{item&&item.ttl}</td>
            </tr>
            ))}
            
        </tbody>
      </table>
    </div>
  )
}

export default DataGuruStaf
