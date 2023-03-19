import React from 'react'
import './ProductPage.scss'
import Heading from '../../components/Heading/Heading'
import Card from '../../components/Card/Card'
import { cardData } from '../../constants/cartData'
import useScrollToTop from '../../hooks/useScrollToTop'
const ProductPage = () => {
  useScrollToTop()
  return (
    <div className='product-container'>
        <div className="heading">
            <Heading title={"Shop"}/>
        </div>
        <div className='product'>
            <div className='sort'>
                <div className="sort-filter">
                  <i className="fa-solid fa-arrow-up-z-a"></i>
                  <span>Sắp xếp</span>
                </div>
                <div className='sorting'>
                    <div className='default-sort'>
                      <select name="" id="">
                          <option value="">Xếp theo</option>
                          <option value="">Giá thấp đến cao</option>
                          <option value="">Giá cao đến thấp</option>
                      </select>
                    </div>
                    <div className='show-sort'> 
                      <span>Show</span>
                      <select name="" id="">
                            <option value="">8</option>
                            <option value="">12</option>
                            <option value="">16</option>
                            <option value="">20</option>
                      </select>
                    </div>
                </div>
            </div>
            <div className="all-product">
                    {
                      cardData.map(data => {
                        return (
                          <div key={data.id}>
                            <Card data={data}/>
                          </div>
                        )
                      })
                    }
            </div>
        </div>
    </div>
  )
}

export default ProductPage