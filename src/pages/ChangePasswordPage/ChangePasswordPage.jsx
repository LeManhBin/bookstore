import React, { useState } from 'react'
import './ChangePasswordPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import FormData from 'form-data'
import { toast } from 'react-toastify'
import { actUpdatePassword } from '../../redux/features/userSlice/userSlice'
import Account from '../../components/Account/Account'
const ChangePasswordPage = () => {
    const [isShowPass, setIsShowPass] = useState(false)
    const [isShowNewPass, setShowNewPass] = useState(false)

    const handleShowPass = () => {
        setIsShowPass(!isShowPass)
    };

    const handleShowNewPass = () => {
        setShowNewPass(!isShowNewPass)
    };


    const {user} = useSelector((state) => state.user)
    const initialState = {
        oldPassword: '',
        newPassword: '',
    }
    const [formState, setFormState] = useState(initialState)
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
        if(!formState.oldPassword || !formState.newPassword){
            toast.warning('Vui lòng nhập đủ thông tin!')
        }else {
            dispatch(actUpdatePassword(user.id, formState))
        }
    }
  return (
    <div className='change-pass-page'>
        <div className="left">
            <Account/>
        </div>
        <div className="change-container">
            <form action="" onSubmit={handleUpdatePhone}>
                <div className="form-input">
                    <label htmlFor="">Mật khẩu hiện tại</label>
                    <div className="input">
                        <input  type={`${isShowPass ? 'text' : 'password'}`} name='oldPassword' value={formState.oldPassword} onChange={handleOnChange} placeholder='Nhập mật khẩu hiện tại' />
                        <i className={`${isShowPass ? "fa-regular fa-eye-slash" : "fa-regular fa-eye" }`} onClick={() => handleShowPass()}></i>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="">Mật khẩu mới</label>
                    <div className="input">
                        <input  type={`${isShowNewPass ? 'text' : 'password'}`} name='newPassword' onChange={handleOnChange} placeholder='Nhập mật khẩu mới'/>
                        <i className={`${isShowNewPass ? "fa-regular fa-eye-slash" : "fa-regular fa-eye" }`} onClick={() => handleShowNewPass()}></i>
                    </div>
                    <span className='attention'>Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</span>
                </div>
                <button type='submit'>Lưu thay đổi</button>
            </form>
        </div>
    </div>
  )
}

export default ChangePasswordPage