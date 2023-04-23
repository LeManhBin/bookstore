import React, { useState } from 'react'
import './ChangePhoneNumberPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actUpdateProfile } from '../../redux/features/userSlice/userSlice'
import FormData from 'form-data'
import Account from '../../components/Account/Account'
const ChangePhoneNumberPage = () => {

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


  const handleUpdatePhone = (e) => {
    e.preventDefault()
    const formData =  new FormData();
    const formPost = Object.assign({}, formState);
    delete formPost.imageBytes;
    formData.append("object", JSON.stringify(formPost));
    formData.append("file", formState.avatar);
    dispatch(actUpdateProfile(user?.id,formData, formState))
  }
  return (
    <div className='change-phone-page'>
        <div className="container">
          <div className="left">
            <Account/>
          </div>
          <div className="change-container">
              <span className='title'>Số điện thoại</span>
              <form action="" onSubmit={handleUpdatePhone}>
                  <div className="form-input">
                      <i className="fa-solid fa-phone"></i>
                      <input required type="text" placeholder='Nhập số điện thoại' name='phone' value={formState.phone} onChange={handleOnChange}/>
                  </div>
                  <span className='attention'>Mã xác thực (OTP) sẽ được gửi đến số điện thoại này để xác minh số điện thoại là của bạn</span>
                  <button type='submit'>Lưu thay đổi</button>
              </form>
          </div>
        </div>
    </div>
  )
}

export default ChangePhoneNumberPage