import React from "react";
import Logo from "../img/LogoAbsenJo.png"
import {useSelector} from "react-redux"

const Navbar = () => {
  const {user}=useSelector((state)=>state.auth)
  const nama=user&&user.nama
  const foto=user&&user.url
  return (
    <div>
      <div className="flex m-0 py-4 z-10 px-10 bg-[#3c86e7] justify-between items-center fixed w-full">
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
              <img className="h-[30px] w-[30px] rounded-full" 
              src={foto} alt="Profil" />
            </div>
            <h6>{nama}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;