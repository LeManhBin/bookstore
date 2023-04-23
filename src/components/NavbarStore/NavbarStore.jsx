import React, { useEffect } from 'react'
import './NavbarStore.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchStoreById } from '../../redux/features/storeSlice/storeSlice'
import { IMG_URL } from '../../constants/config'
import { actLogout } from '../../redux/features/userSlice/userSlice'
const NavbarStore = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleProfile = () => {
        navigate('/store/profile-store')
    }

    const {user} = useSelector((state) => state.user)
    const {store} = useSelector((state) => state.store)

    useEffect(() => {
        dispatch(actFetchStoreById(user.storeId))
    },[user])

    const handleLogOut = () => {
        dispatch(actLogout())
        navigate("/login-layout")
    }
    
  return (
    <div className='navbar-store'>
        <div className='navbar-content'>
            <div className='info'>
                <img className='avatar' src={store?.data?.avatar ?  `${IMG_URL}${store?.data?.avatar}` : 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'} alt="" />
                <span className='name'>{store?.data?.name}</span>
            </div>
            <ul className='action'>
                <li onClick={handleProfile}>Chỉnh sửa thông tin</li>
                <li onClick={handleLogOut}>Đăng xuất</li>
            </ul>
        </div>
    </div>
  )
}

export default NavbarStore