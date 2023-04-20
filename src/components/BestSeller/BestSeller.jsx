import React, { useEffect } from 'react'
import { cardData } from '../../constants/cartData'
import './BestSeller.scss'
import { useDispatch, useSelector } from 'react-redux'
import { IMG_URL } from '../../constants/config'
import { useNavigate } from 'react-router-dom'
import { actFetchAllBook } from '../../redux/features/bookSlice/bookSlice'
const BestSeller = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {allBook} = useSelector((state) => state.book)

    useEffect(() => {
        dispatch(actFetchAllBook())
    },[])

    const handleClickDetail = (id) => {
        navigate(`/product/${id}`)
    }



  return (
    <div className='best__product'>
        <div className='best__product--heading'>
            <h2>Best Seller</h2>
        </div>
        <div className='best__product--container'>
            {
                allBook?.data?.slice(0,4).map((data, index) => {
                    const priceAfterDiscount = data.price - (data.price * (data.discount/100)) 
                    return(
                        <div className='product-box'  key={data.id} onClick={() => handleClickDetail(data.id)}>
                            <div className='product-img'>
                                <img src={`${IMG_URL}${data.images[0]}`} alt="" />
                            </div>
                            <div className='product-desc'>
                                <p className='product-name'>{data.name}</p>
                                <span className='product-author'>{data.author}</span>
                                <span className='product-price'>${priceAfterDiscount}</span>
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