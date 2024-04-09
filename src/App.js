import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import DashboardGuru from "./component/DashboardGuru";
import DashboardKepsek from "./component/DashboardKepsek";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/DashboardGuru" element={<DashboardGuru />} />
          <Route path="/DashboardKepsek" element={<DashboardKepsek />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
