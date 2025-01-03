import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { parseAndFormatDateString } from "../utils/helper";

const Pengajuan = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State untuk mengontrol visibilitas modal
  const [keterangan, setKeterangan] = useState("");
  const [jenis, setJenis] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [file, setFile] = useState("");
  const [searchQuery4, setSearchQuery4] = useState("");
  const id_user = user && user.id_guru;

  const [pengajuans, setPengajuan] = useState([]);
  const [valids, setValid] = useState([]);
  const getPengajuan = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/pengajuan/${id}`);
      setPengajuan(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getValid = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pengajuan`);
      setValid(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPengajuan(id_user);
    getValid();
  }, [id_user]);

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

  let year = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(year);
  const updateYear = () => {
    let year = new Date().getFullYear();
    setCurrentYear(year);
  };
  setInterval(updateYear, 1000);

  const isThisMonth = (someDate) => {
    const month = new Date();
    return (
      someDate.getMonth() === month.getMonth() &&
      someDate.getFullYear() === month.getFullYear()
    );
  };

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const loadFile = (e) => {
    const selectFile = e.target.files[0];
    setFile(selectFile);
  };

  const AddPengajuan = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("keterangan", keterangan);
    formData.append("jenis", jenis);
    formData.append("tanggal", tanggal);
    formData.append("id_guru", id_user);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/pengajuan", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      closeModal();
      setFile("");
      setTanggal("");
      setJenis("");
      setKeterangan("");
      getPengajuan(id_user);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredValids = valids.filter((item) => {
    return (
      item.Guru.nama.toLowerCase().includes(searchQuery4.toLowerCase()) ||
      item.tanggal.toLowerCase().includes(searchQuery4.toLowerCase()) ||
      item.jenis.toLowerCase().includes(searchQuery4.toLowerCase()) ||
      item.validasi.toLowerCase().includes(searchQuery4.toLowerCase())
    );
  });

  const handleSearchChange4 = (e) => {
    setSearchQuery4(e.target.value);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const Validasi = async (id) => {
    const validasiPengajuan = "Sudah Divalidasi";
    try {
      await axios.patch(`http://localhost:5000/pengajuan/${id}`, {
        validasi: validasiPengajuan,
      });
      getValid();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between pr-5">
        <h1 className="my-4  text-2xl font-bold">Pengajuan</h1>
        <h1 className="text-lg font-bold">{currentYear} Genap</h1>
      </div>
      {user && user.role === "Guru" && (
        <div>
          <div className="flex justify-between">
            <div></div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white inline-block border mb-2 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              onClick={openModal}
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              Tambah Pengajuan
            </button>
          </div>
          {showModal && (
            <div className="fixed left-0 top-0 z-[1055] h-full w-full bg-black bg-opacity-20 flex justify-center items-center">
              <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-xl font-bold mb-4">Tambah Pengajuan</h2>
                <form onSubmit={AddPengajuan}>
                  <div className="mb-4">
                    <label className="block mb-2">Jenis Pengajuan:</label>
                    <select
                      value={jenis}
                      onChange={(e) => setJenis(e.target.value)}
                      className="block border border-gray-300 p-2 rounded-md w-full"
                    >
                      <option value="" disabled hidden>
                        Pilih Pengajuan
                      </option>
                      <option value="Sakit">Sakit</option>
                      <option value="Izin Khusus">Izin Khusus</option>
                      <option value="Cuti">Cuti</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Keterangan:</label>
                    <textarea
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                      className="block border border-gray-300 p-2 rounded-md w-full"
                      rows={4}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Tanggal:</label>
                    <input
                      type="date"
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                      className="block border border-gray-300 p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">File:</label>
                    <input
                      type="file"
                      onChange={loadFile}
                      className="block border border-gray-300 p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal} // Panggil fungsi closeModal saat tombol diklik
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Ajukan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {pengajuans.map((pengajuan) => {
            const createdAt = new Date(pengajuan.createdAt);
            if (isToday(createdAt)) {
              return (
                <div
                  key={pengajuan && pengajuan.id_pengajuan}
                  className="border mb-3 p-3"
                >
                  <div className="flex justify-between items-center">
                    <h1>{pengajuan && pengajuan.jenis}</h1>
                    <h1 className="">{pengajuan && pengajuan.validasi}</h1>
                  </div>
                  <h1>{pengajuan && pengajuan.keterangan}</h1>
                  <div className="flex justify-between items-center">
                    <h1>
                      {getDayName(pengajuan && pengajuan.tanggal)} {", "}
                      {pengajuan && parseAndFormatDateString(pengajuan.tanggal)}
                    </h1>
                    <Link to={pengajuan && pengajuan.url}>Lihat</Link>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
      {user && user.role !== "Guru" && (
        <div className="">
          <input
            type="text"
            placeholder="Cari pengajuan"
            value={searchQuery4}
            onChange={handleSearchChange4}
            className="block border border-gray-300 px-2 py-1 mb-2 rounded-md w-full ml-1"
          />
          <table className="border border-slate-600 w-full my-2">
            <thead>
              <tr>
                <th className="border border-slate-700 text-center bg-blue-400 py-2">
                  No.
                </th>
                <th className="border border-slate-700 text-center bg-blue-400 py-2">
                  Hari/Tanggal
                </th>
                <th className="border border-slate-700 text-center bg-blue-400 py-2">
                  Nama
                </th>
                <th className="border border-slate-700 text-center bg-blue-400 py-2">
                  Tipe
                </th>
                <th className="border border-slate-700 text-center bg-blue-400 py-2">
                  Keterangan
                </th>
                <th className="border border-slate-700 text-center bg-blue-400 py-2">
                  File Pengajuan
                </th>
                <th className="border border-slate-700 text-center bg-blue-400 py-2">
                  Validasi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredValids
                .sort((a, b) => a.validasi.localeCompare(b.validasi))
                .map((items, index) => (
                  <tr key={items && items.id_pengajuan}>
                    <td className=" text-right pr-2 border-slate-700 border px-3 py-2">
                      {index + 1}.
                    </td>
                    <td className=" text-justify border-slate-700 border px-3 py-2">
                      {getDayName(items && items.tanggal)} {", "}
                      {items && parseAndFormatDateString(items.tanggal)}
                    </td>
                    <td className=" text-justify border-slate-700 border px-3 py-2">
                      {items && items.Guru && items.Guru.nama}
                    </td>
                    <td className=" text-justify border-slate-700 border px-3 py-2">
                      {items && items.jenis}
                    </td>
                    <td className=" text-justify border-slate-700 border px-3 py-2">
                      {items && items.keterangan}
                    </td>
                    <td className=" border-slate-700 border px-3 py-2">
                      <Link
                        className="p-2 border flex justify-center  hover:bg-blue-500 active:bg-blue-600 hover:text-white"
                        to={items && items.url}
                      >
                        Lihat
                      </Link>
                    </td>
                    <td className=" border-slate-700 border px-3 py-2">
                      {items && items.validasi === "Belum Divalidasi" && (
                        <button
                          className="p-2 border flex justify-center w-full hover:bg-blue-500 active:bg-blue-600 hover:text-white"
                          onClick={() => Validasi(items && items.id_pengajuan)}
                        >
                          Belum divalidasi
                        </button>
                      )}
                      {items && items.validasi === "Sudah Divalidasi" && (
                        <h1 className="p-2 border w-full text-center bg-green-500 text-white">
                          Sudah Divalidasi
                        </h1>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Pengajuan;
