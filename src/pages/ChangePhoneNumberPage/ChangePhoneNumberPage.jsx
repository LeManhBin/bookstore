import React from 'react'
import './ChangePhoneNumberPage.scss'
const ChangePhoneNumberPage = () => {
  return (
    <div className='change-page'>
        <p className='heading'>Cập nhập số điện thoại</p>
        <div className="change-container">
            <span className='title'>Số điện thoại</span>
            <form action="">
                <div className="form-input">
                    <i className="fa-solid fa-phone"></i>
                    <input required type="text" placeholder='Nhập số điện thoại'/>
                </div>
                <span className='attention'>Mã xác thực (OTP) sẽ được gửi đến số điện thoại này để xác minh số điện thoại là của bạn</span>
                <button>Lưu thay đổi</button>
            </form>
        </div>
    </div>
  )
}

export default ChangePhoneNumberPage