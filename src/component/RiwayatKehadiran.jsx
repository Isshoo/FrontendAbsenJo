import React, { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { parseAndFormatDateString } from "../utils/helper";

const RiwayatKehadiran = () => {
  const { user } = useSelector((state) => state.auth);
  const idUser = (user && user.id_guru) || (user && user.id_kepsek);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    getGuru();
    getKepsek();
    getKehadiran(idUser);
  }, [idUser]);
  return (
    <div>
      <div className="flex items-center">
        <h1 className="my-4 text-2xl font-bold">Riwayat Kehadiran</h1>
        <div></div>
      </div>
      <div className="border border-slate-700 p-3">
        {user && user.role === "Guru" && (
          <div>
            <div className="flex justify-normal">
              <button
                onClick={() => handleOptionChange("mingguanG")}
                className="flex border border-slate-600 py-1 px-3 items-center rounded-2xl hover:bg-blue-500 active:bg-blue-600 hover:text-white mr-2"
              >
                <p className="">Mingguan</p>
              </button>

              <button
                onClick={() => handleOptionChange("bulananG")}
                className="flex border border-slate-600 py-1 px-3 items-center rounded-2xl hover:bg-blue-500 active:bg-blue-600 hover:text-white mr-2"
              >
                <p className="">Bulanan</p>
              </button>
            </div>
            {selectedOption === "mingguanG" && (
              <div>
                <div className=" mb-4">
                  <div className="border-2 border-blue-600 drop-shadow-xl w-[80px] ml-[11px] mb-4 mt-1 transition-opacity"></div>
                  <table className="border-collapse border-slate-400 border w-full text-left">
                    <thead className="">
                      <tr>
                        <th className="border border-slate-700 text-center bg-blue-400 w-16 h-10">
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
                      {kehadiran
                        .filter((item) => item.Guru.id_guru === idUser)
                        .map((item, index) => {
                          const createdAt = new Date(item.createdAt);
                          if (isToday(createdAt)) {
                            return (
                              <tr key={item && item.Guru && item.Guru.id_guru}>
                                <td className="border border-slate-600 text-right pr-2 h-10">
                                  {index + 1}.
                                </td>
                                <td className="border border-slate-600 text-justify pl-3">
                                  {getDayName(item && item.createdAt)}
                                  {", "}
                                  {item &&
                                    parseAndFormatDateString(item.createdAt)}
                                </td>
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

            {selectedOption === "bulananG" && (
              <div className="mb-4">
                <div className="border-2 border-blue-600 drop-shadow-xl w-[71px] ml-[113px]  mt-1 transition-opacity"></div>
                <div className="flex justify-between mb-2 px-14">
                  <h1 className="text-m"></h1>
                  <h1 className="text-2xl flex items-center">{namaBulan} </h1>
                </div>
                <table className="border-collapse border-slate-400 border w-full text-left ">
                  <thead className="">
                    <tr>
                      <th className="border border-slate-700 text-center bg-blue-400 w-16 h-10">
                        No.
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-72">
                        Bulan
                      </th>

                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Hadir
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Sakit
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Izin
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Cuti
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Alpa
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-36">
                        Total Kehadiran
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {kehadiran.map((item, index) => {
                      const createdAt = new Date(item.createdAt);
                      if (isToday(createdAt)) {
                        return (
                          <tr key={item && item.Guru && item.Guru.id_guru}>
                            <td className="border border-slate-600 text-right pr-2 h-10">
                              {index + 1}.
                            </td>
                            <td className="border border-slate-600 text-justify pl-3"></td>
                            <td className="border border-slate-600 text-center "></td>
                            <td className="border border-slate-600 text-center "></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {user && user.role !== "Guru" && (
          <div>
            <div className="flex justify-normal">
              <button
                onClick={() => handleOptionChange("harianAK")}
                className="flex border border-slate-600 mr-2 py-1 px-3 rounded-2xl items-center hover:bg-blue-500 active:bg-blue-600 hover:text-white"
              >
                <p className="">Harian</p>
              </button>

              <button
                onClick={() => handleOptionChange("mingguanAK")}
                className="flex border border-slate-600 mr-2 py-1 px-3 rounded-2xl items-center hover:bg-blue-500 active:bg-blue-600 hover:text-white"
              >
                <p className="">Mingguan</p>
              </button>

              <button
                onClick={() => handleOptionChange("bulananAK")}
                className="flex border border-slate-600 mr-2 py-1 px-3 items-center rounded-2xl hover:bg-blue-500 active:bg-blue-600 hover:text-white"
              >
                <p className="">Bulanan</p>
              </button>
            </div>

            {selectedOption === "harianAK" && (
              <div className=" mb-4">
                <div className="border-2 border-blue-600 drop-shadow-xl w-[60px] ml-[7px] mb-4 mt-1 transition-opacity"></div>
                <table className="border-collapse border-slate-400 border w-full text-left ">
                  <thead className="">
                    <tr>
                      <th className="border border-slate-700 text-center bg-blue-400 w-16 h-10">
                        No.
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400">
                        Nama Guru
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-48">
                        Masuk
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-48">
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
                            <td className="border border-slate-600 text-right pr-2 h-10">
                              {index + 1}.
                            </td>
                            <td className="border border-slate-600 text-justify pl-3">
                              {item && item.Guru && item.Guru.nama}
                            </td>
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
            )}

            {selectedOption === "mingguanAK" && (
              <div className=" mb-4">
                <div className="border-2 border-blue-600 drop-shadow-xl w-[80px] ml-[91px] mb-4 mt-1 transition-opacity"></div>
                <table className="border-collapse border-slate-400 border w-full text-left ">
                  <thead className="">
                    <tr>
                      <th className="border border-slate-700 text-center bg-blue-400 w-16 h-10">
                        No.
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-72">
                        Nama Guru
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Senin
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Selasa
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Rabu
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Kamis
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Jumat
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-36">
                        Total Kehadiran
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {kehadiran.map((item, index) => {
                      const createdAt = new Date(item.createdAt);
                      if (isToday(createdAt)) {
                        return (
                          <tr key={item && item.Guru && item.Guru.id_guru}>
                            <td className="border border-slate-600 text-right pr-2 h-10">
                              {index + 1}.
                            </td>
                            <td className="border border-slate-600 text-justify pl-3"></td>
                            <td className="border border-slate-600 text-center "></td>
                            <td className="border border-slate-600 text-center "></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {selectedOption === "bulananAK" && (
              <div className="mb-4">
                <div className="border-2 border-blue-600 drop-shadow-xl w-[70px] ml-[194px]  mt-1 transition-opacity"></div>
                <div className="flex justify-between px-14 mb-2">
                  <h1 className="text-m"></h1>
                  <h1 className="text-2xl flex items-center">{namaBulan}</h1>
                </div>
                <table className="border-collapse border-slate-400 border w-full text-left ">
                  <thead className="">
                    <tr>
                      <th className="border border-slate-700 text-center bg-blue-400 w-16 h-10">
                        No.
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-72">
                        Nama Guru
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Hadir
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Sakit
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Izin
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Cuti
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-24">
                        Alpa
                      </th>
                      <th className="border border-slate-700 text-center bg-blue-400 w-36">
                        Total Kehadiran
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {kehadiran.map((item, index) => {
                      const createdAt = new Date(item.createdAt);
                      if (isToday(createdAt)) {
                        return (
                          <tr key={item && item.Guru && item.Guru.id_guru}>
                            <td className="border border-slate-600 text-right pr-2 h-10">
                              {index + 1}.
                            </td>
                            <td className="border border-slate-600 text-justify pl-3"></td>
                            <td className="border border-slate-600 text-center "></td>
                            <td className="border border-slate-600 text-center "></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatKehadiran;
