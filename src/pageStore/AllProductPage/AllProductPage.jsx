import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './AllProductPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actDeleteBook, actFetchBookByIdStore } from '../../redux/features/bookSlice/bookSlice'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../../constants/config'
import Status from '../../components/Status/Status'
import ModalAcces from '../../components/ModalAcces/ModalAcces'
const AllProductPage = () => {
  const navigate = useNavigate()
  const {bookByStore} = useSelector((state) => state.book)
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)
  const idStore = user.storeId
  const [isDelete, setIsDelete] = useState(false)
  const [idTemp, setIdtemp] = useState('')
  const [isSelect, setIsSelect] = useState(1)
  const [searchTerm, setSearchTerm] = useState("");
  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = bookByStore.slice(firstPageIndex, lastPageIndex);

  const totalPage = bookByStore.length

  useEffect(() => {
    dispatch(actFetchBookByIdStore(idStore))
  },[idStore])

  const handleShowDetailProduct = (id) => {
    navigate(`/store/detail-product/${id}`)
  }

  const handleShowUpdateProduct = (id) => {
    navigate(`/store/product/${id}`)
  }


  const handleModalDelete = (id) => {
    setIsDelete(true)
    setIdtemp(id)
  }

  const handleDelete = (id) => {
    dispatch(actDeleteBook(id))
  }

  const handleOnChangeSelect = (e) => {
    const {value} = e.target
    setIsSelect(value)
  }

  const handleFilterProduct = () => {
    if(isSelect == 1) {
      return bookByStore?.filter((book) => { 
        return book?.name?.toLowerCase()?.includes(searchTerm.toLowerCase());
      }).slice(firstPageIndex, lastPageIndex);
    }else if (isSelect == 2) {
      return bookByStore?.filter((book) => {
        return book?.name?.toLowerCase()?.includes(searchTerm.toLowerCase());
      }).filter(product => product.status === 0).slice(firstPageIndex, lastPageIndex);
    } else if(isSelect == 3) {
      return bookByStore?.filter((book) => {
        return book?.name?.toLowerCase()?.includes(searchTerm.toLowerCase());
      }).filter(product => product.quantity < 20).slice(firstPageIndex, lastPageIndex);
    } else if(isSelect == 4) {
      return bookByStore?.filter((book) => {
        return book?.name?.toLowerCase()?.includes(searchTerm.toLowerCase());
      }).filter(product => product.status === 2).slice(firstPageIndex, lastPageIndex);
    }
  } 

  return (
    <div className='all-product-page'>
          {
            isDelete && 
            <ModalAcces
              setIsDelete={setIsDelete} 
              title={"Bạn có chắc muốn xoá!"} 
              color={"#F65D4E"}
              handleDelete={handleDelete}
              idTemp={idTemp}
            />
          }
        <div className='heading'>
            <AdminHeading title={'Danh sách sản phẩm'}/>
        </div>
        <div className='search'>
            <div className='search-input'>
            <input type="text" placeholder='Nhập tên sản phẩm...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <select name="" id="" className='filter-product' value={isSelect} onChange={handleOnChangeSelect}>
              <option value={1}>Tất cả sản phẩm</option>
              <option value={2}>Đang bán</option>
              <option value={3}>Sắp hết</option>
              <option value={4}>Ngừng bán</option>
            </select>
        </div>
        <div className='manager-container'>
              <div className='table'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                      <th>ID</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh Đại diện</th>
                      <th>Tác giả</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                      <th>Khuyến mãi</th>
                      <th>Trạng thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      handleFilterProduct().map((book, index) => {
                        let status
                        if (book.status === 0) {
                          status = <Status text={"Hoạt động"} className={"active"}/>
                        }else {
                          status = <Status text={"Ngừng hoạt động"} className={"stop"}/>
                        }
                        let formattedPrice = book?.price?.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                      });
                        return(
                          <tr key={book?.id}> 
                            <td>{book.id}</td>
                            <td>{book?.name}</td>
                            <td className='img'>
                                <img src={`${IMG_URL}${book?.image}`} alt="Avatar" />
                            </td>
                            <td>{book?.author}</td>
                            <td>{book?.quantity}</td>
                            <td>{formattedPrice}</td> 
                            <td>{book?.discount}%</td>
                            <td>{status}</td>
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleShowDetailProduct(book?.id)}><i className="fa-solid fa-eye"></i></button>
                              <button className='edit-btn' onClick={() => handleShowUpdateProduct(book?.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                              <button className='delete-btn' onClick={() => handleModalDelete(book?.id)}><i className="fa-sharp fa-solid fa-trash"></i></button>
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