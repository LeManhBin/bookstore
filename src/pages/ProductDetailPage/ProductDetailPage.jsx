import React, { useState } from 'react'
import Card from '../../components/Card/Card'
import Comment from '../../components/Comment/Comment'
import CommentInput from '../../components/CommentInput/CommentInput'
import { cardData } from '../../constants/cartData'

import './ProductDetailPage.scss'
const ProductDetailPage = () => {
    const [quantity, setQuantity] = useState(1)

    const handleDecrease = () => {
        setQuantity(prev => {
            if (prev > 1) {
                return prev - 1
            }
            return prev
        })
    }

    const handleIncrease = () => {
        setQuantity(prev => {
            return prev + 1
        })
    }
  return (
    <div className='product-detail'>
        <div className='product-detail-content'>
            <div className='left'>
                <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/35.jpg" alt="" />
            </div>

            <div className="right">
                <div className="top">
                    <h1 className='name-product'>Rich Dad Poor Dad</h1>
                    <div className='author-product'>
                        <p><span>Author: </span>Misty Figueroa</p>
                        <div className='rating'>
                            <div className='star'>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span className='quantity'>10</span>
                        </div>
                    </div>
                </div>
                <div className='mid'>
                    <div className='price'>
                        <span>$150</span>
                    </div>
                    <div className='desc'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni iste natus nulla nam qui ratione alias facilis quia dolorem temporibus deserunt numquam odit nostrum aliquid a, consequatur perferendis veniam autem.</p>
                    </div>
                </div>
                <div className='bot'>
                    <div className='quantity'>
                        <span>Quantity</span>
                        <div className="quantity-input">
                            <button className='decrease' onClick={handleDecrease}>-</button>
                            <input type="number" min={1} value={quantity}/>
                            <button className='increase' onClick={handleIncrease}>+</button>
                        </div>
                    </div>
                    <button className='add-cart'> <i className="fa-solid fa-bag-shopping"></i> Add to card</button>
                    <button className='add-wishlist'>Browse wishlist</button>
                </div>
            </div>
        </div>
        <div className='product-detail-shop'>
            <div className='shop-detail'>
                <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/11/store-2.jpg" alt="" className='avatar'/>
                <div className='info'>
                    <div className="name">baseusmall</div>
                    <button className='see-shop'>See Shop</button>
                </div>
            </div>
            <div className='achievements'>
                <div className='text'>
                    <span>Đánh Giá</span>
                    <span>616</span>
                </div>
                <div className='text'>
                    <span>Sản Phẩm</span>
                    <span>616</span>
                </div>
                <div className='text'>
                    <span>Người Theo Dõi</span>
                    <span>616</span>
                </div>
            </div>  
        </div>
        <div className='product-detail-desc'>
            <h2 className='heading'>Description</h2>
            <div className='desc-container'>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, rerum nemo. Sed, repudiandae veniam? Eveniet ea ab fugit, quos nam officiis repellat corrupti explicabo earum nobis porro. Itaque, ipsa veniam.
                </p>
            </div>
        </div>

        <div className="product-detail-review">
            <h2 className='heading'>Review</h2>
            <div className='review-container'>
                <CommentInput/>
                <Comment/>
            </div>
        </div>

        <div className='product-detail-related'>
            <div className="heading">
                <h2>Related products</h2>
            </div>
            <div className='related'>
                {
                    cardData.slice(0,6).map(data => {
                        return(
                            <Card data={data}/>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ProductDetailPage