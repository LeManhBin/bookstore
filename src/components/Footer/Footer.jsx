import React from 'react'
import "./Footer.css"
const Footer = () => {

  return (
   <footer> 
        <div className="col">
            <img src="" alt=""  className='LOGO'/>
            <h4>Contact</h4>
            <p><span>Address: </span>Da Nang, Viet Nam</p>
            <p><span>Phone: </span>0365160470</p>
            <p><span>Hours: </span>08:00 - 22:00, Mon - Sun</p>
            <div className="follow">
                <h4>Follow</h4>
                <div className="social">
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-pinterest-p"></i>
                    <i className="fa-brands fa-youtube"></i>
                </div>
            </div>
        </div>
        <div className="col">
            <h4>About</h4>
            <a href="">About Us</a>
            <a href="">Delivery Information</a>
            <a href="">Privacy Policy</a>
            <a href="">Trems & Conditions</a>
            <a href="">Contact Us</a>
        </div>
        <div className="col">
            <h4>My Account</h4>
            <a href="">Sign In</a>
            <a href="">View Cart</a>
            <a href="">My Wishlist</a>
            <a href="">Track My Order</a>
            <a href="">Help</a>
        </div>

        <div className='col install'>
          <h4>Install App</h4>
          <a href="">From App Store or Google Play</a>
          <div className='row'>
              <img src="https://play.google.com/about/howplayworks/static/assets/social/share_google_play_logo.png" alt="" />
              <img src="https://www.macworld.com/wp-content/uploads/2023/01/iphone_cant_connect_to_app_store_800home.jpg?quality=50&strip=all" alt="" />
          </div>
          <p>Secured Payment Gateways</p>
          <img className='zalopay' src="https://img.websosanh.vn/v2/users/financial/images/ypa8r8jf575ck.jpg?compress=85" alt="" />
        </div>

   </footer>
  )
}

export default Footer