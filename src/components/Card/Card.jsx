import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actAddToCart, actCreateCart, actFetchAllDataCartByIdUser } from '../../redux/features/cartSlice/cartSlice'
import './Card.scss'
const Card = ({data}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const initialState = {
        userId: user?.id,
        bookId: data?.id,
        amount: 1,
    }

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
  return (
    <div className='card'>
        <div className='card-img'>
        {data.images && data.images.length > 0 && (
                    <img src={`data:image/jpeg;base64,${data.images[0]}`} alt="Product" />
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
            <span className='card-author'>{data?.authorEntity?.name}</span>
            <span className='card-price'>${data?.price}</span>
        </div>
    </div>
  )
}

export default Card