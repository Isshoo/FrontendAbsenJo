import React,{useEffect, useState} from 'react'
import Layout from './Layout'
import RiwayatKehadiran from '../component/RiwayatKehadiran'
import {useDispatch, useSelector} from 'react-redux'
import { getMe } from '../features/authSlice'
import {useNavigate} from 'react-router-dom'

const RiwayatKehadiranPage = () => {
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
        <RiwayatKehadiran />
    </Layout>
  )
}

export default RiwayatKehadiranPage
