import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarDetaiStore from '../../components/NavbarDetaiStore/NavbarDetaiStore'
import './DetailStoreLayout.scss'
const DetailStoreLayout = ({idPage}) => {
  return (
    <div className='detail-store-layout'>
        <NavbarDetaiStore idPage={idPage}/>
        <Outlet/>
    </div>
  )
}

export default DetailStoreLayout