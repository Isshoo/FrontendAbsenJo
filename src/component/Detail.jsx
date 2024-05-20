import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Detail = () => {
  const [guru, setGuru] = useState([]);

  const { id } = useParams();

  const getGurubyId = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/guru/${id}`);
      setGuru(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getGurubyId();
  }, []);

  return (
    <div>
      <div className="">
        <div className="flex my-4">
          <Link
            className="border border-slate-600 p-1 px-2 hover:bg-blue-500 active:bg-blue-600 hover:text-white"
            to="/daftarguru"
          >
            Kembali
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="border w-full h-48 items-center bg-blue-400">
            <div className=" h-52 w-52 mx-auto mt-20 rounded-full">
              <img
                className="size-full rounded-full"
                src={guru.url}
                alt="Profil"
              />
            </div>
          </div>
        </div>
        <div className="px-10 mt-32">
          <div className="flex justify-evenly">
            <div className="mr-4 w-1/2">
              <div className="mb-4">
                <label className="block mb-2  font-bold text-blue-500">
                  Nama:
                </label>
                <h1>{guru.nama}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  NIP:
                </label>
                <h1>{guru.NIP}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Tahun Masuk:
                </label>
                <h1>{guru.thnMasuk}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Status
                </label>
                <h1>{guru.status}</h1>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Tempat, Tanggal Lahir:
                </label>
                <h1>
                  {guru.tmptLahir}
                  {", "}
                  {guru.tglLahir}
                </h1>
              </div>
            </div>
            <div className="ml-4 w-1/2">
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Jenis Kelamin:
                </label>
                <h1>{guru.jenis_kelamin}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Agama:
                </label>
                <h1>{guru.agama}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Alamat:
                </label>
                <h1>{guru.alamat}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Nomor HP:
                </label>
                <h1>{guru.noHP}</h1>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-blue-500">
                  Sisa Cuti:
                </label>
                <h1>{guru.sisaCuti}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
