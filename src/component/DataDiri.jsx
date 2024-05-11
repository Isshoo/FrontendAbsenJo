import React from "react";
import { useSelector } from "react-redux";

const DataDiri = () => {
  const { user } = useSelector((state) => state.auth);
  const nama = user && user.nama;
  const NIP = user && user.NIP;
  const alamat = user && user.alamat;
  const ttl = user && user.ttl;
  const jenisKelamin = user && user.jenis_kelamin;
  const foto = user && user.url;
  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h1 className="my-4 text-xl">Data Diri</h1>
        <div className="">
          <button className="border px-4 py-1">Edit</button>
          <button className="border px-4 py-1 ml-3">Simpan</button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="border w-full h-48 items-center bg-blue-400">
          <div className=" h-52 w-52 mx-auto mt-20 rounded-full">
            <img className="size-full rounded-full" src={foto} alt="Profil" />
          </div>
          <div className="flex justify-center py-3 ">
            <button className=" text-gray-500 py-1 px-2 underline">
              Ganti foto
            </button>
          </div>
        </div>
      </div>
      <div className="px-32 mt-44">
        <table className="w-full text-left ">
          <tr className="h-16">
            <td className="w-52">
              <h1 className="font-bold text-blue-500">Nama</h1>
            </td>
            <td className="w-10">
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{nama}</h1>
            </td>
          </tr>

          <tr className="h-16">
            <td>
              <h1 className="font-bold text-blue-500">NIP</h1>
            </td>
            <td>
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{NIP}</h1>
            </td>
          </tr>
          <tr className="h-16">
            <td>
              <h1 className="font-bold text-blue-500">Alamat</h1>
            </td>
            <td>
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{alamat}</h1>
            </td>
          </tr>
          <tr className="h-16">
            <td>
              <h1 className="font-bold text-blue-500">Tempat, Tanggal Lahir</h1>
            </td>
            <td>
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{ttl}</h1>
            </td>
          </tr>
          <tr className="h-16">
            <td>
              <h1 className="font-bold text-blue-500">Jenis Kelamin</h1>
            </td>
            <td>
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{jenisKelamin}</h1>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default DataDiri;
