import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      <div className="flex justify-between items-center">
        <p className="text-xl my-4">{guru.nama}</p>
      </div>
    </div>
  );
};

export default Detail;
