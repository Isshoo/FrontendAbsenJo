import React,{useEffect, useState} from 'react'
import Layout from './Layout'
import DataGuruStaf from '../component/DataGuruStaf'
import {useDispatch, useSelector} from 'react-redux'
import { getMe } from '../features/authSlice'
import {useNavigate} from 'react-router-dom'

const DataGuruStafPage = () => {
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
        <DataGuruStaf />
    </Layout>
  )
}

export default DataGuruStafPage
