import React, { useState } from 'react'
import { Link } from 'react-router-dom'; 
import {useSelector} from 'react-redux'

const Sidebar = () => {
     const {user}=useSelector((state)=>state.auth)
  return (
    <div className="mt-[80px]">
      <div className="bg-white w-full px-0 flex justify-center">
        <div className="w-full">
          <div className="mt-2 border-t-2 border-t-black p-2">
            <Link
              to="/dashboard"
              className="hover:bg-blue-500 hover:text-white rounded-md p-2 block w-full"
            >
              Dashboard
            </Link>
          </div>
          
            <div className="mt-2 border-t-2 p-2 border-t-black">
            <p className="text-xs ml-1 text-gray-400 ">
              Profil</p>
            <div className="ml-3 ">
            {user&&user.role === 'Guru' && (
              <Link
                to="/datadiri"
                className="hover:bg-blue-500 hover:text-white rounded-md p-2 text-base block w-full"
              >
                Data Diri
              </Link>
              )}
              {user&&user.role === 'Admin' && (
              <Link
                to="/daftarguru"
                className="hover:bg-blue-500 hover:text-white rounded-md p-2 text-base block w-full"
              >
                Data Guru dan Staf
              </Link>
              )}
              <Link
                to="/ubahpassword"
                className="hover:bg-blue-500 hover:text-white rounded-md p-2 text-base block w-full"
              >
                Ubah Password
              </Link>
            </div>
          </div>
          
          
          <div className="mt-2 border-t-2 border-t-black p-2 ">
            <p className="text-xs ml-1 text-gray-400">Menu Utama</p>
            <div className="ml-3">
              <Link
                to="/isidaftarhadir"
                className="hover:bg-blue-500 hover:text-white rounded-md p-2 text-base block w-full"
              >
                Isi Daftar Hadir
              </Link>
              <Link
                to="/Pengajuan"
                className="hover:bg-blue-500 hover:text-white rounded-md p-2 text-base block w-full"
              >
                Pengajuan
              </Link>
              
              <Link
                to="/RiwayatKehadiran"
                className="hover:bg-blue-500 hover:text-white rounded-md p-2 text-base block w-full"
              >
                Riwayat Kehadiran
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar