import React, { useEffect } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './ListPromotionPage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllService } from '../../redux/features/serviceSlice/serviceSlide'
import { Table } from 'react-bootstrap'
import { actFetchPromotionByStoreId } from '../../redux/features/bookSlice/bookSlice'

const ListPromotionPage = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.user)
  const {bookPromotionByIdStore} = useSelector((state) => state.book)
  const idStore = user.storeId

  useEffect(() => {
    dispatch(actFetchPromotionByStoreId(idStore))
  },[idStore])

  console.log(bookPromotionByIdStore);

  return (
    <div className='all-promotion-page'>
      <div className='heading'>
        <AdminHeading title={'Danh sách gói dịch vụ'}/>
      </div>
      <div className='search'>
        <div className='search-input'>
            <input type="text" placeholder='Nhập tên khuyến mãi...'/>
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>
      <div className='manager-container'>
      <div className='table'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                      <th>STT</th>
                      <th>Tên khuyễn mãi</th>
                      <th>Tỉ lệ khuyến mãi</th>
                      <th>Ngày bắt đầu</th>
                      <th>Ngày kết thúc</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bookPromotionByIdStore.map((data, index) => {
                        return(
                          <>
                            <tr key={data?.id}>
                              <td>{index + 1}</td>
                              <td>{data.name}</td>
                              <td>{data.discount}%</td>
                              <td>{data.startDate}</td>
                              <td>{data.endDate}</td>
                              <td className='button'>
                                <button className='edit-btn'><i className="fa-solid fa-eye"></i></button>
                                <button className='edit-btn'><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i className="fa-sharp fa-solid fa-trash"></i></button>
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
  )
}

export default ListPromotionPage