import React, { useEffect, useState } from 'react'
import './SelectAddress.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchDataDistrict, actFetchDataProvince, actFetchDataWard } from '../../redux/features/provinceSlice/provinceSlice'
const SelectAddress = () => {
    const dispatch = useDispatch
    const {province} = useSelector((state) => state.province)
    const {district} = useSelector((state) => state.province)
    const {ward} = useSelector((state) => state.province)
    const [address, setAddress] = useState({})
    const [provinceId, setProvinceId] = useState(0)
    const [districtId, setDistrictId] = useState(0)
    const [wardId, setWardId] = useState(0)
  
    useEffect(() => {
      dispatch(actFetchDataProvince())
    },[])
  
    useEffect(() => {
      dispatch(actFetchDataDistrict(address.province))
    },[address])
  
    useEffect(() => {
      dispatch(actFetchDataWard(address.district))
    },[address])
  
    const handleOnChangeAddress = (e) => {
      const {name, value} = e.target
      setAddress({
        ...address,
        [name]: value
      })
    }

  return (
    <div className='form-input'>
        <label htmlFor="">Địa chỉ</label>

        <div className='input-address'>
            <select name="province" id="" value={provinceId} onChange={handleOnChangeAddress}>
            {
                province.map(data => {
                return(
                    <option key={data?.ProvinceID} value={data?.ProvinceID}>
                    {data?.ProvinceName}
                    </option>
                )
                })
            }
            </select>
            <select name="district" id="" value={districtId} onChange={handleOnChangeAddress}>
            {
                district.map(data => {
                return(
                    <option key={data?.DistrictID} value={data?.DistrictID}>{data?.DistrictName}</option>
                )
                })
            }
            </select>
            <select name="ward" id="" value={ward} onChange={handleOnChangeAddress}>
            {
                ward.map(data => {
                return(
                    <option key={data?.WardCode} value={data?.WardCode}>{data?.WardName}</option>
                )
                })
            }
            </select>
        </div>
    </div>
  )
}

export default SelectAddress