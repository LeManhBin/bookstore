import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import { actFetchUserById, actUpdateUser } from '../../redux/features/userSlice/userSlice'
import FormData from 'form-data'
import './UpdateAccount.scss'
const UpdateAccount = () => {
    const navigate = useNavigate()
    const param = useParams()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const [formUpdate, setFormUpdate] = useState(user)
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
        dispatch(actFetchUserById(Number(param.idAccount)))
    },[param])

    useEffect(() => {
        setFormUpdate(user)
    },[user])


    const handleOnChange = (e) =>  {
        const name = e.target.name;
        const value = e.target.value;
        setFormUpdate((prevState) => ({
            ...prevState,
            image: null,
            user: {
            ...prevState.user,
            [name]: value,
            },
        }));
    }

    const handleChangeRole = (e) => {
        const value = e.target.value;
        const role = Number(value)
        setFormUpdate(prevFormState => ({
          ...prevFormState,
          role: role
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const formData =  new FormData();
        formData.append("object", JSON.stringify(formUpdate.user));
        console.log(JSON.stringify(formUpdate.user), 'usẻ');
        formData.append("file", avatar);
        dispatch(actUpdateUser(formUpdate.user.id,formData))
    }
    const handleBack = () => {
        navigate('/admin/account-manager')
    }
  return (
    <div className='update'>
        <div className="heading">
            <AdminHeading title={'Cập nhật tài khoản'}/>
            <button onClick={handleBack}>Quay lại</button>
        </div>
        <form onSubmit={handleUpdate}>
            <div className='left'>
                <div className="form-input">
                    <label htmlFor="">Họ và tên</label>
                    <input required type="text" name='name' placeholder='Nhập họ và tên'
                        value={formUpdate.user?.name} onChange={handleOnChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">Số điện thoại</label>
                    <input required type="text" name='phone' placeholder='Nhập số điện thoại'
                        value={formUpdate.user?.phone} onChange={handleOnChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">Giới tính</label>
                    <div className='gender-container'>
                        <div className='gender'>
                            <input type="radio" id="male" name="gender" value="Nam" onChange={handleOnChange}/>
                            <label htmlFor="male">Nam</label>
                        </div>
                        <div className="gender">
                            <input type="radio" id="female" name="gender" value="Nữ" onChange={handleOnChange}/>
                            <label htmlFor="female">Nữ</label>
                        </div>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="">Quyền</label>
                    <select name='role' value={formUpdate.user?.role} onChange={handleChangeRole}>
                        <option value="1">Quản trị viên</option>
                        <option value="0">Người dùng</option>
                    </select>
                </div>
            </div>
            <div className='center'>
                <div className="form-input">
                    <label htmlFor="">Email</label>
                    <input required type="email" placeholder='Nhập vào email' name='email' 
                        value={formUpdate.user?.email} onChange={handleOnChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">Địa chỉ</label>
                    <input required type="text" name='address'  placeholder='Nhập vào địa chỉ' 
                    value={formUpdate.user?.address} onChange={handleOnChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">Password</label>
                    <input required type="password" placeholder='Nhập vào password' name='password' 
                    value={formUpdate.user?.password} onChange={handleOnChange}
                    
                    />
                </div>
            </div>
            <div className='right'>
                <div className='form-input'>
                    <img src={`${avatar ? avatar.preview : `data:image/jpeg;base64,${formUpdate.image}`}`} />
                    <input type="file" id="file-input" name='avatar' onChange={(e) => handlePreviewAvatar(e) }/>
                    <label htmlFor="file-input" id="custom-button">Chọn ảnh</label>
                </div>
            </div>

            <button type='submit' className='add-new'>Cập nhật</button>
        </form>
    </div>
  )
}

export default UpdateAccount