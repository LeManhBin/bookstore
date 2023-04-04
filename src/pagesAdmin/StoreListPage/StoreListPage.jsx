import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import ModalAcces from '../../components/ModalAcces/ModalAcces'
import Pagination from '../../components/Pagination/Pagination'
import { actDeleteStore, actFetchAllStore } from '../../redux/features/storeSlice/storeSlice'
import './StoreListPage.scss'
const StoreListPage = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [idTemp, setIdtemp] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {allStore} = useSelector((state) => state.store)


  console.log(allStore);
  useEffect(() => {
    dispatch(actFetchAllStore())
  },[])

  console.log(allStore);

  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allStore.slice(firstPageIndex, lastPageIndex);

  const totalPage = allStore.length

  // const handleAddNewPage = () => {
  //   navigate('/admin/add-new-store')
  // }

  const handleModalDelete = (id) => {
    setIsDelete(true)
    setIdtemp(id)
  }

  const handleDelete = (id) => {
      dispatch(actDeleteStore(id))
  }

  // const handleUpdatePage = (id) => {
  //   navigate(`/admin/store-list/${1}`)
  // }

  const handleViewPage = (id) => {
    navigate(`/admin/store-list/${id}`)
  }

  return (
    <div className='manager'>
      <div className='heading'>
          <AdminHeading title={'Quản lý cửa hàng'}/>
      </div>
      <div className='search'>
          <div className='search-input'>
              <input type="text" placeholder='Nhập Tên Cửa Hàng...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              <button><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
          {/* <button className='add-new' onClick={handleAddNewPage}>Thêm mới</button> */}
      </div>
      <div className='manager-container'>
            <div className='table'>
              <Table striped bordered hover>
                <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                  <tr>
                    <th>STT</th>
                    <th>Tên Cửa Hàng</th>
                    <th>Hình ảnh</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Địa Chỉ</th>
                    <th>Trạng thái</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      currentItems.map((store, index)=> {
                        let status;
                        if(store?.object?.status === 0) {
                          status = "Đang Hoạt Động"
                        }else{
                          status = "Dừng Hoạt Động"
                        }
                        return(
                          <tr key={store?.object?.id}>
                            <td>{index + 1}</td>
                            <td >{store?.object?.name}</td>
                            <td className='img'>
                              <img src={`data:image/jpeg;base64,${store?.file[0]}`} alt="Product" />
                            </td>
                            <td>{store?.object?.phone}</td>
                            <td>{store?.object?.email}</td>
                            <td>{store?.object?.address}</td>
                            <td>{status}</td>
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleViewPage(store?.object?.id)}><i className="fa-solid fa-users-viewfinder"></i></button>
                              <button className='delete-btn' onClick={() => handleModalDelete(store?.object?.id)}><i className="fa-sharp fa-solid fa-trash"></i></button>
                            </td>
                          </tr>
                        )
                      })
                    }
                </tbody>
              </Table>
              <div className='pagination'>
                  <Pagination
                  currentPage={currentPage}
                  limit={limit}
                  setCurrentPage={setCurrentPage}
                  totalPage={totalPage}
                  background={'#AEE2FF'}
              />
              </div>
            </div>
      </div>
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
  </div>
  )
}

export default StoreListPage