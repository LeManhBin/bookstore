import React from 'react'
import './Comment.scss'
const Comment = () => {
  return (
    <div className='comment'>
        <img src="https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=60&d=mm&r=g" alt=""  className='avatar'/>
        <div className='comment-desc'>
            <div className="star">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
            <div className='comment-name'>
                <p className='name'>Join Hiddleston</p>
                <span className='create-at'>February 15, 2022</span>
            </div>
            <div className='comment-content'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi ad magnam modi eius, odit ratione iure, maiores maxime quos harum ducimus pariatur, excepturi cumque nulla voluptatem perferendis voluptatum qui necessitatibus.
            </div>
        </div>
    </div>
  )
}

export default Comment