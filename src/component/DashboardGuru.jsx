import React from 'react'
import {useSelector} from 'react-redux'

const DashboardGuru = () => {
  const {user}=useSelector((state)=>state.auth)
  return (
    <div >
      {user&&user.role === 'Admin'&&(
        <h1>Admin</h1>
      )}
      {user&&user.role === 'Guru'&&(
        <h1>Guru</h1>
      )}
      {user&&user.role === 'Kepsek'&&(
        <h1>Kepsek</h1>
      )}
    </div>
  )
}

export default DashboardGuru
