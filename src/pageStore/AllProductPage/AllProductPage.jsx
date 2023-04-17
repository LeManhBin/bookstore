import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './AllProductPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchBookByIdStore } from '../../redux/features/bookSlice/bookSlice'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../../constants/config'
const AllProductPage = () => {
  const navigate = useNavigate()
  const {bookByStore} = useSelector((state) => state.book)
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)
  const idStore = user.storeId
  useEffect(() => {
    dispatch(actFetchBookByIdStore(idStore))
  },[idStore])

  const handleShowDetailProduct = (id) => {
    navigate(`/store/detail-product/${id}`)
  }

  console.log(bookByStore);
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
                      <th>Giá</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bookByStore.map((book, index) => {
                        return(
                          <tr key={book?.id}> 
                            <td>{index + 1}</td>
                            <td>{book?.name}</td>
                            <td className='img'>
                                <img src={`${IMG_URL}${book.image}`} alt="Avatar" />
                            </td>
                            <td>{book?.author}</td>
                            {/* <td>{book?.categoryEntity?.name}</td>
                            <td>{book?.quantity}</td> */}
                            <td>{book?.price}</td> 
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleShowDetailProduct(book?.id)}><i className="fa-solid fa-eye"></i></button>
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