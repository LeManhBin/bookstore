import React, { useEffect, useState } from 'react'
import './Header.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {actLogout} from '../../redux/features/userSlice/userSlice'
import { IMG_URL } from '../../constants/config'
import { actFetchAllDataCartByIdUser } from '../../redux/features/cartSlice/cartSlice'
const Header = () => {
    const navigate = useNavigate()
    const {isLogged} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.user)
    const [toggle, setToggle] = useState(false)
    const [totalItems, setTotalItems] = useState(0);

   const userId = user?.id
    const handleToggle = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        if (userId) {
          dispatch(actFetchAllDataCartByIdUser(userId));
        }
      }, [userId])

    useEffect(() => {
        let newTotalItems = 0;
        for (let i = 0; i < cartItems.length; i++) {
            newTotalItems += cartItems[i].cartDetails.length;
        }
        setTotalItems(newTotalItems);
    }, [cartItems])

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

    const handleHomePage = () => {
        navigate('/')
    }

  return (
    <div className='header'>
        <div className='header__left' onClick={handleHomePage}>
            <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/logo-1.svg" alt="" />
        </div>
        <div className='header__center'>
            <ul className={toggle ? "header__center--links open-links" : "header__center--links"}>
                <span className='close-btn' onClick={handleToggle}><i className="fa-solid fa-xmark"></i></span>
                <li className='link' onClick={() => setToggle(false)}><NavLink style={styleActive} to={"/"}> Home</NavLink></li>
                <li className='link' onClick={() => setToggle(false)}><NavLink style={styleActive} to={"/product"}> Product</NavLink></li>
                <li className='link' onClick={() => setToggle(false)}><NavLink style={styleActive} to={"/vendor"}> Vendor</NavLink></li>
                {/* <li className='link' onClick={() => setToggle(false)}><NavLink style={styleActive} to={"/blog"}> Blog</NavLink></li> */}
                <li className='link' onClick={() => setToggle(false)}><NavLink style={styleActive} to={"/contact"}> Contact</NavLink></li>
                {
                    isLogged && <li className='link logout' onClick={handleLogout}>Đăng xuất</li>
                }
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
                {/* <div className='wishlist'>
                    <NavLink style={styleActive} to={"/wish-list"}><i className="fa-regular fa-heart"></i></NavLink>
                    <span className='quantity'>4</span>
                </div> */}
                <div className='cart'>
                    <NavLink style={styleActive} to={"/cart"}><i className="fa-solid fa-cart-shopping"></i></NavLink>
                    <span className="quantity">{totalItems}</span>
                </div>
                <span className='open-btn' onClick={handleToggle}><i className="fa-solid fa-bars"></i></span>
            </div>
        </div>
    </div>
  )
}

export default Header