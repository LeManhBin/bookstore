import FormData from 'form-data'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import PopupOtpStore from '../../components/PopupOtpStore/PopupOtpStore'
import { actCreateStore, actFetchCheckEmailStore, actFetchOtp } from '../../redux/features/storeSlice/storeSlice'
import './SaleRegisterPage.scss'
import AddressPopup from '../../components/AddressPopup/AddressPopup'
import { actFetchDataDistrict, actFetchDataProvince, actFetchDataWard } from '../../redux/features/provinceSlice/provinceSlice'


const SaleRegisterPage = () => {

  const {isOtp} = useSelector((state) => state.store)
  const {otp} = useSelector((state) => state.store)
  const [checkOtp, setCheckOtp] = useState(isOtp)
  const {user} = useSelector((state) => state.user)
  const [isAddress, setIsAddress] = useState(false)
  const [dataRegister, setDataRegister] = useState({})
  const dispatch = useDispatch()

  const initialState = {
    houseNumber: "",
    provinceName: "",
    province_id: "",
    districtName: "",
    district_id: "",
    wardName: "",
    ward_id: "",
}
const [addressState, setAddressState] = useState(initialState)

const {province} = useSelector((state) => state.province)
const {district} = useSelector((state) => state.province)
const {ward} = useSelector((state) => state.province)

const idAddress = user?.address?.id

useEffect(() => {
    dispatch(actFetchDataProvince())
},[])

useEffect(() => {
    if(addressState.province_id) {
        dispatch(actFetchDataDistrict(addressState.province_id))
    }
},[addressState.province_id])

useEffect(() => {
    if(addressState.province_id && addressState.district_id) {
        dispatch(actFetchDataWard(addressState.district_id))
    }
},[addressState.district_id])



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

  useEffect(() => {
    setCheckOtp(isOtp)
  },[isOtp])

  const [formState, setFormState] = useState({
    userId: user?.id,
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  // useEffect(() => {
  //   setFormState({
  //     ...formState,
  //   })
  // },[user])

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const data = {
    provinceId: addressState.province_id,
    districtId: addressState.district_id,
    wardId: addressState.ward_id,
    fullAddress: `${addressState.houseNumber} - ${addressState.provinceName} - ${addressState.districtName} - ${addressState.wardName}`
  }

  useEffect(() => {
    setFormState({
      ...formState,
      address: data,
    })
  },[addressState])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(actFetchCheckEmailStore(formState))
    if(isOtp) {
      dispatch(actFetchOtp(formState?.email))
    }else {
      toast.warning('Tài khoản email này đã tồn tại !!!')
    }
  }
  return (
    <div className='sale-register-page'>
      {
        checkOtp ? <PopupOtpStore formState={formState} otp={otp} setCheckOtp={setCheckOtp}/> : ""
      }
        <div className="top">
            <div className="left">
                <div className="heading">
                  <h2>Đăng ký bán hàng cùng</h2>
                  <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/logo-1.svg" alt="" />
                </div>
                <p className='content'>Tiếp cận hơn <span>8 tỷ lượt truy cập</span> mỗi tháng! =)))</p>

                {/* <img className='banner' src="https://salt.tikicdn.com/cache/w680/ts/user/dc/e6/b4/fa5101071b365ee2f385fd7d208b309f.jpg" alt="" /> */}
            </div>
            <div className="right">
                <span className="title">Đăng ký ngay</span>
                <form action="" onSubmit={handleSubmit}>
                  <div className="form-input">
                    <label htmlFor="">Địa chỉ email</label>
                    <input type="email" name='email' placeholder='Nhập địa chỉ email' value={formState.email} onChange={handleOnChange}/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Tên cửa hàng</label>
                    <input type="text" name='name' placeholder='Nhập họ và tên' value={formState.name} onChange={handleOnChange}/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" name='phone' placeholder='Nhập số điện thoại' value={formState.phone} onChange={handleOnChange}/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Địa chỉ cửa hàng</label>
                    {/* <input type="text" name='address' placeholder='Nhập địa chỉ cửa hàng' value={formState.address} onChange={handleOnChange}/> */}
                    <div className="form-input">
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
                  <button type='submit'>Đăng ký ngay</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SaleRegisterPage