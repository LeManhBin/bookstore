import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginFormSchema } from '../../constants/loginSchema';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchLogin } from '../../redux/features/userSlice/userSlice';

const initialFormValue = {
    email: '',
    password: ''
}
const LoginPage = () => {
  const dispatch = useDispatch()
  const {isLoading} = useSelector((state) => state.user) 
  const {isLogged} = useSelector((state) => state.user) 
    const navigate = useNavigate()
    const [isShowPass, setIsShowPass] = useState(false)
    //Validate
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(loginFormSchema)
  })
  const {control, handleSubmit, formState: {errors}} = methods

  const onLogin = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    }
    dispatch(actFetchLogin(payload))
  }

  useEffect(() => {
    if(isLogged === true) {
      navigate('/')
    }
  },[isLogged, navigate])

  const handlePageRegister = () => {
    navigate("/login-layout/register")
  }

  return (
    <div className='login-page'>
        <div className='login-container'>
            <div className='login__form'>
                <div className='login__form--heading'>
                    <h3>Login account</h3>
                    <span>Let's experience new and wonderful things together</span>
                </div>
                <form onSubmit={handleSubmit(onLogin)}>
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
                    <span onClick={handlePageRegister}>I don't have an account?</span>
                    <div className='login__btn'>
                        <button className='login__btn--signin' type='submit' disabled={isLoading}>Sign in</button>
                        <button className='login__btn--google'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png" alt="" />
                        <span>Sign in with Google</span>
                        </button>
                    </div>
                </form>
            </div>
            <div className='login__banner'>
                {/* <img src="https://www.reshot.com/preview-assets/illustrations/SUBYW3HTFQ/secure-credit-card-SUBYW3HTFQ-w1600-07817.jpg" alt="" /> */}
            </div>
        </div>
    </div>
  )
}

export default LoginPage