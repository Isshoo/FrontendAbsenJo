import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const UpdateDataDiri = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nama, setNama] = useState("");
  const [NIP, setNIP] = useState("");
  const [thnMasuk, setThnMasuk] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [ttl, setTtl] = useState("");
  const [agama, setAgama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHP, setNoHP] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    getGurubyId(id);
  }, []);

  const loadFile = (e) => {
    const selectFile = e.target.files[0];
    setFile(selectFile);
  };

  const simpanData = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("NIP", NIP);
    formData.append("thnMasuk", thnMasuk);
    formData.append("jenis_kelamin", jenis_kelamin);
    formData.append("ttl", ttl);
    formData.append("agama", agama);
    formData.append("alamat", alamat);
    formData.append("noHP", noHP);
    formData.append("file", file);

    try {
      await axios.patch(`http://localhost:5000/guru/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setNama("");
      setNIP("");
      setThnMasuk("");
      setJenis_kelamin("");
      setTtl("");
      setAgama("");
      setAlamat("");
      setNoHP("");
      setFile("");
    } catch (error) {
      console.log(error);
    }
  };

  const getGurubyId = async () => {
    const response = await axios.get(`http://localhost:5000/guru/${id}`);

    if (response.data) {
      setNama(response.data.nama);
      setNIP(response.data.NIP);
      setThnMasuk(response.data.thnMasuk);
      setJenis_kelamin(response.data.jenis_kelamin);
      setTtl(response.data.ttl);
      setAgama(response.data.agama);
      setAlamat(response.data.alamat);
      setNoHP(response.data.noHP);
      setFile(response.data.file.filePath);
    } else {
      console.log("Data tidak ditemukan");
    }
  };

  return (
    <div>
      <div className="fixed left-0 top-0 z-[1055] h-full w-full bg-black bg-opacity-20 flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Tambah Guru</h2>
          <form onSubmit={simpanData} className="">
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
              </div>
              <div className="ml-4 w-1/2">
                <div className="mb-4 ">
                  <label className="flex mb-2">
                    Tempat Tanggal Lahir: <p className="text-red-500 ml-2">*</p>
                  </label>
                  <input
                    type="text"
                    name="ttl"
                    placeholder="Tempat Lahir"
                    value={ttl}
                    onChange={(e) => setTtl(e.target.value)}
                    className="block border border-gray-300 p-2 rounded-md w-full"
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
            <div className="flex justify-start">
              <Link
                to="/datadiri"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex justify-center mx-3"
              >
                Tutup
              </Link>
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
    </div>
  );
};

export default UpdateDataDiri;
