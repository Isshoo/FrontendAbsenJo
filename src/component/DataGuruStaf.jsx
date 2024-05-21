import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import Detail from "./Detail";
import { useSelector } from "react-redux";

const DataGuruStaf = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showGuru, setShowGuru] = useState(false);
  const [guru, setGuru] = useState([]);
  const [kepsek, setKepsek] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [nama, setNama] = useState("");
  const [NIP, setNIP] = useState("");
  const [thnMasuk, setThnMasuk] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [tmptLahir, setTmptLahir] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [status, setStatus] = useState("");
  const [sisaCuti, setSisaCuti] = useState("");
  const [agama, setAgama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHP, setNoHP] = useState("");
  const [file, setFile] = useState("");

  const getGuru = async () => {
    const response = await axios.get("http://localhost:5000/guru");
    setGuru(response.data);
  };

  const getKepsek = async () => {
    const response = await axios.get("http://localhost:5000/kepsek");
    setKepsek(response.data);
  };

  const loadFile = (e) => {
    const selectFile = e.target.files[0];
    setFile(selectFile);
  };

  const addGuru = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("NIP", NIP);
    formData.append("thnMasuk", thnMasuk);
    formData.append("jenis_kelamin", jenis_kelamin);
    formData.append("tmptLahir", tmptLahir);
    formData.append("tglLahir", tglLahir);
    formData.append("status", status);
    formData.append("sisaCuti", sisaCuti);
    formData.append("agama", agama);
    formData.append("alamat", alamat);
    formData.append("noHP", noHP);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/guru", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      closeGuru();
      setNama("");
      setNIP("");
      setThnMasuk("");
      setJenis_kelamin("");
      setTmptLahir("");
      setTglLahir("");
      setStatus("");
      setSisaCuti("");
      setAgama("");
      setAlamat("");
      setNoHP("");
      setFile("");
      getGuru();
    } catch (error) {
      console.log(error);
    }
  };

  const openGuru = () => setShowGuru(true);
  const closeGuru = () => setShowGuru(false);

  let year = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(year);
  const updateYear = () => {
    let year = new Date().getFullYear();
    setCurrentYear(year);
  };
  setInterval(updateYear, 1000);

  const filteredGuru = guru.filter((item) => {
    return (
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.thnMasuk.includes(searchQuery)
    );
  });
  const filteredKepsek = kepsek.filter((item) => {
    return (
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.thnMasuk.includes(searchQuery)
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getGuru();
    getKepsek();
  }, []);

  return (
    <div className="w-full">
      <div className=" flex justify-between items-center pr-5">
        <h1 className="my-4 text-2xl font-bold">Daftar Guru</h1>
        <h1 className="text-lg font-bold">{currentYear} Genap</h1>
      </div>
      <div className="border border-slate-950 p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex">
            <input
              type="text"
              placeholder="Cari guru..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block border border-gray-300 px-2 py-1 rounded-md w-full"
            />
          </div>

          {user && user.role === "Admin" && (
            <div className="flex">
              <button
                className="border border-slate-600 p-1 px-2 hover:bg-blue-500 active:bg-blue-600 hover:text-white"
                onClick={openGuru}
              >
                Tambah
              </button>
            </div>
          )}
        </div>
        {showGuru && (
          <div className="fixed left-0 top-0 z-[1055] h-full w-full bg-black bg-opacity-20 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">Tambah Guru</h2>
              <form onSubmit={addGuru} className="">
                <div className="flex justify-evenly">
                  <div className="mr-4 w-1/2">
                    <div className="mb-4">
                      <label className=" mb-2 flex">
                        Nama: <p className="text-red-500 ml-2">*</p>
                      </label>
                      <input
                        type="text"
                        name="nama"
                        placeholder="Nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4 ">
                      <label className="flex mb-2">
                        NIP: <p className="text-red-500 ml-2">*</p>
                      </label>
                      <input
                        type="text"
                        maxLength={8}
                        name="NIP"
                        placeholder="NIP"
                        value={NIP}
                        onChange={(e) => setNIP(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4 ">
                      <label className="flex mb-2">
                        Tahun Masuk: <p className="text-red-500 ml-2">*</p>
                      </label>
                      <input
                        type="text"
                        name="thnMasuk"
                        placeholder="Tahun Masuk"
                        value={thnMasuk}
                        onChange={(e) => setThnMasuk(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4 ">
                      <label className="flex mb-2">
                        Status: <p className="text-red-500 ml-2">*</p>
                      </label>
                      <select
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      >
                        <option value="" disabled hidden>
                          Pilih Status
                        </option>
                        <option value="Aktif">Aktif</option>
                        <option value="Cuti">Cuti</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                        <option value="Meninggal">Meninggal</option>
                      </select>
                    </div>
                    <div className="mb-4 ">
                      <label className="flex mb-2">
                        Sisa Cuti: <p className="text-red-500 ml-2">*</p>
                      </label>
                      <select
                        name="sisaCuti"
                        value={sisaCuti}
                        onChange={(e) => setSisaCuti(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      >
                        <option value="" disabled hidden>
                          Jumlah sisa cuti
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="flex mb-2">
                        Alamat: <p className="text-red-500 ml-2">*</p>
                      </label>
                      <input
                        type="text"
                        name="alamat"
                        placeholder="Alamat"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                  </div>
                  <div className="ml-4 w-1/2">
                    <div className="mb-4 ">
                      <label className="flex mb-2">
                        Tempat Lahir:
                        <p className="text-red-500 ml-2">*</p>
                      </label>
                      <input
                        type="text"
                        name="tmptLahir"
                        placeholder="Tempat Lahir"
                        value={tmptLahir}
                        onChange={(e) => setTmptLahir(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4 ">
                      <label className="flex mb-2">
                        Tanggal Lahir:
                        <p className="text-red-500 ml-2">*</p>
                      </label>
                      <input
                        type="date"
                        name="tglLahir"
                        placeholder="Tanggal Lahir"
                        value={tglLahir}
                        onChange={(e) => setTglLahir(e.target.value)}
                        className="block border border-gray-300 p-1 rounded-md w-full"
                      />
                    </div>

                    <div className="mb-4 ">
                      <label className="flex mb-2">
                        Agama: <p className="text-red-500 ml-2">*</p>
                      </label>
                      <select
                        name="agama"
                        value={agama}
                        onChange={(e) => setAgama(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      >
                        <option value="" disabled hidden>
                          Pilih Agama
                        </option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                    </div>

                    <div className="mb-4 ">
                      <label className="flex mb-2">
                        Jenis Kelamin: <p className="text-red-500 ml-2">*</p>
                      </label>
                      <select
                        name="jenis_kelamin"
                        value={jenis_kelamin}
                        onChange={(e) => setJenis_kelamin(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      >
                        <option value="" disabled hidden>
                          Pilih Jenis Kelamin
                        </option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="flex mb-2">
                        Nomor HP: <p className="text-red-500 ml-2">*</p>
                      </label>
                      <input
                        type="text"
                        name="noHP"
                        placeholder="Nomor HP"
                        value={noHP}
                        onChange={(e) => setNoHP(e.target.value)}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="flex mb-2">
                        File Gambar: {"(< 5mb)"}{" "}
                        <p className="text-red-500 ml-2">*</p>
                      </label>
                      <input
                        type="file"
                        name="file"
                        onChange={loadFile}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={closeGuru}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex justify-center mx-3"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
                  >
                    Selesai
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <table className="border-collapse border-slate-400 border w-full text-left ">
          <thead className="">
            <tr>
              <th className="border border-slate-700 text-center bg-blue-400 w-10">
                No.
              </th>
              <th className="border border-slate-700 text-center bg-blue-400 ">
                Nama
              </th>
              <th className="border border-slate-700 text-center bg-blue-400 w-32">
                NIP
              </th>
              <th className="border border-slate-700 text-center bg-blue-400 w-20">
                Jabatan
              </th>
              <th className="border border-slate-700 text-center bg-blue-400 w-20">
                Status
              </th>
              <th className="border border-slate-700 text-center bg-blue-400 w-20">
                Tahun Masuk
              </th>

              <th className="border border-slate-700 text-center bg-blue-400 ">
                Alamat
              </th>
              <th className="border border-slate-700 text-center bg-blue-400 w-40">
                Nomor Telepon
              </th>
              <th className="border border-slate-700 text-center bg-blue-400 w-16">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredKepsek.map((item, index) => (
              <tr key={item && item.id_kepsek}>
                <td className="border border-slate-600 text-right pr-2 h-10">
                  {index + 1}.
                </td>
                <td className="border border-slate-600 text-justify pl-3">
                  <Link
                    to={`/detailkepsek/${item && item.id_kepsek}`}
                    className="hover:text-blue-400"
                  >
                    {item && item.nama}
                  </Link>
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.NIP}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.role}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.status}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.thnMasuk}
                </td>

                <td className="border border-slate-600 text-justify pl-3">
                  {item && item.alamat}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.noHP}
                </td>
                <td className="border border-slate-600 items-center">
                  <Link
                    className="flex justify-center"
                    to={`/detailkepsek/${item && item.id_kepsek}`}
                  >
                    <IoEyeSharp />
                  </Link>
                </td>
              </tr>
            ))}

            {filteredGuru.map((item, index) => (
              <tr key={item && item.id_guru}>
                <td className="border border-slate-600 text-right pr-2 h-10">
                  {index + 2}.
                </td>
                <td className="border border-slate-600 text-justify pl-3 ">
                  <Link
                    to={`/detail/${item && item.id_guru}`}
                    className="hover:text-blue-400"
                  >
                    {item && item.nama}
                  </Link>
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.NIP}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.role}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.status}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.thnMasuk}
                </td>

                <td className="border border-slate-600 text-justify pl-3">
                  {item && item.alamat}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.noHP}
                </td>
                <td className="border border-slate-600 items-center">
                  <Link
                    className="flex justify-center"
                    to={`/detail/${item && item.id_guru}`}
                  >
                    <IoEyeSharp />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataGuruStaf;
