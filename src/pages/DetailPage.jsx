import React, { useEffect } from "react";
import Layout from "./Layout";
import Detail from "../component/Detail";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
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
      <Detail />
    </Layout>
  );
};

export default DetailPage;
