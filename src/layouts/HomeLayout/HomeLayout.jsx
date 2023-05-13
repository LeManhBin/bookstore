import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './HomeLayout.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actLogout } from '../../redux/features/userSlice/userSlice'
const HomeLayout = () => {
  const dispatch = useDispatch()
  const [isLock, setIsLock] = useState(false);
  const {user} = useSelector((state) => state.user)

  const handleCheckExpired = () => {
      if(user?.status === 1) {
          setIsLock(true)
      }else {
          setIsLock(false)
      }
  }
  useEffect(() => {
      handleCheckExpired()
  },[user])

  const handleLogout = () => {
    dispatch(actLogout())
}
  return (
    <div className='home-layout'>
        {
          isLock &&
          <div className='overlay'>
              <div className='popUp'>
                  <h2 className='popUp-title'>Tài khoản của bạn đã bị khoá</h2>
                  <span>Vui lòng liên hệ với quản trị viên để được hỗ trợ</span>
                  <button onClick={handleLogout}>Tôi đã hiểu</button>
              </div>
          </div>
        }
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default HomeLayout