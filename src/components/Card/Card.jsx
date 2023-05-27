import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actAddToCart, actCreateCart, actFetchAllDataCartByIdUser } from '../../redux/features/cartSlice/cartSlice'
import './Card.scss'
import { IMG_URL } from '../../constants/config'
import { toast } from 'react-toastify'
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

    let formattedPrice = data?.price?.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    let formattedPriceAfterDiscount = priceAfterDiscount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [cartState, setCartState] = useState(initialState)

    const handleSeeDetail = (id) => {
        navigate(`/product/${id}`)
    }

    useEffect(() => {
        setCartState(initialState)
    },[user])

    const handleAddToCard = () => {
        if(!user.id) {
            toast.warning("Vui lòng đăng nhập !!")
        }else if(data.quantity < 1){
            toast.warning("Sản phẩm đã hết hàng")
        }else{
            dispatch(actCreateCart(cartState))
        }
    }

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
            {
                data.quantity < 1 && 
                    (<div className='overlay-card'>
                        <span>Hết hàng</span>
                    </div>)
            }

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
            {/* <div className='rating'>
                <div className='star'>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                </div>
                <span className='quantity'>10</span>
            </div> */}
            <span className='card-author'>Tác giả: {data?.author}</span>
            <span className='card-author'>Cửa hàng: {data?.storeName}</span>
            <span className='card-author'>Đã bán: {data?.quantitySold}</span>
            <div className='card-price'>
                {
                    (data.discount > 0) && <span className='adv-price'>${formattedPrice}</span>
                }
                <span className='later-price'>${formattedPriceAfterDiscount}</span>
            </div>
        </div>
    </div>
  )
}

export default Card