import React, { useState, useEffect } from "react";
import axios from "axios";

const JadwalPiket = () => {
  const [jadwalPiket, setJadwalPiket] = useState([]);
  const [formData, setFormData] = useState({
    id_guru: "",
    tanggal: "",
    keterangan: "",
  });
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
  }, []);

  const createPiket = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/piket", data);
      setJadwalPiket([...jadwalPiket, response.data]);
    } catch (error) {
      console.error("Error creating piket:", error);
    }
  };

  const handleCreatePiket = async (e) => {
    e.preventDefault();
    try {
      await createPiket(formData);
      setFormData({
        id_guru: "",
        tanggal: "",
        keterangan: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          onClick={handleToggleForm}
        >
          Atur Jadwal Piket
        </button>
        <div></div>
      </div>

      {showForm && (
        <div>
          <form onSubmit={handleCreatePiket}>
            <select
              name="id_guru"
              value={formData.id_guru}
              onChange={handleChange}
              className="block border border-gray-300 p-2 rounded-md w-full"
            >
              <option value="" disabled hidden>
                Pilih Guru
              </option>
              {guruList.map((guru) => (
                <option key={guru.id} value={guru.id}>
                  {guru.nama}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="block border border-gray-300 p-2 rounded-md w-full"
            />
            <input
              type="text"
              name="keterangan"
              placeholder="Keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              className="block border border-gray-300 p-2 rounded-md w-full"
            />
            <div className="flex justify-between">
              <div></div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Tambahkan
              </button>
            </div>
          </form>
        </div>
      )}

      {jadwalPiket.length > 0 ? (
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
            {jadwalPiket.map((item, index) => (
              <tr key={item.id_piket}>
                <td className="border border-gray-600 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-600 text-center">
                  {item.tanggal}
                </td>
                <td className="border border-gray-600 text-center">
                  {item.id_guru}
                </td>
                <td className="border border-gray-600 text-center">
                  {item.keterangan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Tidak ada jadwal piket yang tersedia.</p>
      )}
    </div>
  );
};

export default JadwalPiket;
