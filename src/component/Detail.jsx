import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { parseAndFormatDateString } from "../utils/helper";
import { useSelector } from "react-redux";

const Detail = () => {
  const [guru, setGuru] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const idUser = user && user.id_guru;
  const [kehadiran, setKehadiran] = useState([]);
  const [pengajuansGuru, setPengajuanbyGuru] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");

  const getGurubyId = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/guru/${id}`);
      setGuru(response.data);
    } catch (error) {}
  };

  const getPengajuanbyGuru = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/pengajuan/${id}`);
      setPengajuanbyGuru(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKehadiran = async (id) => {
    try {
      const response = await axios.get("http://localhost:5000/kehadiran/");
      setKehadiran(response.data);
    } catch (error) {}
  };

  const extractTime = (masuk) => {
    const jam = masuk.slice(8, 10);
    const menit = masuk.slice(10, 12);
    return `${jam}:${menit}`;
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const dayNames = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return dayNames[date.getDay()];
  };

  let keterangan;
  if (kehadiran.masuk <= 7 * 60 * 60 * 1000) {
    keterangan = "Tepat Waktu";
  } else {
    keterangan = "Terlambat";
  }

  const filteredKehadiran = kehadiran.filter((item) => {
    return item.masuk.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const filteredPengajuansGuru = pengajuansGuru.filter((item) => {
    return (
      item.tanggal.toLowerCase().includes(searchQuery2.toLowerCase()) ||
      item.jenis.toLowerCase().includes(searchQuery2.toLowerCase()) ||
      item.validasi.toLowerCase().includes(searchQuery2.toLowerCase())
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchChange2 = (e) => {
    setSearchQuery2(e.target.value);
  };

  const isThisMonth = (someDate) => {
    const month = new Date();
    return (
      someDate.getMonth() === month.getMonth() &&
      someDate.getFullYear() === month.getFullYear()
    );
  };

  useEffect(() => {
    getGurubyId();
  }, []);

  return (
    <div>
      <div className="">
        <div className="flex my-4">
          <Link
            className="border border-slate-600 p-1 px-2 hover:bg-blue-500 active:bg-blue-600 hover:text-white"
            to="/daftarguru"
          >
            Kembali
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="border w-full h-48 items-center bg-blue-400">
            <div className=" h-52 w-52 mx-auto mt-20 rounded-full">
              <img
                className="size-full rounded-full"
                src={guru.url}
                alt="Profil"
              />
            </div>
          </div>
        </div>
        <div className="px-10 mt-32">
          <div className="flex justify-evenly">
            <div className="mr-4 w-1/2">
              <div className="mb-4">
                <label className="block mb-2  font-bold text-blue-500">
                  Nama:
                </label>
                <h1>{guru.nama}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  NIP:
                </label>
                <h1>{guru.NIP}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Tahun Masuk:
                </label>
                <h1>{guru.thnMasuk}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Status
                </label>
                <h1>{guru.status}</h1>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Tempat, Tanggal Lahir:
                </label>
                <h1>
                  {guru.tmptLahir}
                  {", "}
                  {guru.tglLahir}
                </h1>
              </div>
            </div>
            <div className="ml-4 w-1/2">
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Jenis Kelamin:
                </label>
                <h1>{guru.jenis_kelamin}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Agama:
                </label>
                <h1>{guru.agama}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Alamat:
                </label>
                <h1>{guru.alamat}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Nomor HP:
                </label>
                <h1>{guru.noHP}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Sisa Cuti:
                </label>
                <h1>{guru.sisaCuti}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-normal">
          <input
            type="text"
            placeholder="Cari kehadiran "
            value={searchQuery}
            onChange={handleSearchChange}
            className="block border border-gray-300 px-2 py-1 mb-2 rounded-md w-1/2 mr-1"
          />
          <input
            type="text"
            placeholder="Cari pengajuan"
            value={searchQuery2}
            onChange={handleSearchChange2}
            className="block border border-gray-300 px-2 py-1 mb-2 rounded-md w-1/2 ml-3"
          />
        </div>
        <div className="flex justify-between">
          <div className="mr-2 w-full">
            <table className="border-collapse border-slate-400 border w-full text-left ">
              <thead className="">
                <tr>
                  <th className="border border-slate-700 text-center bg-blue-400  h-10">
                    No.
                  </th>
                  <th className="border border-slate-700 text-center bg-blue-400 py-2">
                    Hari/Tanggal
                  </th>

                  <th className="border border-slate-700 text-center bg-blue-400 ">
                    Masuk
                  </th>
                  <th className="border border-slate-700 text-center bg-blue-400 ">
                    Keluar
                  </th>
                  <th className="border border-slate-700 text-center bg-blue-400 ">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredKehadiran
                  .filter((item) => item.Guru.id_guru === idUser)
                  .map((item, index) => {
                    const createdAt = new Date(item.createdAt);
                    if (isThisMonth(createdAt)) {
                      return (
                        <tr key={item && item.Guru && item.Guru.id_guru}>
                          <td className="border border-slate-600 text-right px-3 h-10">
                            {index + 1}.
                          </td>
                          <td className=" text-justify border-slate-700 border px-3 py-2">
                            {getDayName(item && item.createdAt)}
                            {", "}
                            {item && parseAndFormatDateString(item.createdAt)}
                          </td>

                          <td className="border border-slate-600 text-center px-3 ">
                            {item && extractTime(item.masuk)}
                          </td>
                          <td className="border border-slate-600 text-center px-3 ">
                            {item && extractTime(item.keluar)}
                          </td>
                          <td className="border border-slate-600 text-center px-3">
                            {keterangan}
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
          <div className="ml-2 w-full">
            <table className="border border-slate-600 w-full ">
              <thead>
                <tr>
                  <th className="border border-slate-700 text-center bg-blue-400 py-2">
                    No.
                  </th>
                  <th className="border border-slate-700 text-center bg-blue-400 py-2">
                    Hari/Tanggal
                  </th>

                  <th className="border border-slate-700 text-center bg-blue-400 py-2">
                    Tipe
                  </th>
                  <th className="border border-slate-700 text-center bg-blue-400 py-2">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPengajuansGuru.map((pengajuansGuru, index) => (
                  <tr key={pengajuansGuru && pengajuansGuru.id_guru}>
                    <td className=" text-right pr-2 border-slate-700 border px-3 py-2">
                      {index + 1}.
                    </td>
                    <td className=" text-justify border-slate-700 border px-3 py-2">
                      {getDayName(pengajuansGuru && pengajuansGuru.tanggal)}
                      {", "}
                      {pengajuansGuru &&
                        parseAndFormatDateString(pengajuansGuru.tanggal)}
                    </td>

                    <td className=" text-justify border-slate-700 border px-3 py-2">
                      {pengajuansGuru && pengajuansGuru.jenis}
                    </td>
                    <td className=" text-justify border-slate-700 border px-3 py-2">
                      {pengajuansGuru && pengajuansGuru.validasi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
