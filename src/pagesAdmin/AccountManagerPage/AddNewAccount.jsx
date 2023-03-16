import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './AddNewAccount.scss'
const AddNewAccount = () => {
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()

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

    const handleBack = () => {
        navigate('/admin/account')
    }
  return (
    <div className='add-new-container'>
        <div className="heading">
            <AdminHeading title={'Thêm mới tài khoản'}/>
            <button onClick={handleBack}>Quay lại</button>
        </div>
        <form action="">
            <div className='left'>
                <div className="form-input">
                    <label htmlFor="">Họ và tên</label>
                    <input type="text" />
                </div>
                <div className="form-input">
                    <label htmlFor="">Địa chỉ</label>
                    <input type="text" />
                </div>
                <div className="form-input">
                    <label htmlFor="">Quyền</label>
                    <select>
                        <option value="">Quản trị viên</option>
                        <option value="">Cửa hàng</option>
                        <option value="">Người dùng</option>
                    </select>
                </div>
            </div>
            <div className='center'>
                <div className="form-input">
                    <label htmlFor="">Email</label>
                    <input type="email" />
                </div>
                <div className="form-input">
                    <label htmlFor="">Địa chỉ</label>
                    <input type="text" />
                </div>
                <div className="form-input">
                    <label htmlFor="">Password</label>
                    <input type="password" />
                </div>
            </div>
            <div className='right'>
                <div className='form-input'>
                    <img src={`${avatar ? avatar.preview : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}`} />
                    <input type="file" id="file-input" onChange={(e) => handlePreviewAvatar(e) }/>
                    <label htmlFor="file-input" id="custom-button">Chọn ảnh</label>
                </div>
            </div>

            <button className='add-new'>Thêm mới</button>
        </form>
    </div>
  )
}

export default AddNewAccount