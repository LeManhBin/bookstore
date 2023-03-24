import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'


const initialState = {
    name: '',
    avatar: '',
    phone: '',
    email: '',
    address: '',
}
const AddNewStore = () => {
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formState, setFormState] = useState(initialState)
 

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

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setFormState({
            ...formState,
            [name]: value,       
        })
    }

    const handleBack = () => {
        navigate('/admin/store-list')
    }
  return (
    <div className='add-new-container'>
        <div className="heading">
            <AdminHeading title={'Thêm mới cửa hàng'}/>
            <button onClick={handleBack}>Quay lại</button>
        </div>
        <form >
            <div className='left'>
                <div className="form-input">
                    <label htmlFor="">Tên Cửa Hàng</label>
                    <input required type="text" name='name' value={formState.name} onChange={handleOnChange} placeholder='Nhập họ và tên'/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Số điện thoại</label>
                    <input required type="text" name='phone' value={formState.phone} onChange={handleOnChange} placeholder='Nhập số điện thoại'/>
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

export default AddNewStore