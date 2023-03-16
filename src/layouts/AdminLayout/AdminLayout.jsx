import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import './AdminLayout.scss'
const AdminLayout = () => {
  return (
    <div className='admin-layout'>
        <div className='left'>
            <Sidebar/>
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

export default AdminLayout