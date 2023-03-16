import React from 'react'
import { cardData } from '../../constants/cartData'
import './BestSeller.scss'
const BestSeller = () => {
  return (
    <div className='best__product'>
        <div className='best__product--heading'>
            <h2>Best Seller</h2>
        </div>
        <div className='best__product--container'>
            {
                cardData.slice(0,4).map((data, index) => {
                    return(
                        <div className='product-box'  key={data.id}>
                            <div className='product-img'>
                                <img src={data.img} alt="" />
                            </div>
                            <div className='product-desc'>
                                <p className='product-name'>{data.name}</p>
                                <span className='product-author'>{data.author}</span>
                                <span className='product-price'>${data.price}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default BestSeller