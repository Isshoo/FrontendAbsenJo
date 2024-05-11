import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi2";

const DashboardGuru = () => {
  const { user } = useSelector((state) => state.auth);
  const nama = user && user.nama;

  let year = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(year);
  const updateYear = () => {
    let year = new Date().getFullYear();
    setCurrentYear(year);
  };
  setInterval(updateYear, 1000);

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

      {user && user.role === "Admin" && <h1>Admin</h1>}
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

            <div></div>
          </div>
        </div>
      )}
      {user && user.role === "Kepsek" && <h1>Kepsek</h1>}
    </div>
  );
};

export default DashboardGuru;
