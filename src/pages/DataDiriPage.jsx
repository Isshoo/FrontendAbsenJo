import React,{useEffect, useState} from 'react'
import Layout from './Layout'
import DataDiri from '../component/DataDiri'
import {useDispatch, useSelector} from 'react-redux'
import { getMe } from '../features/authSlice'
import {useNavigate} from 'react-router-dom'

const DataDiriPage = () => {
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
        <DataDiri />
    </Layout>
  )
}

export default DataDiriPage
