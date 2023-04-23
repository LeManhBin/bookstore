import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import { actFetchServiceById, actUpdateService } from '../../redux/features/serviceSlice/serviceSlide'
import { IMG_URL } from '../../constants/config'
import { toast } from 'react-toastify'


const UpdateService = () => {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(null)
    const {service} = useSelector((state) => state.service)
    const dispatch = useDispatch()
    const [formState, setFormState] = useState(service)
    const param = useParams()


    useEffect(() => {
        dispatch(actFetchServiceById(Number(param.idService)))
    },[param])

    useEffect(() => {
        setFormState(service)
    },[service])

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

      const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData =  new FormData();
        const formPost = Object.assign({}, formState);
        delete formPost.thumbnailByte;
        delete formPost.quantityProduct;
        formData.append("object", JSON.stringify(formPost));
        formData.append("file", avatar);
        if(!formState.name || !formState.price || !formState.expirationDate || !formState.description){
            toast.warning("Vui lòng nhập đầy đủ thông tin cập nhật!!")
        }else {
            dispatch(actUpdateService(service?.id,formData))
            navigate("/admin/service")
        }
      }
    
      const handleBack = () => {
        navigate("/admin/service")
      }
      
  return (
    <div className='add-new-service'>
    <div className="heading">
        <AdminHeading title={'Cập nhật dịch vụ'}/>
        <button onClick={handleBack}>Quay lại</button>
    </div>
    <form onSubmit={handleSubmit}>
        <div className="form-container">
        <div className='left'>
            <div className="form-input">
                <label htmlFor="">Tên gói</label>
                <input type="text" name='name' value={formState?.name} onChange={handleOnChange} placeholder='Nhập tên gói'/>
            </div>
            <div className="form-input">
                <label htmlFor="">Cước gói</label>
                <input type="text" name='price' value={formState?.price} onChange={handleOnChange} placeholder='Nhập cước gói'/>
            </div>
            {/* <div className="form-input">
                <label htmlFor="">Số sản phẩm</label>
                <input type="text" name='quantityProduct' value={formState?.quantityProduct} onChange={handleOnChange} placeholder='Nhập số sản phẩm'/>
            </div> */}
            <div className="form-input">
                <label htmlFor="">Thời hạn</label>
                <input type="number" name='expirationDate' value={formState?.expirationDate} onChange={handleOnChange} placeholder='Nhập thời hạn'/>
            </div>
            <div className="form-input">
                <label htmlFor="">Chi tiết gói</label>
                <textarea name="description" id="" cols="30" rows="5" value={formState?.description}  onChange={handleOnChange} placeholder='Nhập chi tiết dịch vụ'></textarea>
            </div>
        </div>
        <div className='right'>
            <div className='form-input'>
                <img src={`${avatar ? avatar.preview : `${IMG_URL}${service.thumbnail}`}`} />
                <input type="file" id="file-input" name='thumbnail' onChange={(e) => handlePreviewAvatar(e) }/>
                <label htmlFor="file-input" id="custom-button">Chọn ảnh</label>
            </div>
        </div>
        </div>

        <button type='submit' className='add-new'>Cập nhật</button>
    </form>
</div>
  )
}

export default UpdateService