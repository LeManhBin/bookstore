import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import SideStore from '../../components/SideStore/SideStore'
import './StoreLayout.scss'
const StoreLayout = () => {
  return (
    <div className='admin-layout'>
        <div className='left'>
            <SideStore/>
        </div>
        <div className='right'>
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="outlet">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default StoreLayout