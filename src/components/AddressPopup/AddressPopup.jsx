import React, { useEffect, useState } from 'react'
import './AddressPopup.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchDataDistrict, actFetchDataProvince, actFetchDataWard } from '../../redux/features/provinceSlice/provinceSlice'
const AddressPopup = ({setIsAddress}) => {
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
            province_id: addressState.province_id,
            district_id: addressState.district_id,
            ward_id: addressState.ward_id,
            full_address: `${addressState.houseNumber} - ${addressState.provinceName} - ${addressState.districtName} - ${addressState.wardName}`
        }
    }
  return (
    <div className='address-popup'>
        <span className='button-close' onClick={() => setIsAddress(false)}>X</span>
        <div className='container'>
            <form action="" className='form-address'>
                <div className="input">
                    <input type="text" placeholder='Nhập số nhà' value={addressState.houseNumber} onChange={handelOnChangeNumberHouse}/>
                </div>
                <div className='address-input'>
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
                <button onClick={handleSubmit}>Cập nhật</button>
            </form>

        </div>
    </div>
  )
}

export default AddressPopup