import React from 'react'
import './Navbar.scss'
import { useSelector } from 'react-redux'
import { IMG_URL } from '../../constants/config'
const Navbar = () => {
  const {user} = useSelector((state) => state.user)

  return (
    <div className='navbar'>
        <div className='navbar-content'>
            <img className='avatar' src={`${IMG_URL}${user.avatar}`} alt="" />
            <span className='name'>{user.fullName}</span>
        </div>
    </div>
  )
}

export default Navbar