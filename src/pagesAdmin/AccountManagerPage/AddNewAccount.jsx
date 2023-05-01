import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import { actCreateUser } from '../../redux/features/userSlice/userSlice'
import FormData from 'form-data'
import './AddNewAccount.scss'
import { toast } from 'react-toastify'
import AddressPopup from '../../components/AddressPopup/AddressPopup'
import { actFetchDataDistrict, actFetchDataProvince, actFetchDataWard } from '../../redux/features/provinceSlice/provinceSlice'

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
    const [isAddress, setIsAddress] = useState(false)
    const [dataImg, setDataImg] = useState(null)

    const initialAddress = {
        houseNumber: "",
        provinceName: "",
        province_id: "",
        districtName: "",
        district_id: "",
        wardName: "",
        ward_id: "",
    }
    const [addressState, setAddressState] = useState(initialAddress)
    
    const {province} = useSelector((state) => state.province)
    const {district} = useSelector((state) => state.province)
    const {ward} = useSelector((state) => state.province)
    
    useEffect(() => {
        dispatch(actFetchDataProvince())
    },[])
    
    useEffect(() => {
        if(addressState.province_id) {
            dispatch(actFetchDataDistrict(addressState.province_id))
        }
    },[addressState])
    
    useEffect(() => {
        if(addressState.province_id && addressState.district_id) {
            dispatch(actFetchDataWard(addressState.district_id))
        }
    },[addressState])
    
    
    
    const handleOnChangeProvince = (e) => {
        const {value} = e.target
        let num = "";
        let text = "";
        console.log(value);
        for (let i = 0; i < value.length; i++) {
            if (isNaN(value[i])) {
                text += value[i];
            } else {
                num += value[i];
            }
        }
        setAddressState({
            ...addressState,
            province_id: Number(num),
            provinceName: text
        })
    }
    const handleOnChangeDistrict = (e) => {
        const {value} = e.target
        let num = "";
        let text = "";
    
        for (let i = 0; i < value.length; i++) {
            if (isNaN(value[i])) {
                text += value[i];
            } else {
                num += value[i];
            }
        }
        setAddressState({
            ...addressState,
            district_id: Number(num),
            districtName: text
        })
    }
    const handleOnChangeWard = (e) => {
        const {value} = e.target
        let num = "";
        let text = "";
    
        for (let i = 0; i < value.length; i++) {
            if (isNaN(value[i])) {
                text += value[i];
            } else {
                num += value[i];
            }
        }
        setAddressState({
            ...addressState,
            ward_id: Number(num),
            wardName: text
        })
    }
    
    const handelOnChangeNumberHouse = (e) => {
        const {value} = e.target
        setAddressState({
            ...addressState,
            houseNumber: value
        })
    }
    const data = {
      provinceId: addressState?.province_id,
      districtId: addressState?.district_id,
      wardId: addressState?.ward_id,
      fullAddress: `${addressState.houseNumber} - ${addressState.provinceName} - ${addressState.districtName} - ${addressState.wardName}`
    }

    useEffect(() => {
        setFormState({
          ...formState,
          address: data,
        })
      },[addressState])
 
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

        if(!formState.fullName || !formState.email || !formState.gender || !formState.phone || !formState.password ){
            toast.warning("Vui lòng điền đầy đủ thông tin người dùng!")
        }else {
            dispatch(actCreateUser(formData))
        }
        console.log(formState);

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
            {
                isAddress && <AddressPopup setIsAddress={setIsAddress}/>
            }
            <div className='left'>
                <div className="form-input">
                    <label htmlFor="">Họ và tên</label>
                    <input type="text" name='fullName' value={formState.fullName} onChange={handleOnChange} placeholder='Nhập họ và tên'/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" name='phone' value={formState.phone} onChange={handleOnChange} placeholder='Nhập số điện thoại'/>
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
                    <input type="email" placeholder='Nhập vào email' name='email' value={formState.email} onChange={handleOnChange}/>
                </div>
                <div className="form-input" style={{width: "225px"}}>
                  <label htmlFor="">Địa chỉ</label>
                      <input type="text" placeholder='Nhập số nhà' value={addressState.houseNumber} onChange={handelOnChangeNumberHouse}/>
                        <div className="input-select">
                        <select name="province_id" id="" onChange={handleOnChangeProvince}>
                            <option value="">Chọn tỉnh</option>
                            {
                                province.map(data => (
                                    <option  key={data?.ProvinceID} value={`${data?.ProvinceID}${data?.ProvinceName}`}>{data?.ProvinceName}</option>
                                ))
                            }
                        </select>
                        <select name="district_id" id="" onChange={handleOnChangeDistrict} >
                            <option value="">Chọn huyện</option>
                            {
                                district.map(data => (
                                    <option  key={data?.DistrictID} value={`${data?.DistrictID}${data.DistrictName}`}>{data?.DistrictName}</option>
                                ))
                            }
                        </select>
                        <select name="ward_id" id=""  onChange={handleOnChangeWard}>
                            <option value="">Chọn quận</option>
                            {
                                ward.map(data => (
                                    <option  key={data?.WardCode} value={`${data?.WardCode}${data?.WardName}`}>{data?.WardName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Nhập vào password' name='password' value={formState.password} onChange={handleOnChange} />
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