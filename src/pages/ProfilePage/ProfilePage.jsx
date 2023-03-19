import React from 'react'
import useScrollToTop from '../../hooks/useScrollToTop'
import './ProfilePage.scss'
const ProfilePage = () => {
  useScrollToTop()
  return (
    <div className='profile'>
      <form >
        <div className="profile__top">
          <div className='profile__top--img'>
              <img src="" alt="" />
          </div>
          <div className='profile__top--action'>
              <input type="text" name='image' placeholder='Image' />
          </div>
        </div>
        <div className='profile__bottom'>

            <div className='form-input'>
                <label>Name</label>
                <input type="text" name='userName' />
            </div>
            <div className='form-input'>
                <label>Phone Number</label>
                <input type="text" name='phoneNumber' placeholder='Enter your phone number'/>
            </div>
            <div className='form-input'>
                <label>Address</label>
                <input type="text" name='address' placeholder='Enter your address' />
            </div>
            <button>Save Profile</button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePage