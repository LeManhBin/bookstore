import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Account.scss'
import { IMG_URL } from '../../constants/config'
import { actFetchUserById } from '../../redux/features/userSlice/userSlice'
import { toast } from 'react-toastify'
const Account = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const {isLogged} = useSelector((state) => state.user)

    const handleProfilePage = () => {
        navigate('/account/profile')
    }

    const handleRegisterSalePage = () => {
        if(isLogged){
            navigate('/sale-register')
        }else {
            toast.warning("Vui lòng đăng nhập trước!")
        }
        
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
        <li onClick={handleProfilePage}>Tài Khoản Của Tôi</li>
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