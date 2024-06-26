import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

const DataDiri = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const nama = user && user.nama;
  const NIP = user && user.NIP;
  const alamat = user && user.alamat;
  const tmptLahir = user && user.tmptLahir;
  const tglLahir = user && user.tglLahir;
  const status = user && user.status;
  const sisaCuti = user && user.sisaCuti;
  const jenisKelamin = user && user.jenis_kelamin;
  const foto = user && user.url;
  const noHP = user && user.noHP;
  const agama = user && user.agama;
  const thnMasuk = user && user.thnMasuk;

  let year = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(year);
  const updateYear = () => {
    let year = new Date().getFullYear();
    setCurrentYear(year);
  };
  setInterval(updateYear, 1000);

  return (
    <div>
      <div className="">
        <div className="flex justify-between items-center pr-5">
          <h1 className="my-4 text-2xl font-bold">Data Diri</h1>

          <h1 className="text-lg font-bold">{currentYear} Genap</h1>
        </div>
      </div>
      {/* <div className="">
          <Link
            to={`/updatedatadiri/${id}`}
            className="border px-4 py-1  hover:bg-blue-500 active:bg-blue-600 hover:text-white"
          >
            Edit
          </Link>
        </div> */}

      <div className="flex justify-center">
        <div className="border w-full h-48 items-center bg-blue-400">
          <div className=" h-52 w-52 mx-auto mt-20 rounded-full">
            <Link to={foto}>
              <img className="size-full rounded-full" src={foto} alt="Profil" />
            </Link>
          </div>
        </div>
      </div>
      <div className="px-32 mt-32">
        <table className="w-full text-left ">
          <tr className="h-16">
            <td className="w-44">
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
              <h1 className="font-bold text-blue-500">Tahun Masuk</h1>
            </td>
            <td>
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{thnMasuk}</h1>
            </td>
          </tr>
          <tr className="h-16">
            <td>
              <h1 className="font-bold text-blue-500">Status</h1>
            </td>
            <td>
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{status}</h1>
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
              <h1>
                {tmptLahir}
                {", "}
                {tglLahir}
              </h1>
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
          <tr className="h-16">
            <td>
              <h1 className="font-bold text-blue-500">Agama</h1>
            </td>
            <td>
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{agama}</h1>
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
              <h1 className="font-bold text-blue-500">noHP</h1>
            </td>
            <td>
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{noHP}</h1>
            </td>
          </tr>
          <tr className="h-16">
            <td>
              <h1 className="font-bold text-blue-500">Sisa Cuti</h1>
            </td>
            <td>
              <h1>:</h1>
            </td>
            <td className="border-b-2">
              <h1>{sisaCuti}</h1>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default DataDiri;
