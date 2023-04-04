import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Comment from '../../components/Comment/Comment'
import CommentInput from '../../components/CommentInput/CommentInput'
import useScrollToTop from '../../hooks/useScrollToTop'
import { actFetchBookById, actFetchBookByIdCategory } from '../../redux/features/bookSlice/bookSlice'
import { actCreateCart } from '../../redux/features/cartSlice/cartSlice'

import './ProductDetailPage.scss'
const ProductDetailPage = () => {
    useScrollToTop()
    const param = useParams()
    const {book} = useSelector((state) => state.book)
    const {bookByCategory} = useSelector((state) => state.book)
    const [cardState, setCardState] = useState(book)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)

    const {user} = useSelector((state) => state.user)

    const initialState = {
        userid: user?.id,
        bookid: book?.id,
        amount: 1,
    }
    const [cartState, setCartState] = useState(initialState)

    useEffect(() => {
        setCardState(book)
    },[book])

    useEffect(() => {
        setCartState(initialState)
    },[book, user])

    useEffect(() => {
        dispatch(actFetchBookById(Number(param.idProduct)))
    },[param])

    useEffect(() => {
        dispatch(actFetchBookByIdCategory(cardState?.categoryEntity?.id))
    },[cardState?.categoryEntity?.id])

    
    console.log(cardState);

    const handleDecrease = () => {
        setQuantity(prev => {
            if (prev > 1) {
                return prev - 1
            }
            return prev
        })
        setCartState(prevState => ({
            ...prevState,
            amount: prevState.amount - 1
        }))
    }

    const handleIncrease = () => {
        setQuantity(prev => {
            return prev + 1
        })
        setCartState(prevState => ({
            ...prevState,
            amount: prevState.amount + 1
        }))
    }

    const handleWatchShop = (id) => {
        navigate(`/vendor/${id}`)
    }

    const handleAddToCard = () => {
        dispatch(actCreateCart(cartState))
    }
    
  return (
    <div className='product-detail'>
        <div className='product-detail-content'>
            <div className='left'>
            {cardState.images && cardState.images.length > 0 && (
                    <img src={`data:image/jpeg;base64,${cardState.images[0]}`} alt="Product" />
            )}
            </div>

            <div className="right">
                <div className="top">
                    <h1 className='name-product'>{cardState?.name}</h1>
                    <div className='author-product'>
                        <p><span>Author: </span>{cardState?.author}</p>
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
                        <span>${cardState?.price}</span>
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
                    <button className='add-cart' onClick={handleAddToCard}> <i className="fa-solid fa-bag-shopping"></i> Add to card</button>
                    <button className='add-wishlist'>Browse wishlist</button>
                </div>
            </div>
        </div>
        <div className='product-detail-shop'>
            <div className='shop-detail'>
                <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/11/store-2.jpg" alt="" className='avatar'/>
                <div className='info'>
                    <div className="name">{cardState?.storeEntity?.name}</div>
                    <button className='see-shop' onClick={() => handleWatchShop(cardState?.storeEntity?.id)}>See Shop</button>
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
                    {cardState?.description}
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
                    bookByCategory.slice(0,4).map(data => {
                        return(
                            <div key={data?.id}>
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

export default ProductDetailPage