import React from 'react'
import './CommentInput.scss'
const CommentInput = () => {
  return (
    <div className='comment-input'>
        <div className='rating'>
            <span className='title'>Your rating</span>
            <div className='star'>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
        </div>
        <textarea name="" id="" cols="30" rows="10" placeholder='Your review'></textarea>
        <button>Submit</button>
    </div>
  )
}

export default CommentInput