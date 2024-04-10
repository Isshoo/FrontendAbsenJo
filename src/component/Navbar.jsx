import React from "react";
import Logo from "../component/LogoAbsenJo.png"

const Navbar = () => {
  return (
    <div>
      <div className="flex m-0 py-2 z-10 px-4 bg-[#3c86e7] justify-between items-center fixed w-full">
        <div className="flex items-center">
          <img className="mr-2 h-[50px] w-[50px]" src={Logo}/>
          <div className="text-white">
            <h4 >Daftar Online</h4>
            <h4 >SD Katolik Monica Lawongan</h4>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="">
            <div className="flex justify-center items-center">
              <img src="" alt="Profil" />
            </div>
            <h6>Nama Nama</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;