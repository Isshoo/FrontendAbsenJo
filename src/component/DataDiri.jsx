import React from 'react'
import {useSelector} from 'react-redux'

const DataDiri = () => {
  const {user}=useSelector((state)=>state.auth)
  const nama=user&&user.nama
  const NIP=user&&user.NIP
  const alamat=user&&user.alamat
  const ttl=user&&user.ttl
  const jenisKelamin=user&&user.jenis_kelamin
  return (
    <div>
      <h1>{nama}</h1>
      <h1>{NIP}</h1>
      <h1>{alamat}</h1>
      <h1>{ttl}</h1>
      <h1>{jenisKelamin}</h1>
    </div>
  )
}

export default DataDiri
