import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Heading from '../../components/Heading/Heading'
import useScrollToTop from '../../hooks/useScrollToTop'
import { actCreateContact } from '../../redux/features/contactSlice/contactSlice'
import './ContactPage.scss'

  const initialContact = {
    name: "",
    gmail: "",
    subject: "",
    content: "",
  }
const ContactPage = () => {
    useScrollToTop()
    const dispatch = useDispatch()
    const [formState, setFormState] = useState(initialContact)

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(actCreateContact(formState))
    }
  return (
    <div className='contact'>
        <div className='contact-banner'>
            <Heading title={"Liên hệ"}/>
        </div>
        <div className='contact-container'>
            <div className='contact__left'>
                <h3 className='contact__title'>Thông tin liên lạc</h3>
                <div className='contact__left--desc'>
                    <div className='contact__left--desc--text'>
                        <span>Chúng tôi hoạt động trên nhiều nền tảng. Bạn có thể liên lạc với chúng tôi qua địa chỉ dưới đây.</span>
                    </div>
                    <div className='contact__left--desc--text'>
                        <span><i className="fa-solid fa-location-dot"></i></span>
                        <span>03 Quang Trung, Thạch Thang, Hải Châu, Đà Nẵng</span>
                    </div>
                    <div className='contact__left--desc--text'>
                        <span><i className="fa-regular fa-clock"></i></span>
                        <span>Opening Hour 24/24 Monday - Sunday</span>
                    </div>
                    <div className='contact__left--desc--text'>
                        <span>Call. <b>(+84) 365160470</b></span>
                        <span>Email. <b>llemanhbin@gmail.com</b></span>
                    </div>
                    <div className='contact__left--desc--social'>
                        <span className='facebook'><i className="fa-brands fa-facebook-f"></i></span>
                        <span className='twitter'><i className="fa-brands fa-twitter"></i></span>
                        <span className='google'><i className="fa-brands fa-google"></i></span>
                        <span className='youtube'><i className="fa-brands fa-youtube"></i></span>
                    </div>
                </div>
            </div>
            <div className='contact__right'>
                <h3 className='contact__title'>Gửi tin nhắn</h3>
                <div className='contact__right--desc'>
                    <div className='contact__right--desc-text'>
                          <span>Bạn có bất cứ điều gì để nói với chúng tôi? Vui lòng liên hệ với chúng tôi qua biểu mẫu liên hệ.</span>
                    </div>
                    <div className='contact__right--desc--form'>
                          <form onSubmit={handleSubmit}>
                              <div className='input-form'>
                                  <input required type="text" placeholder='Full Name' name='name' onChange={handleOnChange}/>
                                  <input required  type="email" placeholder='Your Email' name='gmail' onChange={handleOnChange}/>
                              </div>
                              <input required type="text" placeholder='Subject' name='subject' onChange={handleOnChange}/>
                              <textarea required name="content" id="" cols="30" rows="10" placeholder='Your Massage' onChange={handleOnChange}></textarea>
                              <button type='submit'>Gửi tin nhắn</button>
                          </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactPage