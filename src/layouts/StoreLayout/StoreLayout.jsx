import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import SideStore from '../../components/SideStore/SideStore'
import './StoreLayout.scss'
import NavbarStore from '../../components/NavbarStore/NavbarStore'
const StoreLayout = () => {
  return (
    <div className='store-layout'>
        <div className='left'>
            <SideStore/>
        </div>
        <div className='right'>
            <div className="navbar">
                <NavbarStore/>
            </div>
            <div className="outlet">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default StoreLayout