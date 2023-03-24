import React from 'react'
import './ChangeEmailPage.scss'
const ChangeEmailPage = () => {
  return (
    <div className='change-page'>
        <p className='heading'>Cập nhập email</p>
        <div className="change-container">
            <span className='title'>Địa chỉ email</span>
            <form action="">
                <div className="form-input">
                    <i className="fa-solid fa-envelope"></i>
                    <input required type="email" placeholder='Nhập email'/>
                </div>
                <span className='attention'>Mã xác thực (OTP) sẽ được gửi đến email này để xác minh email là của bạn</span>
                <button>Lưu thay đổi</button>
            </form>
        </div>
    </div>
  )
}

export default ChangeEmailPage