import React, { useEffect, useState } from 'react'
import './RegisterPage.scss'
import {useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerFormSchema } from '../../constants/registerSchema'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchCheckEmailUser, actFetchOtp } from '../../redux/features/userSlice/userSlice'
import PopupOtp from '../../components/PopupOtp/PopupOtp'
import { toast } from 'react-toastify'
const initialFormValue = {
  fullName: '',
  email: '',
  password: '',
}
const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {isOtp} = useSelector((state) => state.user)
  const {otp} = useSelector((state) => state.user)
  const [checkOtp, setCheckOtp] = useState(isOtp)
  const [formData, setFormData] = useState(null)
  const [isShowPass, setIsShowPass] = useState(false)


  useEffect(() => {
    setCheckOtp(isOtp)
  },[isOtp])

  console.log(isOtp, 'đã bằng true');

  const handleLoginPage = () => {
    navigate("/login-layout")
  }
  //validate
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(registerFormSchema)
  })
  const {control , handleSubmit, formState: {errors}} = methods

  
  const onRegister = (values) => {
      dispatch(actFetchCheckEmailUser(values))
      console.log("CheckEmail", values);
      setFormData(values)
      console.log(checkOtp, 'checkOtp trong hàm đăng ký');
      if(isOtp) {
        console.log("email fetch OTP",values.email);
        dispatch(actFetchOtp(values?.email))
      }else {
        toast.warning('Tài khoản email này đã tồn tại !!!')
      }
      console.log(values, 'click');
  }

  return (
    <div className='register-page'>
      {
        checkOtp ? <PopupOtp formData={formData} otp={otp} setCheckOtp={setCheckOtp}/> : ""
      }
    <div className='register-container'>
        <div className='register__banner'>
            {/* <img className='image' src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" /> */}
        </div>
        <div className='register__form'>
            <div className='register__form--heading'>
                <h3>Create an account</h3>
                <span>Let's experience new and wonderful things together</span>
            </div>
            <form onSubmit={handleSubmit(onRegister)}>
                {!!errors.fullName && <span style={{color: 'red', textAlign:'left'}}>{errors.fullName.message}</span>}
                <Controller
                  name='fullName'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <input value={value} onChange={onChange} type="text" placeholder='Name'/>
                  )}
                />

                {!!errors.email && <span style={{color: 'red', textAlign:'left'}}>{errors.email.message}</span>}
                <Controller
                  name='email'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <input value={value} onChange={onChange} type="email" placeholder='Email'/>
                  )}
                />

                {!!errors.password && <span style={{color: 'red', textAlign:'left'}}>{errors.password.message}</span>}
                <Controller
                  name='password'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <div className='pass'>
                      <input value={value} onChange={onChange} type={isShowPass ? `text` : 'password'} placeholder='Password'/>
                      <span onClick={() => setIsShowPass(!isShowPass)}>
                        {
                        isShowPass ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>
                        }
                      </span>
                    </div>
                  )}
                />
                <span onClick={handleLoginPage}>I already have an account</span>
                <div className='register__btn'>
                    <button className='register__btn--signin' type='submit'>Create account</button>
                    <button className='register__btn--google'>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png" alt="" />
                      <span>Sign up with Google</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
  )
}

export default RegisterPage