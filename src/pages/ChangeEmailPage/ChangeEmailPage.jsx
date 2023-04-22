import React, { useState } from 'react'
import './ChangeEmailPage.scss'
import FormData from 'form-data'
import { useDispatch, useSelector } from 'react-redux'
import {actUpdateProfile } from '../../redux/features/userSlice/userSlice'
import Account from '../../components/Account/Account'
const ChangeEmailPage = () => {
  const {user} = useSelector((state) => state.user)
  const [formState, setFormState] = useState(user)
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }


  const handleUpdateEmail = (e) => {
    e.preventDefault()
    const formData =  new FormData();
    const formPost = Object.assign({}, formState);
    delete formPost.imageBytes;
    formData.append("object", JSON.stringify(formPost));
    formData.append("file", formState.avatar);
    dispatch(actUpdateProfile(user?.id,formData, formState))
  }
  return (
    <div className='change-page'>
        <div className="left">
          <Account/>
        </div>
        <div className="change-container">
            <form action="" onSubmit={handleUpdateEmail}>
                <span className='title'>Địa chỉ email</span>
                <div className="form-input">
                    <i className="fa-solid fa-envelope"></i>
                    <input required type="email" placeholder='Nhập email' name='email' value={formState.email} onChange={handleOnChange}/>
                </div>
                <span className='attention'>Mã xác thực (OTP) sẽ được gửi đến email này để xác minh email là của bạn</span>
                <button type='submit'>Lưu thay đổi</button>
            </form>
        </div>
    </div>
  )
}

export default ChangeEmailPage