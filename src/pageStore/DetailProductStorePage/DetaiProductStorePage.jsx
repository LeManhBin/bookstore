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
  },[param]);

  return (
    <div className='detail-product'>
      <div className="heading">
          <AdminHeading title={`Chi tiết sản phẩm sản phẩm ${book.name}`}/>
      </div>
      <form>
          <div className='add-new-container'>
              <div className='title'>
                  <h5>Thông tin cơ bản</h5>
              </div>

              <div className='form-input'>
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Hình ảnh sản phẩm</label>
                  <div className='add-image'>
                    {
                        book?.images?.map((img, index) => {
                            return(
                                <img src={`data:image/jpeg;base64,${img}`} alt="Avatar" key={index}/>
                            )
                        })
                    }

                  </div>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Tên sản phẩm</label>
                  <p>{book?.name}</p>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Tác giả</label>
                  <p>{book?.author}</p>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Thể loại</label>
                  <p>{book?.category}</p>   
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Nhà xuất bản</label>
                  <p>{book?.publishing}</p>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Số trang</label>
                  <p>{book?.pageNumber}</p>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Mô tả sản phẩm</label>
                  <ReactQuill theme="snow" className='quill' value={book?.description}/>
              </div>
          </div>

          <div className="add-new-container">
              <div className='title'>
                  <h5>Thông tin chi tiết</h5>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Chủ đề</label>
                  <p></p>
              </div>
          </div>
          <div className="add-new-container">
              <div className='title'>
                  <h5>Thông tin bán hàng</h5>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Giá</label>
                  <p>{book?.price}</p>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Kho hàng</label>
                  <p>{book?.quantity}</p>
              </div>
          </div>
          <div className="add-new-container">
              <div className='title'>
                  <h5>Thông tin vận chuyển</h5>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Chiều dài</label>
                  <p>{book?.length}</p>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Chiều rộng</label>
                  <p>{book?.width}</p>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Bề dày</label>
                  <p>{book?.weight}</p>
              </div>
              <div className="form-input">
                  <label htmlFor="" className='label'><span className='tick'>(*)</span>Trọng lượng</label>
                  <p>{book?.height}</p>
              </div>
          </div>
      </form>
  </div>
  )
}

export default DetailProductStorePage