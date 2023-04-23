import React from 'react'
import './Navbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { IMG_URL } from '../../constants/config'
import { actLogout } from '../../redux/features/userSlice/userSlice'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(actLogout())
    navigate("/login-layout")
  }
  return (
    <div className='navbar'>
        <div className='navbar-content'>
            <div className="info">
              <img className='avatar' src={`${IMG_URL}${user.avatar}`} alt="" />
              <span className='name'>{user.fullName}</span>
            </div>
            <ul className='action'>
                <li onClick={handleLogOut}>Đăng xuất</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar