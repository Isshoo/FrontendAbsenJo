import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";

const IsiDaftarHadir = () => {
  const { user } = useSelector((state) => state.auth);
  const [keluarData, setKeluarData] = useState(null); // Menyimpan data keluar dari server
  const [lastInputDate, setLastInputDate] = useState(null); // Menyimpan tanggal terakhir penginputan data masuk dan keluar
  const id_user = user && (user.id_guru || user.id_kepsek);

  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);

  let date = new Date().getDate();
  const [currentDate, setCurrentDate] = useState(date);

  const updateDate = () => {
    let date = new Date().getDate();
    setCurrentDate(date);
  };
  setInterval(updateDate, 1000);

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

  const extractTime = (masuk) => {
    const jam = masuk.slice(8, 10);
    const menit = masuk.slice(10, 12);
    return `${jam}:${menit}`;
  };

  const Hadir = async () => {
    if (
      lastInputDate &&
      lastInputDate.getFullYear() === new Date().getFullYear() &&
      lastInputDate.getMonth() === new Date().getMonth() &&
      lastInputDate.getDate() === new Date().getDate()
    ) {
      alert("Anda hanya dapat menginput data masuk dan keluar sehari sekali.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/kehadiran/", {
        id_guru: id_user,
        id_kepsek: id_user,
      });
      console.log("Hadir berhasil");
      getKeluar(id_user);
      setLastInputDate(new Date());
    } catch (error) {
      console.log("gagal hadir:", error);
      alert("Gagal menginput data masuk.");
    }
  };

  const Keluar = async (id_kehadiran) => {
    try {
      await axios.patch(`http://localhost:5000/kehadiran/${id_kehadiran}`);
      getKeluar(id_user);
      window.location.reload();
      setLastInputDate(new Date());
    } catch (error) {
      console.log("gagal keluar:", error);
      alert("Gagal menginput data keluar.");
    }
  };
  const getKeluar = async (id_user) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/kehadiran/baru/${id_user}`
      );
      setKeluarData(response.data);
    } catch (error) {
      console.log("gagal ambil data keluar:", error);
    }
  };

  useEffect(() => {
    getKeluar(id_user);
  }, [id_user]);

  return (
    <div className="">
      <div className="flex justify-between items-center pr-5">
        <h1 className="text-2xl font-bold my-4">Daftar Hadir</h1>
        <h1 className="text-lg font-bold">{currentYear} Genap</h1>
      </div>
      <div className="border border-slate-950 p-6 mt-10  h-96 items-center pt-20">
        <h1 className="text-center text-6xl mb-2">{currentTime}</h1>
        <h1 className="text-center text-lg mb-9">
          {namaHari}, {currentDate} {namaBulan} {currentYear}
        </h1>
        <div className="flex justify-evenly mt-2">
          <div className="flex justify-center">
            <div>
              {keluarData && keluarData.keluar === "-" && (
                <h1 className=" text-center text-2xl">
                  {keluarData && extractTime(keluarData.masuk)}{" "}
                </h1>
              )}
              <button
                onClick={Hadir}
                className="border-2 p-3 text-3xl hover:bg-blue-500 active:bg-blue-600 hover:text-white"
              >
                Masuk
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <h1 className=" text-center text-2xl">- : -</h1>

              {keluarData && keluarData.keluar === "-" && (
                // Tampilkan tombol "Keluar" jika keluarData tidak null dan properti keluar tidak sama dengan "-"
                <button
                  onClick={() => Keluar(keluarData.id_kehadiran)}
                  className="text-black text-3xl border-2 p-3 hover:bg-blue-500 active:bg-blue-600 hover:text-white"
                >
                  Keluar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsiDaftarHadir;
