import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const JadwalPiket = () => {
  const [tanggal, setTanggal] = useState("");
  const [id_guru, setId_guru] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [piket, setPiket] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [guruList, setGuruList] = useState([]);

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

  const createPiket = async () => {
    try {
      await axios.post(`http://localhost:5000/piket`, {
        id_guru: id_guru,
        tanggal: tanggal,
        keterangan: keterangan,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getPiket = async () => {
    const response = await axios.get("http://localhost:5000/piket");
    setPiket(response.data);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <div className="flex items-center">
        <h1 className="my-4 text-xl">Jadwal Piket</h1>
      </div>
      <div className="flex justify-between pb-5 w-full">
        <button
          onClick={handleToggleForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
          Atur Jadwal Piket
        </button>
        <div></div>
      </div>

      {showForm && (
        <div>
          <form onSubmit={createPiket}>
            <select
              name="id_guru"
              value={id_guru}
              onChange={(e) => setId_guru(e.target.value)}
              className="block border border-gray-300 p-2 rounded-md w-full"
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
              className="block border border-gray-300 p-2 rounded-md w-full"
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
      <div>
        <table className="border-collapse border w-full text-left mt-4">
          <thead>
            <tr>
              <th className="border border-gray-700 text-center bg-gray-400">
                No.
              </th>
              <th className="border border-gray-700 text-center bg-gray-400">
                Hari dan Tanggal
              </th>
              <th className="border border-gray-700 text-center bg-gray-400">
                Guru yang Bertugas
              </th>
              <th className="border border-gray-700 text-center bg-gray-400">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody>
            {piket.map((item, index) => (
              <tr key={item && item.id_piket}>
                <td className="border border-gray-600 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-600 text-center">
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
  );
};

export default JadwalPiket;
