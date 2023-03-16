import React from 'react'
import './StandBanner.scss'
const StandBanner = () => {
  return (
    <div className='stand-banner'>
        <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/11/h7_bn-1.jpg" alt="" />
        <div className='content'>
            <span className='title'>BEST SELLER BOOKS</span>
            <p className='sale'>Sale 50%</p>
            <span className='shop-now'>Shop now <i className="fa-solid fa-angle-right"></i></span>
        </div>
    </div>
  )
}

export default StandBanner