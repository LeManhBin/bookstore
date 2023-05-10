import React from 'react'
import './LieBanner.scss'
import smallBanner2 from '../../assets/imgs/smallBanner2.png'
import smallBanner from '../../assets/imgs/smallBanner.png'
const LieBanner = () => {
  return (
    <div className='banner-container'>
        <div className='banner-left'>
            <img src={smallBanner} alt="banner" />
        </div>
        <div className='banner-left'>
            <img src={smallBanner2} alt="banner" />
        </div>
    </div>
  )
}

export default LieBanner