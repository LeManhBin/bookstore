import React from 'react'
import { cardData } from '../../constants/cartData'
import './TopProduct.scss'
const TopProduct = () => {
  return (
    <div className='top__product'>
        <div className='top__product--heading'>
            <h2>Top 10 This Week</h2>
        </div>
        <div className='top__product--container'>
            {
                cardData.slice(0,6).map((data, index) => {
                    return(
                        <div className='product-box'  key={data.id}>
                            <div className='product-img'>
                                <img src={data.img} alt="" />
                                <span className='top'>{index + 1}</span>
                            </div>
                            <div className='product-desc'>
                                <p className='product-name'>{data.name}</p>
                                <span className='product-author'>{data.author}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TopProduct