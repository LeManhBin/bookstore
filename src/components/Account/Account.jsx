import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Account.scss'
import { IMG_URL } from '../../constants/config'
const Account = () => {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.user)

    const handleProfilePage = () => {
        navigate('/account/profile')
    }

    const handleRegisterSalePage = () => {
        navigate('/sale-register')
    }

    const handleMyStore= () => {
        navigate('/store')
    }

    const handleOrder = () => {
        navigate('/account')
    }

  return (
    <div className='account'>
        <div className='info'>
            <img src={user?.avatar ?  `${IMG_URL}${user.avatar}` : 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'} alt=""/>
            {/* <img src={`data:image/jpeg;base64,${user?.imageBytes}`} alt="avatar" />   */}
            <div className="name">
            <p>{user?.fullName}</p>
            <span onClick={handleProfilePage}>Sửa hồ sơ</span>
            </div>
        </div>
        <ul>
        <li>Tài Khoản Của Tôi</li>
        {
            (user?.storeId !== 0) ? 
            <li onClick={handleMyStore}>Cửa hàng của tôi</li>
            :
            <li onClick={handleRegisterSalePage}>Đăng ký bán hàng</li>
        }
        <li  onClick={handleOrder}>Đơn Mua</li>
        </ul>
    </div>
  )
}

export default Account