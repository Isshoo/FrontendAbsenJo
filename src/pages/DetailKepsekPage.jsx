import React, { useEffect } from "react";
import Layout from "./Layout";
import DetailKepsek from "../component/DetailKepsek";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const DetailKepsekPage = () => {
  {
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
  }
  return (
    <Layout>
      <DetailKepsek />
    </Layout>
  );
};

export default DetailKepsekPage;
