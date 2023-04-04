import React, { useEffect } from 'react'
import './DetailProductStorePage.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchBookById } from '../../redux/features/bookSlice/bookSlice'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import ReactQuill from 'react-quill'
const DetailProductStorePage = () => {
  const param = useParams()
  const dispatch = useDispatch()
  const {book} = useSelector((state) => state.book)

  useEffect(() => {
    dispatch(actFetchBookById(Number(param.idBook)))
  },[param])

  return (
    <div className='detail-product'>
      <div className="heading">
          <AdminHeading title={`Chi tiết sản phẩm sản phẩm ${book.object.name}`}/>
      </div>
      <form>
          <div className='add-new-container'>
              <div className='title'>
                  <h5>Thông tin cơ bản</h5>
              </div>

              <div className='form-input'>
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Hình ảnh sản phẩm</label>
                  <div className='add-image'>

                      
                  </div>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Tên sản phẩm</label>
                  <input type="text" />
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Tác giả</label>
                  <input type="text" />
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Thể loại</label>

              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Nhà xuất bản</label>
                  <input type="text" />
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Số trang</label>
                  <input type="number" min={0} />
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Mô tả sản phẩm</label>
                  <ReactQuill theme="snow" className='quill' />
              </div>
          </div>

          <div className="add-new-container">
              <div className='title'>
                  <h5>Thông tin chi tiết</h5>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Thương hiệu</label>
                  <input type="text" />
              </div>
          </div>
          <div className="add-new-container">
              <div className='title'>
                  <h5>Thông tin bán hàng</h5>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Giá</label>
                  <input type="text" />
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Kho hàng</label>
                  <input type="text" />
              </div>
          </div>
          <div className="add-new-container">
              <div className='title'>
                  <h5>Thông tin vận chuyển</h5>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Chiều dài</label>
                  <input type="text" />
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Chiều rộng</label>
                  <input type="text" />
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Bề dày</label>
                  <input type="text" />
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Trọng lượng</label>
                  <input type="text" />
              </div>
          </div>
      </form>
  </div>
  )
}

export default DetailProductStorePage