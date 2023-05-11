import React, { useEffect, useState } from 'react'
import './ProfileStore.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchStoreById, actUpdateStore } from '../../redux/features/storeSlice/storeSlice'
import AddressPopup from '../../components/AddressPopup/AddressPopup'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import { IMG_URL } from '../../constants/config'
import FormData from 'form-data'
import { actFetchDataDistrict, actFetchDataProvince, actFetchDataWard } from '../../redux/features/provinceSlice/provinceSlice'
const ProfileStore = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const {store} = useSelector((state) => state.store)
    const idStore = user.storeId
    const [avatar, setAvatar] = useState(null)
    const [coverImg, setCoverImg] = useState(null)

    const [formState, setFormState] = useState(store.data)

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
const data = {
  id: store?.data?.address?.id,
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


  useEffect(() => {
    setFormState(store.data)
  },[store])

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

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

  const handlePreviewCoverImg = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setCoverImg(file)
    e.target.value = null
  }

  useEffect(() => {
    return () => {
      coverImg && URL.revokeObjectURL(coverImg.preview)
    }

  },[coverImg])

  useEffect(() => {
    dispatch(actFetchStoreById(idStore))
  },[user])


  const handleSubmit = (e)  => {
    e.preventDefault()
    const formData =  new FormData();
      const formPost = Object.assign({}, formState);
      delete formPost.id;
      formData.append("object", JSON.stringify(formPost));
      formData.append("avatar", avatar);
      formData.append("coverimage", coverImg);
      dispatch(actUpdateStore(idStore, formData))
  }

  return (
    <div className='update-profile-store'>
      <div className="heading">
          <AdminHeading title={'Thông tin cửa hàng'}/>
      </div>
      <form onSubmit={handleSubmit}>
          <div className='left'>
              <div className="form-input">
                  <label htmlFor="">Tên cửa hàng</label>
                  <input type="text" name='name' placeholder='Nhập tên cửa hàng'
                      value={formState?.name} onChange={handleOnChange}
                  />
              </div>
              <div className="form-input">
                  <label htmlFor="">Số điện thoại</label>
                  <input type="text" name='phone' placeholder='Nhập số điện thoại'
                    value={formState?.phone} onChange={handleOnChange}
                  />
              </div>
              <div className="form-input">
                  <label htmlFor="">Email</label>
                  <input type="email" placeholder='Nhập vào email' name='email' 
                  value={formState?.email} onChange={handleOnChange}
                  />
              </div>
              <div className="form-input" style={{width: "225px"}}>
                  <label htmlFor="">Địa chỉ</label>
                    <input type="text" disabled={true} value={formState?.address?.fullAddress}/>
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
          <div className='center'>
            <div className='form-input'>
                <label htmlFor="">Ảnh bìa</label>
                <img src={`${coverImg ? coverImg?.preview : `${IMG_URL}${formState?.coverImage}`}`} />
                <input type="file" id="file-cover" name='coverImage' onChange={(e) => handlePreviewCoverImg(e) }/>
                <label htmlFor="file-cover" id="custom-button">Chọn ảnh</label>
            </div>
          </div>
          <div className='right'>
            <label htmlFor="">Ảnh đại diện</label>
              <div className='form-input'>
                  <img src={`${avatar ? avatar?.preview : `${IMG_URL}${formState?.avatar}`}`} />
                  <input type="file" id="file-input" name='avatar' onChange={(e) => handlePreviewAvatar(e) }/>
                  <label htmlFor="file-input" id="custom-button">Chọn ảnh</label>
              </div>
          </div>

          <button type='submit' className='add-new'>Cập nhật</button>
      </form>
  </div>
  )
}

export default ProfileStore