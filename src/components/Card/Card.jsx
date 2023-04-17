import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actAddToCart, actCreateCart, actFetchAllDataCartByIdUser } from '../../redux/features/cartSlice/cartSlice'
import './Card.scss'
import { IMG_URL } from '../../constants/config'
const Card = ({data}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const initialState = {
        userId: user?.id,
        bookId: data?.id,
        amount: 1,
    }

    const priceAfterDiscount = data.price - (data.price * (data.discount/100)) 

    const [cartState, setCartState] = useState(initialState)

    const handleSeeDetail = (id) => {
        navigate(`/product/${id}`)
    }

    useEffect(() => {
        setCartState(initialState)
    },[user])

    const handleAddToCard = () => {
        dispatch(actCreateCart(cartState))
    }

    console.log(data.image);
  return (
    <div className='card'>
        {
            (data.discount > 0) ? (
                <div className="discount">
                    <span>{data.discount}%</span>
                </div>
            ): (<></>)
        }
        <div className='card-img'>
        {data.image && data.image.length > 0 && (
                    <img src={`${IMG_URL}${data?.image}`} alt="Product" />
            )}

            <div className='card-action'>
                <div className='add-wish-list'>
                    <i className="fa-regular fa-heart"></i>
                </div>
                <div className="add-cart" onClick={handleAddToCard}>
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
        </div>
        <div className='card-desc' onClick={() => handleSeeDetail(data?.id)}>
            <p className='card-name'>{data?.name}</p>
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
            <span className='card-author'>{data?.author}</span>
            <div className='card-price'>
                {
                    (data.discount > 0) && <span className='adv-price'>${data?.price}</span>
                }
                <span className='later-price'>${priceAfterDiscount}</span>
            </div>
        </div>
    </div>
  )
}

export default Card