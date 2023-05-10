import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import { actFetchUserById, actUpdateUser } from '../../redux/features/userSlice/userSlice'
import FormData from 'form-data'
import './UpdateAccount.scss'
import { IMG_URL } from '../../constants/config'
import { toast } from 'react-toastify'
import AddressPopup from '../../components/AddressPopup/AddressPopup'
import { actFetchDataDistrict, actFetchDataProvince, actFetchDataWard } from '../../redux/features/provinceSlice/provinceSlice'
const UpdateAccount = () => {
    const navigate = useNavigate()
    const param = useParams()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const [formUpdate, setFormUpdate] = useState(user)
    const [avatar, setAvatar] = useState(null)
    const [isAddress, setIsAddress] = useState(false)

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
      id: formUpdate?.address?.id,
      provinceId: addressState?.province_id,
      districtId: addressState?.district_id,
      wardId: addressState?.ward_id,
      fullAddress: `${addressState.houseNumber} - ${addressState.provinceName} - ${addressState.districtName} - ${addressState.wardName}`
    }

    useEffect(() => {
        setFormUpdate({
          ...formUpdate,
          address: data,
        })
      },[addressState])

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
            [name]: value,
        }));
    }

    const handleChangeRole = (e) => {
        const value = e.target.value;
        const role = Number(value)
        setFormUpdate((prevState) => ({
            ...prevState,
            role: role
        }));
    }


    const handleUpdate = (e) => {
        e.preventDefault()
        const formData =  new FormData();
        const formPost = Object.assign({}, formUpdate);
        delete formPost.imageBytes;
        formData.append("object", JSON.stringify(formPost));
        formData.append("file", avatar);
        if(!formUpdate.fullName || !formUpdate.email || !formUpdate.gender ||  !formUpdate.phone) {
            toast.warning("Vui lòng nhập đủ thông tin cần cập nhật!!")
        }else {
            dispatch(actUpdateUser(user?.id,formData))
        }
    }
    const handleBack = () => {
        navigate('/admin/account-manager')
    }

  return (
    <div className='update'>
        <div className="heading">
            <AdminHeading title={'Cập nhật tài khoản'}/>
            {/* <button onClick={handleBack}>Quay lại</button> */}
        </div>
        <form onSubmit={handleUpdate}>
            <div className='left'>
                <div className="form-input">
                    <label htmlFor="">Họ và tên</label>
                    <input type="text" name='fullName' placeholder='Nhập họ và tên'
                        value={formUpdate?.fullName} onChange={handleOnChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" name='phone' placeholder='Nhập số điện thoại'
                        value={formUpdate?.phone} onChange={handleOnChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="">Giới tính</label>
                    <div className='gender-container'>
                        <div className='gender'>
                            <input type="radio" id="male" name="gender" checked={formUpdate?.gender === "Nam"} value="Nam" onChange={handleOnChange}/>
                            <label htmlFor="male">Nam</label>
                        </div>
                        <div className="gender">
                            <input type="radio" id="female" name="gender" checked={formUpdate?.gender === "Nữ"} value="Nữ" onChange={handleOnChange}/>
                            <label htmlFor="female">Nữ</label>
                        </div>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="">Quyền</label>
                    <select name='role' value={formUpdate?.role} onChange={handleChangeRole}>
                        <option value={1}>Quản trị viên</option>
                        <option value={0}>Người dùng</option>
                    </select>
                </div>
            </div>
            <div className='center'>
                <div className="form-input" style={{width: "225px"}}>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Nhập vào email' name='email' 
                        value={formUpdate?.email} onChange={handleOnChange}
                    />
                </div>
                <div className="form-input">
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
            </div>
            <div className='right'>
                <div className='form-input'>
                    <img src={`${avatar ? avatar.preview : `${IMG_URL}${user?.avatar}`}`} />
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