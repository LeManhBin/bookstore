import React, { useState } from 'react'
import './Header.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    const [isLogger, setIsLogger] = useState(true)
    

    const styleActive = ({isActive}) => {
        return {
          color: isActive ? '#F65D4E' : '#000'
        }
    }

    const handleAccountPage = () => {
        navigate('/account')
    }
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
                        isLogger ? (<img onClick={handleAccountPage} className='avatar' src='data:image/jpeg;base64,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'/>) 
                        : <Link to={'/login-layout'}><i className="fa-regular fa-user"></i></Link>
                    }
                </div>
                <div className='wishlist'>
                    <i className="fa-regular fa-heart"></i>
                    <span className='quantity'>4</span>
                </div>
                <div className='cart'>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="quantity">0</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header