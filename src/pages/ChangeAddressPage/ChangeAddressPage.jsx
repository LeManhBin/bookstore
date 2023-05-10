import React, { useEffect, useState } from 'react'
import Account from '../../components/Account/Account'
import './ChangeAddressPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchDataDistrict, actFetchDataProvince, actFetchDataWard } from '../../redux/features/provinceSlice/provinceSlice'
import { actUpdateAddress } from '../../redux/features/userSlice/userSlice'
const ChangeAddressPage = () => {
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

    const {user} = useSelector((state) => state.user)
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            provinceId: addressState.province_id,
            districtId: addressState.district_id,
            wardId: addressState.ward_id,
            fullAddress: `${addressState.houseNumber} - ${addressState.provinceName} - ${addressState.districtName} - ${addressState.wardName}`
        }

        dispatch(actUpdateAddress(idAddress,data))
    }
  return (
    <div className='change-address-page'>
        <div className="container">
          <div className="left">
            <Account/>
          </div>
          <div className="change-container">
              <span className='title'>Địa chỉ</span>
              <form action="" onSubmit={handleSubmit}>
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
                  <span className='attention'>Thay đổi địa chỉ</span>
                  <button type='submit'>Lưu thay đổi</button>
              </form>
          </div>
        </div>
    </div>
  )
}

export default ChangeAddressPage