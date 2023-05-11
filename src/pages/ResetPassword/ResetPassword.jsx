import React, { useEffect, useState } from 'react'
import './ResetPassword.scss'
import {useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { resetPasswordFormSchema } from '../../constants/resetPasswordSchema'
import { actResetPassword } from '../../redux/features/userSlice/userSlice'
const initialFormValue = {
    newPassword: '',
    confirmPassword: '',
  }
const ResetPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isShowPass, setIsShowPass] = useState(false)
    const [isShowPass1, setIsShowPass1] = useState(false)
    
    const email = sessionStorage.getItem("email")
    //validate
    const methods = useForm({
      defaultValues: initialFormValue,
      resolver: yupResolver(resetPasswordFormSchema)
    })
    const {control , handleSubmit, formState: {errors}} = methods
  
    
    const onReset = (values) => {
        const resetData = {
            newPassword: values.newPassword,
            email: email
        }
        dispatch(actResetPassword(resetData))
        sessionStorage.removeItem('email');
    }

    
    const handlePageRegister = () => {
        navigate("/login-layout/register")
    }

    const handleLoginPage = () => {
        navigate("/login-layout")
    }
  return (
    <div className='reset-page'>
        <div className='reset-container'>
            <div className='reset__banner'>
                {/* <img className='image' src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" /> */}
            </div>
            <div className='reset__form'>
                <div className='reset__form--heading'>
                    <h3>Tạo lại mật khẩu của bạn</h3>
                    <span>Let's experience new and wonderful things together</span>
                </div>
                <form onSubmit={handleSubmit(onReset)}>

                    {!!errors.newPassword && <span style={{color: 'red', textAlign:'left'}}>{errors.newPassword.message}</span>}
                    <Controller
                    name='newPassword'
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <div className='pass'>
                        <input value={value} onChange={onChange} type={isShowPass ? `text` : 'password'} placeholder='Nhập mật khẩu mới'/>
                        <span onClick={() => setIsShowPass(!isShowPass)}>
                            {
                            isShowPass ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>
                            }
                        </span>
                        </div>
                    )}
                    />

                    {!!errors.confirmPassword && <span style={{color: 'red', textAlign:'left'}}>{errors.confirmPassword.message}</span>}
                    <Controller
                    name='confirmPassword'
                    control={control}
                    render={({field: {value, onChange}}) => (
                        <div className='pass'>
                        <input value={value} onChange={onChange} type={isShowPass1 ? `text` : 'password'} placeholder='Nhập lại mật khẩu mới'/>
                        <span onClick={() => setIsShowPass1(!isShowPass1)}>
                            {
                            isShowPass1 ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>
                            }
                        </span>
                        </div>
                    )}
                    />
                    <div className='reset__btn'>
                        <button className='reset__btn--signin' type='submit'>Tạo mật khẩu mới</button>
                    </div>
                </form>
                <div className='act-sec'>
                    <p onClick={handleLoginPage}>Quay lại đăng nhập</p>
                    <p onClick={handlePageRegister}>Đăng ký tài khoản mới</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword