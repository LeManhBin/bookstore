import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useScrollToTop from '../../hooks/useScrollToTop'
import { actFetchUserById, actUpdateUser } from '../../redux/features/userSlice/userSlice'
import './ProfilePage.scss'
import FormData from 'form-data'
const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)
  const [formState, setFormState] = useState(user)
  const [avatar, setAvatar] = useState(null)


  const handlePreviewAvatar = (e) => {
      const file = e.target.files[0]
      file.preview = URL.createObjectURL(file)
      setAvatar(file)
      e.target.value = null
  }

  useEffect(() => {
      return () => {
         avatar && URL.revokeObjectURL(avatar.preview)
      }

  },[avatar])


  useEffect(() => {
    dispatch(actFetchUserById(user.id))
  },[])

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData =  new FormData();
    formData.append("object", JSON.stringify(formState));
    formData.append("file", avatar);
    console.log(formData);
    dispatch(actUpdateUser(user?.id,formData))
  }

  const handleChangePhonePage = () => {
    navigate('/account/profile/phone')
  }
  const handleChangeEmailPage = () => {
    navigate('/account/profile/email')
  }
  const handleChangePasswordPage = () => {
    navigate('/account/profile/password')
  }
  useScrollToTop()
  return (
    <div className='profile'>
        <p className='heading'>Thông tin tài khoản</p>

        <div className='profile-container'>
            <div className='profile-info'>
                <span className='heading'>Thông tin cá nhân</span>
                <form onSubmit={handleSubmit}>
                  <div className='top'>
                      <div className='form-input'>
                          <img src={`${avatar ? avatar.preview : `data:image/jpeg;base64,${formState.file}`}`} />
 
                          <label htmlFor="file-upload" className='label-img'><i className="fa-solid fa-pen"></i></label>
                          <input type="file" className='input-img' id='file-upload' onChange={(e) => handlePreviewAvatar(e) }/>
                      </div>
                      <div className='form-input'>
                          <label htmlFor="">Họ & tên</label>
                          <input type="text" name="fullName" id="" value={formState?.fullName} placeholder='Thêm họ và tên' onChange={handleOnChange}/>
                      </div>
                  </div>
                  <div className='form-input'>
                      <label htmlFor="">Ngày sinh</label>
                      <input type="date"  name="" id=""/>
                  </div>
                  <div className='form-input'>
                      <label htmlFor="">Giới tính</label>
                      <div className='gender-container'>
                        <div className='gender'>
                            <input  type="radio" id="male" name="gender" checked={formState?.gender === "Nam"} value="Nam" onChange={handleOnChange}/>
                            <label htmlFor="male">Nam</label>
                        </div>
                        <div className="gender">
                            <input type="radio" id="female" name="gender" checked={formState?.gender === "Nữ"} value="Nữ" onChange={handleOnChange}/>
                            <label htmlFor="female">Nữ</label>
                        </div>
                      </div>
                  </div>
                  <button type='submit'>Lưu thay đổi</button>
                </form>
            </div>
            <div className='profile-security'>
                <span className='heading'>Số điện thoại & Email</span>
                <div className='change-container'>
                    <div className='detail'>
                      <i className="fa-solid fa-phone"></i>
                      <div className='content'>
                          <p className='title'>Số điện thoại</p>
                          <span>{formState.phone ? formState.phone : 'Thêm số điện thoại'}</span>
                      </div>
                    </div>
                    <button onClick={handleChangePhonePage}>Cập nhật</button>
                </div>
                <div className='change-container'>
                    <div className='detail'>
                      <i className="fa-solid fa-envelope"></i>
                      <div className='content'>
                          <p className='title'>Địa chỉ Email</p>
                          <span>{formState.email ? formState.email : 'Thêm số điện thoại'}</span>
                      </div>
                    </div>
                    <button onClick={handleChangeEmailPage}>Cập nhật</button>
                </div>
                <div className='change-container'>
                    <div className='detail'>
                      <i className="fa-solid fa-key"></i>
                      <div className='content'>
                          <p className='title'>Đổi mật khẩu</p>
                      </div>
                    </div>
                    <button onClick={handleChangePasswordPage}>Cập nhật</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage