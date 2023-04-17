import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import { actCreateUser } from '../../redux/features/userSlice/userSlice'
import FormData from 'form-data'
import './AddNewAccount.scss'

const initialState = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    address: '',
    role: 1,
}
const AddNewAccount = () => {
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formState, setFormState] = useState(initialState)

    const [dataImg, setDataImg] = useState(null)
 
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
        setDataImg(file)
        e.target.value = null
    }

    useEffect(() => {
        return () => {
           avatar && URL.revokeObjectURL(avatar.preview)
        }

    },[avatar])


    const handleChangeRole = (e) => {
        const {value} = e.target;
        const role = Number(value)
        setFormState(prevFormState => ({
          ...prevFormState,
          role: role
        }))
    }

    const handleChangeGender = (e) => {
        const {value} = e.target;
        const gender = value
        setFormState(prevFormState => ({
            ...prevFormState,
            gender: gender
          }))
    }
    
    const handleOnChange = (e) => {
        const {name, value} = e.target
        setFormState({
            ...formState,
            [name]: value,       
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData =  new FormData();
        formData.append("object", JSON.stringify(formState));
        formData.append("file", dataImg);
        dispatch(actCreateUser(formData))
        // navigate("/admin/account-manager")

    }
    const handleBack = () => {
        navigate('/admin/account-manager')
    }
  return (
    <div className='add-new-container'>
        <div className="heading">
            <AdminHeading title={'Thêm mới tài khoản'}/>
            <button onClick={handleBack}>Quay lại</button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='left'>
                <div className="form-input">
                    <label htmlFor="">Họ và tên</label>
                    <input required type="text" name='fullName' value={formState.fullName} onChange={handleOnChange} placeholder='Nhập họ và tên'/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Số điện thoại</label>
                    <input required type="text" name='phone' value={formState.phone} onChange={handleOnChange} placeholder='Nhập số điện thoại'/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Giới tính</label>
                    <div className='gender-container'>
                        <div className='gender'>
                            <input  type="radio" id="male" name="gender" value="Nam" onChange={handleChangeGender}/>
                            <label htmlFor="male">Nam</label>
                        </div>
                        <div className="gender">
                            <input type="radio" id="female" name="gender" value="Nữ" onChange={handleChangeGender}/>
                            <label htmlFor="female">Nữ</label>
                        </div>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="">Quyền</label>
                    <select name='role' onChange={handleChangeRole}>
                        <option value="1">Quản trị viên</option>
                        <option value="0">Người dùng</option>
                    </select>
                </div>
            </div>
            <div className='center'>
                <div className="form-input">
                    <label htmlFor="">Email</label>
                    <input required type="email" placeholder='Nhập vào email' name='email' value={formState.email} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Địa chỉ</label>
                    <input required type="text" name='address' value={formState.address} onChange={handleOnChange} placeholder='Nhập vào địa chỉ' />
                </div>
                <div className="form-input">
                    <label htmlFor="">Password</label>
                    <input required type="password" placeholder='Nhập vào password' name='password' value={formState.password} onChange={handleOnChange} />
                </div>
            </div>
            <div className='right'>
                <div className='form-input'>
                    <img src={`${avatar ? avatar.preview : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}`} />
                    <input type="file" id="file-input" name='avatar' onChange={(e) => handlePreviewAvatar(e) }/>
                    <label htmlFor="file-input" id="custom-button">Chọn ảnh</label>
                </div>
            </div>

            <button type='submit' className='add-new'>Thêm mới</button>
        </form>
    </div>
  )
}

export default AddNewAccount