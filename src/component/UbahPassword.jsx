import React, { useState } from "react";
import { CiLock } from "react-icons/ci";

const UbahPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    // Add your password change logic here
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div>
      <div className="items-center flex justify-between">
        <h1 className="my-4 text-xl">Ubah Password</h1>
        <div></div>
      </div>
      <div className="flex justify-center w-full h-full">
        <div className="border w-[450px] h-[450px] p-5 pt-20 px-10 rounded-2xl items-center border-black bg-blue-400">
          <h1 className="flex justify-center text-2xl text-white font-serif mb-7">
            Ubah Password
          </h1>
          <div className=" flex justify-center items-center bg-white px-7 my-3 border-black border">
            <CiLock />
            <input
              type="password"
              placeholder="Password Lama"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              className="p-1 ml-3 m-2 w-full"
            />
          </div>
          <div className=" flex justify-center items-center bg-white my-6 px-7 border-black border">
            <CiLock />
            <input
              type="password"
              placeholder="Password Baru"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="p-1 m-2 ml-3 w-full"
            />
          </div>
          <div className=" flex justify-center items-center bg-white px-7 my-3 border-black border">
            <CiLock />
            <input
              type="password"
              placeholder="Konfirmasi Password Baru"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="p-1 m-2 ml-3 w-full"
            />
          </div>
          <div className="flex justify-between">
            <div></div>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-7 rounded mt-7"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UbahPassword;
