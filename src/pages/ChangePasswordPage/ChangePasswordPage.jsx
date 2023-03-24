import React, { useState } from 'react'
import './ChangePasswordPage.scss'
const ChangePasswordPage = () => {
    const [isShowPass, setIsShowPass] = useState(false)
    const [isShowNewPass, setShowNewPass] = useState(false)
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false)

    const handleShowPass = () => {
        setIsShowPass(!isShowPass)
    };

    const handleShowNewPass = () => {
        setShowNewPass(!isShowNewPass)
    };

    const handleShowConfirmPass = () => {
        setIsShowConfirmPass(!isShowConfirmPass)
    };
  return (
    <div className='change-pass-page'>
        <p className='heading'>Đổi mật khẩu</p>
        <div className="change-container">
            <form action="">
                <div className="form-input">
                    <label htmlFor="">Mật khẩu hiện tại</label>
                    <div className="input">
                        <input required type={`${isShowPass ? 'text' : 'password'}`} placeholder='Nhập mật khẩu hiện tại'/>
                        <i className={`${isShowPass ? "fa-regular fa-eye-slash" : "fa-regular fa-eye" }`} onClick={() => handleShowPass()}></i>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="">Mật khẩu mới</label>
                    <div className="input">
                        <input required type={`${isShowNewPass ? 'text' : 'password'}`} placeholder='Nhập mật khẩu mới'/>
                        <i className={`${isShowNewPass ? "fa-regular fa-eye-slash" : "fa-regular fa-eye" }`} onClick={() => handleShowNewPass()}></i>
                    </div>
                    <span className='attention'>Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</span>
                </div>
                <div className="form-input">
                    <label htmlFor="">Nhập lại mật khẩu mới</label>
                    <div className="input">
                        <input required type={`${isShowConfirmPass ? 'text' : 'password'}`} placeholder='Nhập lại mật khẩu mới'/>
                        <i className={`${isShowConfirmPass ? "fa-regular fa-eye-slash" : "fa-regular fa-eye" }`} onClick={() => handleShowConfirmPass()}></i>
                    </div>
                </div>
                <button>Lưu thay đổi</button>
            </form>
        </div>
    </div>
  )
}

export default ChangePasswordPage