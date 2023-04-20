import React from 'react'
import './Comment.scss'
import { IMG_URL } from '../../constants/config';
const Comment = ({data}) => {

  return (
    <div className='comment'>
        <img src={`${IMG_URL}${data.avatar}`} alt="avatar"  className='avatar'/>  
        <div className='comment-desc'>
            <div className="star">
                {
                Array(data?.star).fill().map((_, index) => (
                    <i className="fa-solid fa-star" key={index} style={{cursor: 'pointer', margin: '5px', fontSize: '14px', color: '#FFD93D'}}></i>               
                ))
                }
            </div>
            <div className='comment-name'>
                <p className='name'>{data?.fullName}</p>
                <span className='create-at'>{data?.createDate}</span>
            </div>
            <div className='comment-content'>
                {data?.comment}
            </div>
        </div>
    </div>
  )
}

export default Comment