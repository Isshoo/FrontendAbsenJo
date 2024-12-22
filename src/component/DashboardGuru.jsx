import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi2";
import axios from "axios";
import { Link } from "react-router-dom";
import { parseAndFormatDateString } from "../utils/helper";

const DashboardGuru = () => {
  const { user } = useSelector((state) => state.auth);

  const nama = user && user.nama;
  const sisaCuti = user && user.sisaCuti;
  const [piket, setPiket] = useState([]);

  const idUser = (user && user.id_guru) || (user && user.id_kepsek);
  const [guru, setGuru] = useState([]);
  const [kepsek, setKepsek] = useState([]);
  const [kehadiran, setKehadiran] = useState([]);
  const getGuru = async () => {
    const response = await axios.get("http://localhost:5000/guru");
    setGuru(response.data);
  };
  const getKepsek = async () => {
    const response = await axios.get("http://localhost:5000/kepsek");
    setKepsek(response.data);
  };
  const getKehadiran = async (id) => {
    try {
      const response = await axios.get("http://localhost:5000/kehadiran");
      setKehadiran(response.data);
    } catch (error) {}
  };
  const getPiket = async () => {
    const response = await axios.get("http://localhost:5000/piket");
    setPiket(response.data);
  };
  const extractTime = (masuk) => {
    const jam = masuk.slice(8, 10);
    const menit = masuk.slice(10, 12);
    return `${jam}:${menit}`;
  };
  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const isThisWeek = (someDate) => {
    const week = new Date();
    return (
      someDate.getDate() === week.getDate() &&
      someDate.getWeek() === week.getWeek() &&
      someDate.getMonth() === week.getMonth() &&
      someDate.getFullYear() === week.getFullYear()
    );
  };

  const isThisMonth = (someDate) => {
    const month = new Date();
    return (
      someDate.getMonth() === month.getMonth() &&
      someDate.getFullYear() === month.getFullYear()
    );
  };

  useEffect(() => {
    getGuru();
    getKepsek();
    getPiketbyId();
    getKehadiran(idUser);
  }, [idUser]);

  let year = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(year);
  const updateYear = () => {
    let year = new Date().getFullYear();
    setCurrentYear(year);
  };
  setInterval(updateYear, 1000);

  let date = new Date().getDate();
  const [currentDate, setCurrentDate] = useState(date);

  const updateDate = () => {
    let date = new Date().getDate();
    setCurrentDate(date);
  };
  setInterval(updateDate, 1000);

  let day = new Date().getDay();
  const [currentDay, setCurrentDay] = useState(day);
  const updateDay = () => {
    let day = new Date().getDay();
    setCurrentDay(day);
  };
  setInterval(updateDay, 1000);

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

  function getNamaHari(hari) {
    const hariDalamSeminggu = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return hariDalamSeminggu[hari];
  }

  const hari = currentDay;
  const namaHari = getNamaHari(hari);

  let month = new Date().getMonth();
  const [currentMonth, setCurrentMonth] = useState(month);
  const updateMonth = () => {
    let month = new Date().getMonth();
    setCurrentMonth(month);
  };
  setInterval(updateMonth, 1000);

  function getNamaBulan(bulan) {
    const bulanDalamSetahun = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return bulanDalamSetahun[bulan];
  }

  function extractDay(date) {
    const day = date.getDay();
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return days[day];
  }

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const bulan = currentMonth;
  const namaBulan = getNamaBulan(bulan);

  const getPiketbyId = async (id) => {
    const response = await axios.get("http://localhost:5000/piket");
    setPiket(response.data);
  };

  let keterangan;
  if (kehadiran.Masuk <= 7 * 60 * 60 * 1000) {
    keterangan = "Tepat Waktu";
  } else {
    keterangan = "Terlambat";
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center pr-5">
          <h1 className="my-4 text-2xl font-bold">Dashboard</h1>

          <h1 className="text-lg font-bold">{currentYear} Genap</h1>
        </div>
      </div>

      {user && user.role === "Guru" && (
        <div>
          <div className="bg-blue-100 h-screen flex flex-col">
            <div className="flex justify-between items-center  px-4 py-4 bg-blue-500 text-white">
              <div>
                <h1 className="text-2xl font-bold">Hallo {nama}</h1>
                <p className="text-sm">Selamat datang di website AbsenJo</p>
              </div>
              <div>
                <p className="text-sm">{namaHari}</p>
                <p className="text-sm">
                  {currentDate} {namaBulan}
                </p>
              </div>
            </div>
            <div className=" flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-96 px-4 py-2">
                <h2 className="text-lg font-bold mb-2">Notifikasi</h2>
                <ul className="list-disc list-inside">
                  <li>
                    Tidak akan hadir hari ini? <br />
                    <Link
                      to="/pengajuan"
                      className="text-blue-400 text-sm ml-6"
                    >
                      Buat Pengajuan
                    </Link>
                  </li>
                  <br />
                  <li>
                    Jangan lupa mengisi kehadiran <br />
                    <Link
                      to="/isidaftarhadir"
                      className="text-blue-400 text-sm ml-6"
                    >
                      Daftar Hadir
                    </Link>
                  </li>
                  <br />
                  <li>Jumlah cuti anda tersisa {sisaCuti} kali</li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 h-96 px-4 py-2">
                <h2 className="text-lg font-bold mb-2">Kalender</h2>
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=en.indonesian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FManado"
                  style={{ border: "0", width: "100%", height: "300px" }}
                  title="Kalender"
                ></iframe>
              </div>
            </div>
            <div className="px-4 ">
              <h2 className="text-lg font-bold mb-2">Jadwal Piket</h2>
              <div>
                <table className="border-collapse border w-full text-left mt-4">
                  <thead>
                    <tr>
                      <th className="border border-gray-700 text-center bg-blue-400 h-10">
                        No.
                      </th>
                      <th className="border border-gray-700 text-center bg-blue-400">
                        Hari dan Tanggal
                      </th>
                      <th className="border border-gray-700 text-center bg-blue-400">
                        Guru yang Bertugas
                      </th>
                      <th className="border border-gray-700 text-center bg-blue-400">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {piket.map((item, index) => (
                      <tr key={item && item.id_piket}>
                        <td className="border border-gray-600 text-center h-10">
                          {index + 1}
                        </td>
                        <td className="border border-gray-600 text-center">
                          {getDayName(item && item.tanggal)} {", "}
                          {item && item.tanggal}
                        </td>
                        <td className="border border-gray-600 text-center">
                          {item && item.Guru && item.Guru.nama}
                        </td>
                        <td className="border border-gray-600 text-center">
                          {item && item.keterangan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && user.role === "Kepsek" && (
        <div>
          <div className="bg-blue-100 h-screen flex flex-col">
            <div className="flex justify-between items-center  px-4 py-4 bg-blue-500 text-white">
              <div>
                <h1 className="text-2xl font-bold">Hallo {nama}</h1>
                <p className="text-sm">Selamat datang di website AbsenJo</p>
              </div>
              <div>
                <p className="text-sm">{namaHari}</p>
                <p className="text-sm">
                  {currentDate} {namaBulan}
                </p>
              </div>
            </div>
            <div className=" flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-96 px-4 py-2">
                <h2 className="text-lg font-bold mb-2">Notifikasi</h2>
                <ul className="list-disc list-inside">
                  <li>
                    Cek jika ada pengajuan yang belum di validasi <br />
                    <Link
                      to="/pengajuan"
                      className="text-blue-400 text-sm ml-6"
                    >
                      Lihat daftar pengajuan
                    </Link>
                  </li>
                  <br />
                  <li>
                    ingin melihat data detail guru? <br />
                    <Link
                      to="/datagurustaf"
                      className="text-blue-400 text-sm ml-6"
                    >
                      Daftar Guru
                    </Link>
                  </li>
                  <br />
                  {piket.map((item, index) => (
                    <li>
                      Piket hari ini : {item && item.Guru && item.Guru.nama}
                      <br />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2 h-96 px-4 py-2">
                <h2 className="text-lg font-bold mb-2">Kalender</h2>
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=en.indonesian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FManado"
                  style={{ border: "0", width: "100%", height: "300px" }}
                  title="Kalender"
                ></iframe>
              </div>
            </div>
            <div className="px-4 ">
              <h2 className="text-lg font-bold mb-2">Kehadiran Hari ini</h2>
              <div className="">
                <table className="border-collapse border-slate-400 border w-full text-left">
                  <thead className="">
                    <tr>
                      <th className="border border-slate-700 text-center bg-blue-400 w-16">
                        No.
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400">
                        Nama Guru
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-36">
                        Masuk
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-36">
                        Keluar
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-52">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {kehadiran.map((item, index) => {
                      const createdAt = new Date(item.createdAt);
                      if (isToday(createdAt)) {
                        return (
                          <tr key={item && item.kehadiran}>
                            <td className="border border-slate-600 text-right pr-2">
                              {index + 1}.
                            </td>
                            <td className="border border-slate-600 text-center">
                              {item && item.Guru && item.Guru.nama}
                            </td>
                            <td className="border border-slate-600 text-center ">
                              {item && extractTime(item.masuk)}
                            </td>
                            <td className="border border-slate-600 text-center ">
                              {item && extractTime(item.keluar)}
                            </td>
                            <td className="border border-slate-600 text-center">
                              {keterangan}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && user.role === "Admin" && (
        <div>
          <div className="bg-blue-100 h-screen flex flex-col">
            <div className="flex justify-between items-center  px-4 py-4 bg-blue-500 text-white">
              <div>
                <h1 className="text-2xl font-bold">Hallo {nama}</h1>
                <p className="text-sm">Selamat datang di website AbsenJo</p>
              </div>
              <div>
                <p className="text-sm">{namaHari}</p>
                <p className="text-sm">
                  {currentDate} {namaBulan}
                </p>
              </div>
            </div>
            <div className=" flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-96 px-4 py-2">
                <h2 className="text-lg font-bold mb-2">Notifikasi</h2>
                <ul className="list-disc list-inside">
                  <li>
                    Cek jika ada pengajuan yang belum di validasi <br />
                    <Link
                      to="/pengajuan"
                      className="text-blue-400 text-sm ml-6"
                    >
                      Lihat daftar pengajuan
                    </Link>
                  </li>
                  <br />
                  <li>
                    ingin melakukan perubahan dalam data guru? <br />
                    <Link
                      to="/datagurustaf"
                      className="text-blue-400 text-sm ml-6"
                    >
                      Daftar Guru
                    </Link>
                  </li>
                  <br />
                  <li>
                    Sudah membuat jadwal piket untuk minggu berikutnya? <br />
                    <Link
                      to="/jadwalpiket"
                      className="text-blue-400 text-sm ml-6"
                    >
                      Buat jadwal piket
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 h-96 px-4 py-2">
                <h2 className="text-lg font-bold mb-2">Kalender</h2>
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=en.indonesian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FManado"
                  style={{ border: "0", width: "100%", height: "300px" }}
                  title="Kalender"
                ></iframe>
              </div>
            </div>
            <div className="px-4 ">
              <h2 className="text-lg font-bold mb-2">Kehadiran Hari Ini</h2>
              <div className="">
                <table className="border-collapse border-slate-400 border w-full text-left">
                  <thead className="">
                    <tr>
                      <th className="border border-slate-700 text-center bg-blue-400 w-16">
                        No.
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400">
                        Nama Guru
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400">
                        Masuk
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400">
                        Keluar
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {kehadiran.map((item, index) => {
                      const createdAt = new Date(item.createdAt);
                      if (isToday(createdAt)) {
                        return (
                          <tr key={item && item.Guru && item.Guru.id_guru}>
                            <td className="border border-slate-600 text-center">
                              {index + 1}.
                            </td>
                            <td className="border border-slate-600 text-center">
                              {item && item.Guru && item.Guru.nama}
                            </td>
                            <td className="border border-slate-600 text-center ">
                              {item && extractTime(item.masuk)}
                            </td>
                            <td className="border border-slate-600 text-center ">
                              {item && extractTime(item.keluar)}
                            </td>
                            <td className="border border-slate-600 text-center">
                              {keterangan}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardGuru;
