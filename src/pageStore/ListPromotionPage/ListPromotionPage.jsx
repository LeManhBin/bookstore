import React, { useEffect, useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './ListPromotionPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllService } from '../../redux/features/serviceSlice/serviceSlide'
import { Table } from 'react-bootstrap'
import { actDeletePromotion, actFetchPromotionByStoreId } from '../../redux/features/bookSlice/bookSlice'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'

const ListPromotionPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.user)
  const {bookPromotionByIdStore} = useSelector((state) => state.book)
  const idStore = user.storeId
  const [searchTerm, setSearchTerm] = useState("");

  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = bookPromotionByIdStore.filter(user => user.role === 1).slice(firstPageIndex, lastPageIndex);
  const totalPage = bookPromotionByIdStore.length

  const handleFilterPromotion = () => {
    return bookPromotionByIdStore?.filter((promotion) => {
      return promotion?.name?.toLowerCase()?.includes(searchTerm.toLowerCase());
    }).slice(firstPageIndex, lastPageIndex);
  }

  useEffect(() => {
    dispatch(actFetchPromotionByStoreId(idStore))
  },[idStore])

  const handleDetailPromotionPage = (id) => {
    navigate(`/store/promotion/${id}`)
  }
  
  const handleDeletePromotion = (id) => {
    dispatch(actDeletePromotion(id, idStore))
  }

  const handleUpdatePromotionPage = (id) => {
    navigate(`/store/update-promotion/${id}`)
  }

  return (
    <div className='all-promotion-page'>
      <div className='heading'>
        <AdminHeading title={'Danh sách gói dịch vụ'}/>
      </div>
      <div className='search'>
        <div className='search-input'>
            <input type="text" placeholder='Nhập tên khuyến mãi...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>
      <div className='manager-container'>
      <div className='table'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                      <th>ID</th>
                      <th>Tên khuyễn mãi</th>
                      <th>Tỉ lệ khuyến mãi</th>
                      <th>Ngày bắt đầu</th>
                      <th>Ngày kết thúc</th>
                      <th>Trạng thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      handleFilterPromotion().map((data, index) => {
                        let status
                        if(data.status === 0 ) {
                          status = "Đang hoạt động"
                        }else {
                          status = "Ngừng hoạt động"
                        }
                        return(
                          <>
                            <tr key={data?.id}>
                              <td>{data?.id}</td>
                              <td>{data.name}</td>
                              <td>{data.discount}%</td>
                              <td>{data.startDate}</td>
                              <td>{data.endDate}</td>
                              <td>{status}</td>
                              <td className='button'>
                                <button className='edit-btn' onClick={() => handleDetailPromotionPage(data.id)}><i className="fa-solid fa-eye"></i></button>
                                <button className='edit-btn' onClick={() => handleUpdatePromotionPage(data.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn' onClick={() => handleDeletePromotion(data.id)}><i className="fa-sharp fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                          </>
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
  )
}

export default ListPromotionPage