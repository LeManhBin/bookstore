import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './AddNewService.scss'
import FormData from 'form-data'
import { actCreateService } from '../../redux/features/serviceSlice/serviceSlide'
import { toast } from 'react-toastify'
const initialState = {
  name: "",
  price: "",
  // quantityProduct: "",
  expirationDate: "",
  thumbnail: "",
  description: "",
  status: ""
}
const AddNewService = () => {
  const navigate = useNavigate()
  const [thumbnail, setThumbnail] = useState(null)
  const [formState, setFormState] = useState(initialState)
  const dispatch = useDispatch()
  const handlePreviewthumbnail = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setThumbnail(file)
    e.target.value = null
  }

  useEffect(() => {
      return () => {
        thumbnail && URL.revokeObjectURL(thumbnail.preview)
      }

  },[thumbnail])

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
    formData.append("file", thumbnail);
    if(!formState.name || !formState.price || !formState.expirationDate || !formState.description || !thumbnail) {
      toast.warning("Vui lòng nhập đủ thông tin dịch vụ!")
    }else {
      dispatch(actCreateService(formData))
      navigate("/admin/service")
    }
  }

  const handleBack = () => {
    navigate("/admin/service")
  }


  return (
    <div className='add-new-service'>
        <div className="heading">
            <AdminHeading title={'Thêm mới dịch vụ'}/>
            <button onClick={handleBack}>Quay lại</button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-container">
            <div className='left'>
                <div className="form-input">
                    <label htmlFor="">Tên gói</label>
                    <input type="text" name='name' value={formState.name} onChange={handleOnChange} placeholder='Nhập tên gói'/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Cước gói</label>
                    <input type="text" name='price' value={formState.price} onChange={handleOnChange} placeholder='Nhập cước gói'/>
                </div>
                {/* <div className="form-input">
                    <label htmlFor="">Số sản phẩm</label>
                    <input type="text" name='quantityProduct' value={formState.quantityProduct} onChange={handleOnChange} placeholder='Nhập số sản phẩm'/>
                </div> */}
                <div className="form-input">
                    <label htmlFor="">Thời hạn</label>
                    <input type="number" name='expirationDate' value={formState.expirationDate} onChange={handleOnChange} placeholder='Nhập thời hạn'/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Chi tiết gói</label>
                    <textarea name="description" id="" cols="30" rows="5" value={formState.description}  onChange={handleOnChange} placeholder='Nhập chi tiết dịch vụ'></textarea>
                </div>
            </div>
            <div className='right'>
                <div className='form-input'>
                    <img src={`${thumbnail ? thumbnail.preview : 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png'}`} />
                    <input type="file" id="file-input" name='thumbnail' onChange={(e) => handlePreviewthumbnail(e) }/>
                    <label htmlFor="file-input" id="custom-button">Chọn ảnh</label>
                </div>
            </div>
            </div>

            <button type='submit' className='add-new'>Thêm mới</button>
        </form>
    </div>
  )
}

export default AddNewService