import React from 'react'
import Heading from '../../components/Heading/Heading'
import useScrollToTop from '../../hooks/useScrollToTop'
import './ContactPage.scss'
const ContactPage = () => {
    useScrollToTop()
  return (
    <div className='contact'>
        <div className='contact-banner'>
            <Heading title={"Contact Us"}/>
        </div>
        <div className='contact-container'>
            <div className='contact__left'>
                <h3 className='contact__title'>Get in touch</h3>
                <div className='contact__left--desc'>
                    <div className='contact__left--desc--text'>
                        <span>We are also active in social media. You can find us on below address.</span>
                    </div>
                    <div className='contact__left--desc--text'>
                        <span><i className="fa-solid fa-location-dot"></i></span>
                        <span>329 Queens berry Street, North Melbourne VIC 3051, Australia.</span>
                    </div>
                    <div className='contact__left--desc--text'>
                        <span><i className="fa-regular fa-clock"></i></span>
                        <span>Opening Hour 8:00 AM - 10:00 PM Monday - Sunday</span>
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
                <h3 className='contact__title'>Send a message</h3>
                <div className='contact__right--desc'>
                    <div className='contact__right--desc-text'>
                          <span>Do you have anything in your mind to tell us? Please don't hesitate to get in touch to us via our contact form.</span>
                    </div>
                    <div className='contact__right--desc--form'>
                          <form >
                              <div className='input-form'>
                                  <input required type="text" placeholder='Full Name' name='from_name'/>
                                  <input required  type="email" placeholder='Your Email' name='user_email'/>
                              </div>
                              <input required type="text" placeholder='Subject' name='subject'/>
                              <textarea required name="message" id="" cols="30" rows="10" placeholder='Your Massage'></textarea>
                              <button type='submit'>Send Message</button>
                          </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactPage