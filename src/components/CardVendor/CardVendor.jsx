import React from 'react'
import './CardVendor.scss'
const CardVendor = ({data}) => {
  return (
    <div className='vendor'>
        <div className='cover-img'>
            <img src={data.coverImg} alt="" />
        </div>
        <div className='avatar'>
            <img src={data.avatar} alt="" />
        </div>
        <div className='content'>
            <div className="name">{data.name}</div>
            <div className="quantity">{data.quantity} Product</div>
        </div>
    </div>
  )
}

export default CardVendor