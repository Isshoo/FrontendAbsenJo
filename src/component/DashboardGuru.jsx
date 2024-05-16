import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi2";
import axios from "axios";

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
    const hariDalamSeminggu = ["M", "S", "S", "R", "K", "J", "S"];
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
          <h1 className="my-4 text-xl">Dashboard</h1>

          <h1 className="text-lg ">{currentYear} Genap</h1>
        </div>
      </div>

      {user && user.role === "Guru" && (
        <div>
          <div className="border border-gray-500 my-5 mr-5 py-5 pb-7 px-3">
            <h1 className="text-xl mb-4">Hello {nama}!</h1>
            <h1 className="text-sm text-gray-700">
              Selamat datang di website AbsenJo
            </h1>
          </div>

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

          <div>
            <div className="border border-gray-500 my-5 mr-5 py-5 pb-7 px-3"></div>
          </div>

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
        </div>
      )}
      {user && user.role === "Kepsek" && (
        <div>
          <div className="border border-gray-500 my-5 mr-5 py-5 pb-7 px-3">
            <h1 className="text-xl mb-4">Hello {nama}!</h1>
            <h1 className="text-sm text-gray-700">
              Selamat datang di website AbsenJo
            </h1>
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
