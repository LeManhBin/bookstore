import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import ModalAcces from '../../components/ModalAcces/ModalAcces'
import Pagination from '../../components/Pagination/Pagination'
import { actDeleteStore, actFetchAllStore } from '../../redux/features/storeSlice/storeSlice'
import './StoreListPage.scss'
import { IMG_URL } from '../../constants/config'
import Status from '../../components/Status/Status'
const StoreListPage = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [idTemp, setIdtemp] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {allStore} = useSelector((state) => state.store)

  useEffect(() => {
    dispatch(actFetchAllStore())
  },[])


  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allStore.slice(firstPageIndex, lastPageIndex);

  const totalPage = allStore.length

  const handleFilterStore = () => {
    return allStore?.filter((store) => {
      return store?.name?.toLowerCase()?.includes(searchTerm.toLowerCase());
    }).slice(firstPageIndex, lastPageIndex);
  }

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
                      handleFilterStore().map((store, index)=> {
                        let status;
                        if (store.status === 0) {
                          status = <Status text={"Hoạt động"} className={"active"}/>
                        }else {
                          status = <Status text={"Ngừng hoạt động"} className={"stop"}/>
                        }
                        return(
                          <tr key={store?.id}>
                            <td>{index + 1}</td>
                            <td >{store?.name}</td>
                            <td className='img'>
                              <img src={`${IMG_URL}${store?.avatar}`} alt="avatar" />
                            </td>
                            <td>{store?.phone}</td>
                            <td>{store?.email}</td>
                            <td>{store?.address?.fullAddress}</td>
                            <td>{status}</td>
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleViewPage(store?.id)}><i className="fa-solid fa-users-viewfinder"></i></button>
                              {/* <button className='delete-btn' onClick={() => handleModalDelete(store?.id)}><i className="fa-sharp fa-solid fa-trash"></i></button> */}
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