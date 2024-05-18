import React, { useEffect } from "react";
import JadwalPiket from "../component/JadwalPiket";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const JadwalPiketPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <JadwalPiket />
    </Layout>
  );
};

export default JadwalPiketPage;
