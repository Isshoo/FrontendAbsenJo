import React, { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import axios from "axios";
import { useSelector } from "react-redux";

const RiwayatKehadiran = () => {
  const { user } = useSelector((state) => state.auth);
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
  return (
    <div>
      <div className="flex items-center">
        <h1 className="my-4 text-xl">Riwayat Kehadiran</h1>
        <div></div>
      </div>
      <div className="border border-slate-700 p-3">
        <button className="flex border border-slate-600 py-1 px-3 items-center">
          {" "}
          <p className="mr-2">Hari ini</p> <HiChevronDown />
        </button>
        <div className="mt-2">
          <table className="border-collapse border-slate-400 border w-full text-left ">
            <thead className="">
              <tr>
                <th className="border border-slate-700 text-center bg-slate-400">
                  No.
                </th>
                <th className="border border-slate-700 text-center bg-slate-400">
                  NIP
                </th>
                <th className="border border-slate-700 text-center bg-slate-400">
                  Nama Guru
                </th>
                <th className="border border-slate-700 text-center bg-slate-400">
                  Masuk
                </th>
                <th className="border border-slate-700 text-center bg-slate-400">
                  Keluar
                </th>
                <th className="border border-slate-700 text-center bg-slate-400">
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
                      <td className="border border-slate-600 text-justify pl-2">
                        {item && item.Guru && item.Guru.NIP}
                      </td>
                      <td className="border border-slate-600 text-justify pl-2">
                        {item && item.Guru && item.Guru.nama}
                      </td>
                      <td className="border border-slate-600 text-justify pl-2">
                        {item && extractTime(item.masuk)}
                      </td>
                      <td className="border border-slate-600 text-justify pl-2">
                        {item && extractTime(item.keluar)}
                      </td>
                      <td className="border border-slate-600 text-justify pl-2"></td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiwayatKehadiran;
