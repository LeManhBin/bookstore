import React from 'react'
import { useNavigate } from 'react-router-dom'
import useScrollToTop from '../../hooks/useScrollToTop'
import './ProfilePage.scss'
const ProfilePage = () => {
  const navigate = useNavigate()

  const handleChangePhonePage = () => {
    navigate('/account/profile/phone')
  }
  const handleChangeEmailPage = () => {
    navigate('/account/profile/email')
  }
  const handleChangePasswordPage = () => {
    navigate('/account/profile/password')
  }
  useScrollToTop()
  return (
    <div className='profile'>
        <p className='heading'>Thông tin tài khoản</p>

        <div className='profile-container'>
            <div className='profile-info'>
                <span className='heading'>Thông tin cá nhân</span>
                <form action="">
                  <div className='top'>
                      <div className='form-input'>
                          <img src="" alt="avatar" />
                          <label htmlFor="file-upload" className='label-img'><i className="fa-solid fa-pen"></i></label>
                          <input type="file" className='input-img' id='file-upload'/>
                      </div>
                      <div className='form-input'>
                          <label htmlFor="">Họ & tên</label>
                          <input type="text" name="" id="" placeholder='Thêm họ và tên'/>
                      </div>
                  </div>
                  <div className='form-input'>
                      <label htmlFor="">Ngày sinh</label>
                      <input type="date" name="" id=""/>
                  </div>
                  <div className='form-input'>
                      <label htmlFor="">Giới tính</label>
                      <div className='gender-container'>
                        <div className='gender'>
                            <input  type="radio" id="male" name="gender" value="Nam"/>
                            <label htmlFor="male">Nam</label>
                        </div>
                        <div className="gender">
                            <input type="radio" id="female" name="gender" value="Nữ"/>
                            <label htmlFor="female">Nữ</label>
                        </div>
                      </div>
                  </div>
                  <button>Lưu thay đổi</button>
                </form>
            </div>
            <div className='profile-security'>
                <span className='heading'>Số điện thoại & Email</span>
                <div className='change-container'>
                    <div className='detail'>
                      <i className="fa-solid fa-phone"></i>
                      <div className='content'>
                          <p className='title'>Số điện thoại</p>
                          <span>0365160470</span>
                      </div>
                    </div>
                    <button onClick={handleChangePhonePage}>Cập nhật</button>
                </div>
                <div className='change-container'>
                    <div className='detail'>
                      <i className="fa-solid fa-envelope"></i>
                      <div className='content'>
                          <p className='title'>Địa chỉ Email</p>
                          <span>llemanhbin@gmail.com</span>
                      </div>
                    </div>
                    <button onClick={handleChangeEmailPage}>Cập nhật</button>
                </div>
                <div className='change-container'>
                    <div className='detail'>
                      <i class="fa-solid fa-key"></i>
                      <div className='content'>
                          <p className='title'>Đổi mật khẩu</p>
                      </div>
                    </div>
                    <button onClick={handleChangePasswordPage}>Cập nhật</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage