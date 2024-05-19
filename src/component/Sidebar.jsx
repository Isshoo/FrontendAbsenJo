import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="mt-[80px]">
      <div className="bg-white w-full px-5 flex justify-center">
        <div className="w-full">
          <div className="mt-2 border-t-2 border-t-black p-2 items-center">
            <Link
              to="/dashboard"
              className="hover:bg-blue-500 active:bg-blue-600 hover:text-white rounded-md p-2 flex items-center w-full text-center "
            >
              <p className="text-xl">
                <IoHome />
              </p>{" "}
              <p className="ml-2 text-lg mt-1">DASHBOARD</p>
            </Link>
          </div>

          <div className="mt-2 border-t-2 p-2 border-t-black">
            <p className="text-xs ml-0 text-gray-400 my-3 ">Profil</p>
            <div className=" ">
              {user && (user.role === "Guru" || user.role === "Kepsek") && (
                <Link
                  to="/datadiri"
                  className="hover:bg-blue-500 active:bg-blue-600 hover:text-white rounded-md p-2 pl-4 text-base block w-full my-1"
                >
                  Data Diri
                </Link>
              )}
              {user && (user.role === "Admin" || user.role === "Kepsek") && (
                <Link
                  to="/daftarguru"
                  className="hover:bg-blue-500 active:bg-blue-600 hover:text-white rounded-md p-2 pl-4 text-base block w-full my-1"
                >
                  Daftar Guru
                </Link>
              )}
              <Link
                to="/ubahpassword"
                className="hover:bg-blue-500 active:bg-blue-600 hover:text-white rounded-md p-2 pl-4 text-base block w-full my-1"
              >
                Ubah Password
              </Link>
            </div>
          </div>

          <div className="mt-2 border-t-2 border-t-black p-2 ">
            <p className="text-xs ml-0 my-3 text-gray-400">Menu Utama</p>
            <div className="">
              {user && (user.role === "Guru" || user.role === "Kepsek") && (
                <Link
                  to="/isidaftarhadir"
                  className="hover:bg-blue-500 active:bg-blue-600 hover:text-white rounded-md p-2 pl-4 text-base block w-full my-1"
                >
                  Isi Daftar Hadir
                </Link>
              )}

              {user && (user.role === "Admin" || user.role === "Kepsek") && (
                <Link
                  to="/jadwalpiket"
                  className="hover:bg-blue-500 active:bg-blue-600 hover:text-white rounded-md p-2 pl-4 text-base block w-full my-1"
                >
                  Jadwal Piket
                </Link>
              )}

              {user && user.role === "Guru" && (
                <Link
                  to="/Pengajuan"
                  className="hover:bg-blue-500 active:bg-blue-600 hover:text-white rounded-md p-2 pl-4 text-base block w-full my-1"
                >
                  Pengajuan
                </Link>
              )}

              {user && (user.role === "Admin" || user.role === "Kepsek") && (
                <Link
                  to="/Pengajuan"
                  className="hover:bg-blue-500 active:bg-blue-600 hover:text-white rounded-md p-2 pl-4 text-base block w-full my-1"
                >
                  Daftar Pengajuan
                </Link>
              )}

              <Link
                to="/RiwayatKehadiran"
                className="hover:bg-blue-500 active:bg-blue-600 hover:text-white rounded-md p-2 pl-4 text-base block w-full my-1"
              >
                Riwayat Kehadiran
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
