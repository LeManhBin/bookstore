import React, { useState } from 'react'
import './ViewContact.scss'
const ViewContact = ({setIsWatchContact}) => {
    const [reply, setReply] = useState(false)

  return (
    <div className='view-contact'>
        <span className='close-btn' onClick={() => setIsWatchContact(false)}><i className="fa-solid fa-xmark"></i></span>
        <div className="heading">
            <h3>Chi tiết liên hệ</h3>
        </div>
        {
            reply
            ?
            <form>
                <div className='input-form'>
                    <input required type="text" placeholder='Full Name' name='from_name'/>
                    <input required  type="email" placeholder='Your Email' name='user_email'/>
                </div>
                <input required type="text" placeholder='Subject' name='subject'/>
                <textarea required name="message" id="" cols="30" rows="10" placeholder='Your Massage'></textarea>
                <button type='submit'>Phản hồi</button>
            </form>
            :
            <div className="contact-container">
            <div className='contact-detail'>
                <div className='contact'>
                    <span className='title'>Tiêu đề: </span>
                    <span className='detail'>Web lag quá anh ơi</span>
                </div>
                <div className='contact'>
                    <span className='title'>Họ Tên: </span>
                    <span className='detail'>Lê Mạnh Bin</span>
                </div>
                <div className='contact'>
                    <span className='title'>Email: </span>
                    <span className='detail'>llemanhbin@gmail.com</span>
                </div>
                <div className='content'>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta mollitia eaque delectus doloremque aliquam nobis quam architecto ut aperiam. A minus, esse autem architecto non ullam fugiat iusto veritatis sint?</p>
                </div>
            </div>
            <button onClick={() => setReply(true)}>Trả lời</button>
        </div>
        }

    </div>
  )
}

export default ViewContact