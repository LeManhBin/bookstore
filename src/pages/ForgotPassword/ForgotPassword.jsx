import React, { useEffect, useState } from 'react'
import './ForgotPassword.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchOtp } from '../../redux/features/userSlice/userSlice'
import PopupOtpReset from '../../components/PopupOtpReset/PopupOtpReset'
import { toast } from 'react-toastify'
const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const {otp} = useSelector((state) => state.user)
    const [checkResetOtp, setCheckResetOtp] = useState(false)
  

    const dispatch = useDispatch()

    const handlePageRegister = () => {
        navigate("/login-layout/register")
    }

    const handleLoginPage = () => {
        navigate("/login-layout")
    }


    const handleForgotPassword = (e) => {
        e.preventDefault()
        if(email) {
            setCheckResetOtp(true)
            dispatch(actFetchOtp(email))
            sessionStorage.setItem('email', email);
        }else{
            toast.warning("No thing?")
        }
    }
  return (
    <div className='forgot-page'>
        {
            checkResetOtp ? <PopupOtpReset otp={otp} setCheckResetOtp={setCheckResetOtp}/> : ""
        }
        <div className='forgot-container'>
            <h3>Quên mật khẩu</h3>
            <form action="">
                <div className="form-input">
                    <label htmlFor="">Email</label>
                    <input required={true} type="text" placeholder='Nhập email của bạn' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button onClick={handleForgotPassword}>Đổi mật khẩu</button>
            </form>
            <div className='act-sec'>
                <p onClick={handleLoginPage}>Quay lại đăng nhập</p>
                <p onClick={handlePageRegister}>Đăng ký tài khoản mới</p>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword