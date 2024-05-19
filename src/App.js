import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./pages/Dashboard";
import UbahPassworPage from "./pages/UbahPassworPage";
import DataDiriPage from "./pages/DataDiriPage";
import IsiDaftarHadirPage from "./pages/IsiDaftarHadirPage";
import PengajuanPage from "./pages/PengajuanPage";
import RiwayatKehadiranPage from "./pages/RiwayatKehadiranPage";
import DataGuruStafPage from "./pages/DataGuruStafPage";

import JadwalPiketPage from "./pages/JadwalPiketPage";
import DetailPage from "./pages/DetailPage";
import DetailKepsekPage from "./pages/DetailKepsekPage";
import UpdateDataDiriPage from "./pages/UpdateDataDiriPage";





function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/ubahpassword" element={<UbahPassworPage/>} />
          <Route path="/datadiri" element={<DataDiriPage/>} />
          <Route path="/isidaftarhadir" element={<IsiDaftarHadirPage/>} />
          <Route path="/pengajuan" element={<PengajuanPage/>} />
          <Route path="/riwayatkehadiran" element={<RiwayatKehadiranPage/>} />
          <Route path="/daftarguru" element={<DataGuruStafPage/>} />
          <Route path="/detail/:id" element={<DetailPage/>}/>
          <Route path="/detailkepsek/:id" element={<DetailKepsekPage/>}/>
          <Route path="/jadwalpiket" element={<JadwalPiketPage/>} />
          <Route path="/updatedatadiri/:id" element={<UpdateDataDiriPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
