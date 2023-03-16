import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './HomeLayout.scss'
const HomeLayout = () => {
  return (
    <div className='home-layout'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default HomeLayout