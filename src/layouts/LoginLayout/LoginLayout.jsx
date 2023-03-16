import React from 'react'
import { Outlet } from 'react-router-dom'
import './LoginLayout.scss'
const LoginLayout = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default LoginLayout