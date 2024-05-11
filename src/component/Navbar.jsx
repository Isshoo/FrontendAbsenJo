import React, { useState } from "react";
import Logo from "../img/LogoAbsenJo.png";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const nama = user && user.nama;
  const NIP = user && user.NIP;
  const foto = user && user.url;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
      <div className="flex m-0 py-4 z-10 px-10 bg-[#3c86e7] justify-between items-center fixed w-full">
        <div className="flex items-center">
          <img className="mr-2 h-[50px] w-[50px]" src={Logo} />
          <div className="text-white">
            <h4>Daftar Hadir Online</h4>
            <h4>SD Katolik St. Monica Langowan</h4>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="cursor-pointer" onClick={toggleDropdown}>
              <div className="flex justify-center items-center">
                <img
                  className="h-[30px] w-[30px] rounded-full"
                  src={foto}
                  alt="Profil"
                />
              </div>
              <h6 className="text-white">{nama}</h6>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-slate-100 border-black rounded-lg shadow-2xl z-10 items-center p-2">
                <p className="px-2 py-1 flex justify-center mb-2 ">{NIP}</p>
                <button
                  className="flex justify-center py-[4px] w-full bg-[#3c86e7] hover:bg-blue-500 rounded-md"
                  onClick={logout}
                >
                  <h1 className="flex justify-center px-2 py-1 ">Logout</h1>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
