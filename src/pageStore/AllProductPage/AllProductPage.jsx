import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './AllProductPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchBookByIdStore } from '../../redux/features/bookSlice/bookSlice'
import { useNavigate } from 'react-router-dom'
const AllProductPage = () => {
  const navigate = useNavigate()
  const {bookByStore} = useSelector((state) => state.book)
  const dispatch = useDispatch()
  const idStore = 2
  useEffect(() => {
    dispatch(actFetchBookByIdStore(idStore))
  },[idStore])

  const handleShowDetailProduct = (id) => {
    navigate(`/store/detail-product/${id}`)
  }
  return (
    <div className='all-product-page'>
              <div className='heading'>
            <AdminHeading title={'Danh sách sản phẩm'}/>
        </div>
        <div className='search'>
            <div className='search-input'>
                <input type="text" placeholder='Nhập tên sản phẩm...'/>
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <button className='add-new' >Thêm mới</button>
        </div>
        <div className='manager-container'>
              <div className='table'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                      <th>STT</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh Đại diện</th>
                      <th>Tác giả</th>
                      <th>Thể loại</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bookByStore.map((book, index) => {
                        return(
                          <tr key={book?.object?.id}> 
                            <td>{index + 1}</td>
                            <td>{book?.object.name}</td>
                            <td className='img'>
                                <img src={`data:image/jpeg;base64,${book?.file}`} alt="Avatar" />
                            </td>
                            <td>{book?.object.author}</td>
                            <td>{book?.object?.categoryEntity?.name}</td>
                            <td>{book?.object?.quantity}</td>
                            <td>{book?.object?.price}</td> 
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleShowDetailProduct(book?.object?.id)}><i className="fa-solid fa-eye"></i></button>
                              <button className='edit-btn'><i className="fa-regular fa-pen-to-square"></i></button>
                              <button className='delete-btn'><i className="fa-sharp fa-solid fa-trash"></i></button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
                {/* <div className='pagination'>
                    <Pagination
                    currentPage={currentPage}
                    limit={limit}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    background={'#AEE2FF'}
                />
                </div> */}
              </div>
        </div>
    </div>
  )
}

export default AllProductPage