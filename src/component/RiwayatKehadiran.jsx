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
  const [pengajuans, setPengajuan] = useState([]);
  const [pengajuansGuru, setPengajuanbyGuru] = useState([]);
  const [valids, setValid] = useState([]);
  const [kehadiran, setKehadiran] = useState([]);
  const [kehadiranGuru, setKehadiranGuru] = useState([]);
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
      const response = await axios.get("http://localhost:5000/kehadiran/");
      setKehadiran(response.data);
    } catch (error) {}
  };
  const getKehadiranGuru = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/kehadiran/${id}`);
      setKehadiranGuru(response.data);
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

  const getValid = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pengajuan`);
      setValid(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const [selectedOption, setSelectedOption] = useState(null);

  const getPengajuan = async (id) => {
    try {
      const response = await axios.get("http://localhost:5000/pengajuan");
      setPengajuan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPengajuanbyGuru = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/pengajuan/${id}`);
      setPengajuanbyGuru(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const countPengajuan = (pengajuansGuru, tipe) => {
    return pengajuansGuru.filter(
      (pengajuansGuru) => pengajuansGuru.jenis === tipe
    ).length;
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  let keterangan;
  if (kehadiran.masuk <= 7 * 60 * 60 * 1000) {
    keterangan = "Tepat Waktu";
  } else {
    keterangan = "Terlambat";
  }

  useEffect(() => {
    getGuru();
    getKepsek();
    getPengajuan();
    getPengajuanbyGuru(idUser);
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
                                <td className="border border-slate-600 text-center">
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
            )}

            {selectedOption === "bulananG" && (
              <div className="mb-4">
                <div className="border-2 border-blue-600 drop-shadow-xl w-[80px] ml-[110px] mb-4 mt-1 transition-opacity"></div>

                {/* <table className="border-collapse border-slate-400 border w-full text-left ">
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
                  {guru.map((item, index) => {
                    const createdAt = new Date(item.createdAt);
                    if (isThisMonth(createdAt)) {
                      return (
                        <tr key={item && item.Guru && item.Guru.id_guru}>
                          <td className="border border-slate-600 text-right pr-2 h-10">
                            {index + 1}.
                          </td>
                          <td className="border border-slate-600 text-justify pl-3">
                            {item && item.nama}
                          </td>
                          <td className="border border-slate-600 text-center "></td>
                          <td className="border border-slate-600 text-center ">
                            {countPengajuan(pengajuansGuru, "Sakit")}
                          </td>
                          <td className="border border-slate-600 text-center">
                            {countPengajuan(pengajuansGuru, "Izin Khusus")}
                          </td>
                          <td className="border border-slate-600 text-center">
                            {countPengajuan(pengajuansGuru, "Cuti")}
                          </td>
                          <td className="border border-slate-600 text-center"></td>
                          <td className="border border-slate-600 text-center"></td>
                          <td className="border border-slate-600 text-center"></td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table> */}
                <div className="flex justify-evenly">
                  <div className="mr-2">
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
                        {kehadiran
                          .filter((item) => item.Guru.id_guru === idUser)
                          .map((item, index) => {
                            const createdAt = new Date(item.createdAt);
                            if (isThisMonth(createdAt)) {
                              return (
                                <tr
                                  key={item && item.Guru && item.Guru.id_guru}
                                >
                                  <td className="border border-slate-600 text-right px-3 h-10">
                                    {index + 1}.
                                  </td>
                                  <td className=" text-justify border-slate-700 border px-3 py-2">
                                    {getDayName(item && item.createdAt)}
                                    {", "}
                                    {item &&
                                      parseAndFormatDateString(item.createdAt)}
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
                  <div className="ml-2">
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
                        {pengajuansGuru.map((pengajuansGuru, index) => (
                          <tr key={pengajuansGuru && pengajuansGuru.id_guru}>
                            <td className=" text-right pr-2 border-slate-700 border px-3 py-2">
                              {index + 1}.
                            </td>
                            <td className=" text-justify border-slate-700 border px-3 py-2">
                              {getDayName(
                                pengajuansGuru && pengajuansGuru.tanggal
                              )}{" "}
                              {", "}
                              {pengajuansGuru && pengajuansGuru.tanggal}
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

              {/* <button
                onClick={() => handleOptionChange("mingguanAK")}
                className="flex border border-slate-600 mr-2 py-1 px-3 rounded-2xl items-center hover:bg-blue-500 active:bg-blue-600 hover:text-white"
              >
                <p className="">Mingguan</p>
              </button> */}

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
                          <tr key={item && item.kehadiran}>
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
            )}

            {/* {selectedOption === "mingguanAK" && (
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
            )} */}
            {selectedOption === "bulananAK" && (
              <div className="mb-4">
                <div className="border-2 border-blue-600 drop-shadow-xl w-[80px] ml-[87px] mb-4 mt-1 transition-opacity"></div>

                {/* <table className="border-collapse border-slate-400 border w-full text-left ">
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
                    {guru.map((item, index) => {
                      const createdAt = new Date(item.createdAt);
                      if (isThisMonth(createdAt)) {
                        return (
                          <tr key={item && item.Guru && item.Guru.id_guru}>
                            <td className="border border-slate-600 text-right pr-2 h-10">
                              {index + 1}.
                            </td>
                            <td className="border border-slate-600 text-justify pl-3">
                              {item && item.nama}
                            </td>
                            <td className="border border-slate-600 text-center "></td>
                            <td className="border border-slate-600 text-center ">
                              {countPengajuan(pengajuansGuru, "Sakit")}
                            </td>
                            <td className="border border-slate-600 text-center">
                              {countPengajuan(pengajuansGuru, "Izin Khusus")}
                            </td>
                            <td className="border border-slate-600 text-center">
                              {countPengajuan(pengajuansGuru, "Cuti")}
                            </td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                            <td className="border border-slate-600 text-center"></td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table> */}
                <div className="flex justify-evenly">
                  <div className="mr-2">
                    <table className="border-collapse border-slate-400 border w-full text-left ">
                      <thead className="">
                        <tr>
                          <th className="border border-slate-700 text-center bg-blue-400  h-10">
                            No.
                          </th>
                          <th className="border border-slate-700 text-center bg-blue-400 py-2">
                            Hari/Tanggal
                          </th>
                          <th className="border border-slate-700 text-center bg-blue-400">
                            Nama Guru
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
                        {kehadiran.map((item, index) => {
                          const createdAt = new Date(item.createdAt);
                          if (isThisMonth(createdAt)) {
                            return (
                              <tr key={item && item.kehadiran}>
                                <td className="border border-slate-600 text-right px-3 h-10">
                                  {index + 1}.
                                </td>
                                <td className=" text-justify border-slate-700 border px-3 py-2">
                                  {getDayName(item && item.createdAt)}
                                  {", "}
                                  {item &&
                                    parseAndFormatDateString(item.createdAt)}
                                </td>
                                <td className="border border-slate-600 text-justify px-3">
                                  {item && item.Guru && item.Guru.nama}
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
                  <div className="ml-2">
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
                            Nama
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
                        {pengajuans.map((pengajuan, index) => (
                          <tr key={pengajuan && pengajuan.id_pengajuan}>
                            <td className=" text-right pr-2 border-slate-700 border px-3 py-2">
                              {index + 1}.
                            </td>
                            <td className=" text-justify border-slate-700 border px-3 py-2">
                              {getDayName(pengajuan && pengajuan.tanggal)}{" "}
                              {", "}
                              {pengajuan && pengajuan.tanggal}
                            </td>
                            <td className=" text-justify border-slate-700 border px-3 py-2">
                              {pengajuan &&
                                pengajuan.Guru &&
                                pengajuan.Guru.nama}
                            </td>
                            <td className=" text-justify border-slate-700 border px-3 py-2">
                              {pengajuan && pengajuan.jenis}
                            </td>
                            <td className=" text-justify border-slate-700 border px-3 py-2">
                              {pengajuan && pengajuan.validasi}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatKehadiran;
