import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { parseAndFormatDateString } from "../utils/helper";

const JadwalPiket = () => {
  const { user } = useSelector((state) => state.auth);
  const [tanggal, setTanggal] = useState("");
  const [id_guru, setId_guru] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [piket, setPiket] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [guruList, setGuruList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchGuruList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/guru");
        setGuruList(response.data);
      } catch (error) {
        console.error("Error fetching guru list:", error);
      }
    };

    fetchGuruList();
    getPiket();
  }, []);

  const createPiket = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id_guru", id_guru);
    formData.append("tanggal", tanggal);
    formData.append("keterangan", keterangan);

    try {
      await axios.post("http://localhost:5000/piket", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setId_guru("");
      setTanggal("");
      setKeterangan("");

      getPiket();
    } catch (error) {
      console.log(error);
    }
  };

  const getPiket = async () => {
    const response = await axios.get("http://localhost:5000/piket");
    setPiket(response.data);
  };

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

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const filteredPiket = piket.filter((item) => {
    return (
      item.tanggal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Guru.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keterangan.includes(searchQuery)
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-between pr-5">
        <h1 className="my-4 text-2xl font-bold">Jadwal Piket</h1>
        <h1 className="text-lg font-bold">{currentYear} Genap</h1>
      </div>

      {user && user.role === "Admin" && (
        <div className="flex justify-between pb-1 w-full mb-3">
          <button
            onClick={handleToggleForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Atur Jadwal Piket
          </button>
          <div></div>
        </div>
      )}

      {showForm && (
        <div>
          <form onSubmit={createPiket}>
            <select
              name="id_guru"
              value={id_guru}
              onChange={(e) => setId_guru(e.target.value)}
              className="block border border-gray-300 p-2 rounded-md w-full mb-2"
            >
              <option value="" disabled hidden>
                Pilih Guru
              </option>
              {guruList.map((guru) => (
                <option key={guru.id_guru} value={guru.id_guru}>
                  {guru.nama}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="tanggal"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="block border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <input
              type="text"
              name="keterangan"
              placeholder="keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="block border border-gray-300 p-2 rounded-md w-full"
            />
            <div className="flex justify-between">
              <div></div>
              <button
                type="Submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Tambahkan
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Cari guru..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="block border border-gray-300 px-2 py-1 rounded-md w-full"
        />
      </div>
      <div>
        <table className="border-collapse border w-full text-left mt-2">
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
            {filteredPiket.map((item, index) => {
              const createdAt = new Date(item.createdAt);
              if (isThisMonth(createdAt)) {
                return (
                  <tr key={item && item.id_piket}>
                    <td className="border border-gray-600 text-center h-10">
                      {index + 1}
                    </td>
                    <td className="border border-gray-600 text-center">
                      {getDayName(item && item.tanggal)} {", "}
                      {item && parseAndFormatDateString(item.tanggal)}
                    </td>
                    <td className="border border-gray-600 text-center">
                      {item && item.Guru && item.Guru.nama}
                    </td>
                    <td className="border border-gray-600 text-center">
                      {item && item.keterangan}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JadwalPiket;
