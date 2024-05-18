import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi2";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardGuru = () => {
  const { user } = useSelector((state) => state.auth);
  const nama = user && user.nama;

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
      const response = await axios.get(`http://localhost:5000/kehadiran/${id}`);
      setKehadiran(response.data);
    } catch (error) {}
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

  useEffect(() => {
    getGuru();
    getKepsek();
    getKehadiran(idUser);
  }, [idUser]);

  let year = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(year);
  const updateYear = () => {
    let year = new Date().getFullYear();
    setCurrentYear(year);
  };
  setInterval(updateYear, 1000);

  let day = new Date().getDay();
  const [currentDay, setCurrentDay] = useState(day);
  const updateDay = () => {
    let day = new Date().getDay();
    setCurrentDay(day);
  };
  setInterval(updateDay, 1000);

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

  const bulan = currentMonth;
  const namaBulan = getNamaBulan(bulan);

  return (
    <div>
      <div>
        <div className="flex justify-between items-center pr-5">
          <h1 className="my-4 text-2xl font-bold">Dashboard</h1>

          <h1 className="text-lg font-bold">{currentYear} Genap</h1>
        </div>
      </div>

      {user && user.role === "Guru" && (
        <div className="bg-blue-100 h-screen flex flex-col">
          {/* Header */}
          <div className="border border-gray-500 my-5 mr-5 py-5 pb-7 px-3">
            <h1 className="text-xl mb-4">Hello {nama}!</h1>
            <h1 className="text-sm text-gray-700">
              Selamat datang di website AbsenJo
            </h1>
          </div>

          {/* Kalender */}
          <div className="border border-gray-500 my-5 mr-5 py-5 pb-7 px-3">
            <div className="flex justify-between">
              <h1 className="text-m">Kalender</h1>
              <h1 className="text-m flex items-center">
                {namaBulan} <HiChevronDown />{" "}
              </h1>
            </div>
            <div className="flex justify-evenly mt-2">
              <h1>S</h1>
              <h1>S</h1>
              <h1>R</h1>
              <h1>K</h1>
              <h1>J</h1>
              <h1>S</h1>
              <h1>M</h1>
            </div>
            <div className="flex justify-evenly mt-2">
              <h1>{currentDay - 3}</h1>
              <h1>{currentDay - 2}</h1>
              <h1>{currentDay - 1}</h1>
              <h1>{namaHari}</h1>
              <h1>{currentDay + 1}</h1>
              <h1>{currentDay + 2}</h1>
              <h1>{currentDay + 3}</h1>
            </div>
          </div>

          {/* Tabel Riwayat Kehadiran */}
          <div className="mr-5">
            <table className="border-collapse border-slate-400 border w-full text-left">
              <thead className="">
                <tr>
                  <th className="border border-slate-700 text-center bg-blue-400 w-16">
                    No.
                  </th>
                  <th className="border border-slate-700 text-center bg-blue-400">
                    Hari Tanggal
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
                      <tr key={item && item.Guru && item.Guru.id_guru}>
                        <td className="border border-slate-600 text-right pr-2">
                          {index + 1}.
                        </td>
                        <td className="border border-slate-600 text-justify pl-3"></td>
                        <td className="border border-slate-600 text-center ">
                          {item && extractTime(item.masuk)}
                        </td>
                        <td className="border border-slate-600 text-center ">
                          {item && extractTime(item.keluar)}
                        </td>
                        <td className="border border-slate-600 text-center"></td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>

          {/* Notifikasi */}
          <div className="border border-gray-500 my-5 mr-5 py-5 pb-7 px-3">
            <h1 className="text-xl mb-4">Notifikasi</h1>
            <ul className="list-disc list-inside">
              <li>Ada rapat koordinasi dengan kepala dinas pendidikan besok</li>
              <li>Ada acara perpisahan siswa kelas XII pada tanggal 30 Juni</li>
            </ul>
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
                  {currentDay} {namaBulan}
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
                    Apakah sudah mengisi daftar hadir? <br />
                    <Link
                      to="/isidaftarhadir"
                      className="text-blue-400 text-sm ml-6"
                    >
                      Daftar Hadir
                    </Link>
                  </li>
                  <br />
                  <li>
                    Piket hari ini : <br />
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 h-96 px-4 py-2">
                <h2 className="text-lg font-bold mb-2">Kalender</h2>
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=en.indonesian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FJakarta"
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
                        Hari Tanggal
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
                          <tr key={item && item.Guru && item.Guru.id_guru}>
                            <td className="border border-slate-600 text-right pr-2">
                              {index + 1}.
                            </td>
                            <td className="border border-slate-600 text-justify pl-3"></td>
                            <td className="border border-slate-600 text-center ">
                              {item && extractTime(item.masuk)}
                            </td>
                            <td className="border border-slate-600 text-center ">
                              {item && extractTime(item.keluar)}
                            </td>
                            <td className="border border-slate-600 text-center"></td>
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
          <div className="border border-gray-500 my-5 mr-5 py-5 pb-7 px-3">
            <h1 className="text-xl mb-4">Hello {nama}!</h1>
            <h1 className="text-sm text-gray-700">
              Selamat datang di website AbsenJo
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardGuru;
