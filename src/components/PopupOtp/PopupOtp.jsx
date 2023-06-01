import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { actFetchOtp, actRegister } from '../../redux/features/userSlice/userSlice';
import './PopupOtp.scss'
const PopupOtp = ({formData, otp, setCheckOtp}) => {
  const dispatch = useDispatch()
  const [formOtp, setFormOtp] = useState("")
  const handleSubmit = () => {
    if(!formOtp){
      toast.error('Vui lòng nhập mã OTP')
    }else if(otp == formOtp) {
      dispatch(actRegister(formData))
      console.log("Băn lên đăng ký", formData);
      setCheckOtp(false)
    }else {
      toast.error("Mã xác nhận không chính xác!!")
    }
  }

  const handleGetOtp = () => {
    dispatch(actFetchOtp(formData?.email))
  }

  const handleClose = () => {
    setCheckOtp(false)
  }
  return (
    <div className='otp-modal'>
        <div className="title">Nhập mã xác nhận <span onClick={handleClose}><i className="fa-solid fa-xmark"></i></span></div>
        <p>Mã OTP đã được gửi về email của bạn</p>
        <div className='input-otp'>
          <input type="text" value={formOtp} onChange={(e) => setFormOtp(e.target.value)}/>
          <button className='continue-btn' style={{backgroundColor: `#159895`}} onClick={handleSubmit} >Xác nhận</button>
        </div>
        <div className='class'>
          <span >Bạn không nhận được mã xác nhận ?</span>
          <div className='again'>
            <span>Vui lòng nhấn</span>
            <button onClick={handleGetOtp}>Gửi lại mã</button>
          </div>
          <p>Hoặc <span style={{color: '#F65D4E', cursor: 'pointer'}}>báo lỗi không gửi được tin nhắn</span> </p>
        </div>
    </div>
  )
}

export default PopupOtp