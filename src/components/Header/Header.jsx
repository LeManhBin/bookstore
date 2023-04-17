import React, { useEffect, useState } from 'react'
import './Header.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {actLogout} from '../../redux/features/userSlice/userSlice'
import { IMG_URL } from '../../constants/config'
const Header = () => {
    const navigate = useNavigate()
    const {isLogged} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.user)
    const [cartSize, setCartSize] = useState(cartItems.length)

    useEffect(() => {
        setCartSize(cartItems.length)
    },[cartItems])
 
    const styleActive = ({isActive}) => {
        return {
          color: isActive ? '#F65D4E' : '#000'
        }
    }

    const handleAccountPage = () => {
        navigate('/account')
    }

    const handleLogout = () => {
        dispatch(actLogout())
        navigate('/login-layout')
    }

    console.log(user, 'heading');
  return (
    <div className='header'>
        <div className='header__left'>
            <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/logo-1.svg" alt="" />
        </div>
        <div className='header__center'>
            <ul className="header__center--links">
                <li className='link'><NavLink style={styleActive} to={"/"}> Home</NavLink></li>
                <li className='link'><NavLink style={styleActive} to={"/product"}> Product</NavLink></li>
                <li className='link'><NavLink style={styleActive} to={"/vendor"}> Vendor</NavLink></li>
                <li className='link'><NavLink style={styleActive} to={"/blog"}> Blog</NavLink></li>
                <li className='link'><NavLink style={styleActive} to={"/contact"}> Contact</NavLink></li>
            </ul>
        </div>
        <div className="header__right">
            <div className='header__right--contact'>
                <span className='header__right--contact-icon'><i className="fa-solid fa-phone-volume"></i></span>
                <div className='header__right--contact-detail'>
                    <span className='phone-number'>+84 365160470</span>
                    <span className='title'>24/7 Support Center</span>
                </div>
            </div>
            <div className='header__right--act'>
                <div className='account'>
                    {
                        isLogged ? 
                        <div className='avatar-container'>
                            <img onClick={handleAccountPage} className='avatar' src={user.avatar ?  `${IMG_URL}${user.avatar}` : 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png'} alt=""/>
                            <ul className='avatar-act'>
                                <li onClick={handleLogout}>Đăng xuất</li>
                            </ul>
                        </div>
                        : <Link to={'/login-layout'}><i className="fa-regular fa-user"></i></Link>
                    }
                </div>
                <div className='wishlist'>
                    <NavLink style={styleActive} to={"/wish-list"}><i className="fa-regular fa-heart"></i></NavLink>
                    <span className='quantity'>4</span>
                </div>
                <div className='cart'>
                    <NavLink style={styleActive} to={"/cart"}><i className="fa-solid fa-cart-shopping"></i></NavLink>
                    <span className="quantity">{cartSize}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header