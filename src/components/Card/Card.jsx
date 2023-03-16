import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Card.scss'
const Card = ({data}) => {
    const navigate = useNavigate()

    const handleSeeDetail = (id) => {
        navigate(`/product/${id}`)
    }

  return (
    <div className='card'>
        <div className='card-img'>
            <img src={data.img} alt="" />

            <div className='card-action'>
                <div className='add-wish-list'>
                    <i className="fa-regular fa-heart"></i>
                </div>
                <div className="add-cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
        </div>
        <div className='card-desc' onClick={() => handleSeeDetail(data.id)}>
            <p className='card-name'>{data.name}</p>
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
            <span className='card-author'>{data.author}</span>
            <span className='card-price'>${data.price}</span>
        </div>
    </div>
  )
}

export default Card