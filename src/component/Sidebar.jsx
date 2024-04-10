import React, { useState } from 'react'
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
     const [showSubMenu, setShowSubMenu] = useState(false);
  return (
    <div className="mt-12">
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

          <div className="mt-2 border-t-2 border-t-black p-2 ">
            <p>Profil</p>
            <div className="ml-3">
              <Link
                to="/datadiri"
                className="hover:bg-blue-500 hover:text-white rounded-md p-2 text-base block w-full"
              >
                Data Diri
              </Link>
              <Link
                to="/ubahpassword"
                className="hover:bg-blue-500 hover:text-white rounded-md p-2 text-base block w-full"
              >
                Ubah Password
              </Link>
            </div>
          </div>
          <div className="mt-2 border-t-2 border-t-black p-2 ">
            <p>Menu Utama</p>
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