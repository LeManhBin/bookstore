import React, { useEffect, useState } from 'react'
import './ConfigSlide.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actChangeStatusSlide, actCreateSlide, actDeleteSlide, actFetchAllSlide } from '../../redux/features/slideSlice/slideSlice'
import FormData from 'form-data'
import { IMG_URL } from '../../constants/config'
import { toast } from 'react-toastify'
const ConfigSlide = () => {
  const {allSlide} = useSelector((state) => state.slide)
  const dispatch = useDispatch()
  const [slide, setSlide] = useState(null);

  useEffect(() => {
    dispatch(actFetchAllSlide())
  },[])

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setSlide(file)
    e.target.value = null
  }

  useEffect(() => {
      return () => {
        setSlide && URL.revokeObjectURL(setSlide.preview)
      }
  },[setSlide])

  const handleChangeStatus = (id) => {
    dispatch(actChangeStatusSlide(id))
  }

  const handleDeleteSlide = (id) => {
    dispatch(actDeleteSlide(id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData =  new FormData();
    formData.append("file", slide);
    if(slide == null) {
      toast.warning("Vui lòng chọn hình ảnh!")
    }else {
      dispatch(actCreateSlide(formData))
    }
  }
  return (
    <div className='config-container'>
        <div className="images-container">
          {
            allSlide.map(slide => {
              return(
                <div className="image" key={slide.id}>
                  <img src={`${IMG_URL}${slide.fileName}`} alt="" />
                  <div className="image-action">
                    {
                      slide.status === 1 ? <button className='active-btn'  onClick={() => handleChangeStatus(slide.id)}>Hiện thị</button> : <button className='off-btn'onClick={() => handleChangeStatus(slide.id)}>Tắt</button>
                    }
                    <button className='delete-btn' onClick={() => handleDeleteSlide(slide.id)}>Xoá</button>
                  </div>
                </div>
              )
            })
          }
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-form">
            <img src={`${slide ? slide.preview : 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png'}`} />            
            <input type="file" id="file-input" name='slide' onChange={(e) => handlePreviewAvatar(e)}/>
            <label htmlFor="file-input" id="custom-button" >Chọn ảnh</label>
          </div>
          <button className='add-btn' type='submit'>Thêm</button>
        </form>
    </div>
  )
}

export default ConfigSlide