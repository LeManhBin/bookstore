import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { actRegister } from '../../redux/features/userSlice/userSlice';
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

  const handleClose = () => {
    setCheckOtp(false)
  }
  return (
    <div className='otp-modal'>
        <div className="title">Nhập mã xác nhận <span onClick={handleClose}><i className="fa-solid fa-xmark"></i></span></div>
        <p>Mã OTP đã được gửi về email của bạn</p>
        <input type="text" value={formOtp} onChange={(e) => setFormOtp(e.target.value)}/>
        <div className='button'>
            <button className='continue-btn' style={{backgroundColor: `#159895`}} onClick={handleSubmit} >Xác nhận</button>
        </div>
    </div>
  )
}

export default PopupOtp