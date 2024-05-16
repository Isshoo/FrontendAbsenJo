import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Detail from "./Detail";

const DataGuruStaf = () => {
  const [showGuru, setShowGuru] = useState(false);
  const [guru, setGuru] = useState([]);
  const [kepsek, setKepsek] = useState([]);
  const [newGuruData, setNewGuruData] = useState({
    No_Daftar: "",
    nama: "",
    NIP: "",
    thnMasuk: "",
    jenis_kelamin: "",
    ttl: "",
    agama: "",
    alamat: "",
    noHP: "",
    file: null, // Updated to null initially
  });

  const getGuru = async () => {
    const response = await axios.get("http://localhost:5000/guru");
    setGuru(response.data);
  };

  const getKepsek = async () => {
    const response = await axios.get("http://localhost:5000/kepsek");
    setKepsek(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuruData({
      ...newGuruData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewGuruData({
      ...newGuruData,
      file: file,
    });
  };

  const addGuru = async () => {
    const formData = new FormData();
    formData.append("No_Daftar", newGuruData.No_Daftar);
    formData.append("nama", newGuruData.nama);
    formData.append("NIP", newGuruData.NIP);
    formData.append("thnMasuk", newGuruData.thnMasuk);
    formData.append("jenis_kelamin", newGuruData.jenis_kelamin);
    formData.append("ttl", newGuruData.ttl);
    formData.append("agama", newGuruData.agama);
    formData.append("alamat", newGuruData.alamat);
    formData.append("noHP", newGuruData.noHP);
    formData.append("file", newGuruData.file);

    await axios.post("http://localhost:5000/guru", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const openGuru = () => setShowGuru(true);
    const closeGuru = () => setShowGuru(false);

    // Reset the form after successful submission
    setNewGuruData({
      No_Daftar: "",
      nama: "",
      NIP: "",
      thnMasuk: "",
      jenis_kelamin: "",
      ttl: "",
      agama: "",
      alamat: "",
      noHP: "",
      file: null,
    });

    // Refresh the data after adding a new guru
    getGuru();
  };

  useEffect(() => {
    getGuru();
    getKepsek();
  }, []);

  return (
    <div className="w-full">
      <h1 className="my-4 text-xl">Daftar Guru dan Staf</h1>
      <div className="border border-slate-950 p-3">
        <div className="flex justify-between items-center mb-2">
          <h1>Data Guru</h1>
          <div className="flex">
            <button
              className="border border-slate-600 p-1 px-2 hover:bg-blue-500 active:bg-blue-600 hover:text-white"
              onClick={() => setShowGuru(true)}
            >
              Tambah
            </button>
          </div>
        </div>
        {showGuru && (
          <div className="fixed left-0 top-0 z-[1055] h-full w-full bg-black bg-opacity-20 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4">Tambah Guru</h2>
              <form onSubmit={addGuru} className="">
                <div className="flex justify-evenly">
                  <div className="mr-4 w-1/2">
                    <div className="mb-4">
                      <label className="block mb-2">Nomor Daftar:</label>
                      <input
                        type="text"
                        name="No_Daftar"
                        placeholder="Nomor Daftar"
                        value={newGuruData.No_Daftar}
                        onChange={handleInputChange}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Nama:</label>
                      <input
                        type="text"
                        name="nama"
                        placeholder="Nama"
                        value={newGuruData.nama}
                        onChange={handleInputChange}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">NIP:</label>
                      <input
                        type="text"
                        name="NIP"
                        placeholder="NIP"
                        value={newGuruData.NIP}
                        onChange={handleInputChange}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Tahun Masuk:</label>
                      <input
                        type="text"
                        name="thnMasuk"
                        placeholder="Tahun Masuk"
                        value={newGuruData.thnMasuk}
                        onChange={handleInputChange}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Jenis Kelamin:</label>
                      <select
                        name="jenis_kelamin"
                        value={newGuruData.jenis_kelamin}
                        onChange={handleInputChange}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      >
                        <option value="" disabled hidden>
                          Pilih Jenis Kelamin
                        </option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>
                  <div className="ml-4 w-1/2">
                    <div className="mb-4">
                      <label className="block mb-2">Tempat Lahir:</label>
                      <input
                        type="text"
                        name="ttl"
                        placeholder="Tempat Lahir"
                        value={newGuruData.ttl}
                        onChange={handleInputChange}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Agama:</label>
                      <select
                        name="agama"
                        value={newGuruData.agama}
                        onChange={handleInputChange}
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
                    <div className="mb-4">
                      <label className="block mb-2">Alamat:</label>
                      <input
                        type="text"
                        name="alamat"
                        placeholder="Alamat"
                        value={newGuruData.alamat}
                        onChange={handleInputChange}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Nomor HP:</label>
                      <input
                        type="text"
                        name="noHP"
                        placeholder="Nomor HP"
                        value={newGuruData.noHP}
                        onChange={handleInputChange}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">File Gambar:</label>
                      <input
                        type="file"
                        name="file"
                        onChange={handleFileUpload}
                        className="block border border-gray-300 p-2 rounded-md w-full"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
                >
                  Selesai
                </button>
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
                Tahun Masuk
              </th>

              <th className="border border-slate-700 text-center bg-blue-400 w-64">
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
            {kepsek.map((item, index) => (
              <tr key={item && item.id_kepsek}>
                <td className="border border-slate-600 text-right pr-2 h-10">
                  {index + 1}.
                </td>
                <td className="border border-slate-600 text-justify pl-3">
                  {item && item.nama}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.NIP}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.role}
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
                <td className="border border-slate-600 text-center">
                  <Link to={`/detail/${item && item.id_kepsek}`}>tod</Link>
                </td>
              </tr>
            ))}

            {guru.map((item, index) => (
              <tr key={item && item.id_guru}>
                <td className="border border-slate-600 text-right pr-2 h-10">
                  {index + 2}.
                </td>
                <td className="border border-slate-600 text-justify pl-3">
                  {item && item.nama}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.NIP}
                </td>
                <td className="border border-slate-600 text-center">
                  {item && item.role}
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
                <td className="border border-slate-600 text-center">
                  <Link to={`/detail/${item && item.id_guru}`}>tod</Link>
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
