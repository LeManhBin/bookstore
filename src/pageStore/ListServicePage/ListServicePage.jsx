import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllService } from '../../redux/features/serviceSlice/serviceSlide'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
const ListServicePage = () => {
    const {allService} = useSelector((state) => state.service)
    const dispatch = useDispatch()
  
  
    useEffect(() => {
      dispatch(actFetchAllService())
    },[])
    
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
        <div className='promotion'>
            {
              allService.map(service => {
                return(
                  <div className="promotion-card" key={service?.object?.id}>
                      <div className="img">
                        <img src={`data:image/jpeg;base64,${service?.file}`} alt="Avatar" />
                      </div>
                      <div className="card-detail">
                        <span>{service?.object?.name}</span>
                        <span>{service?.object?.price}</span>
                        <span>{service?.object?.description}</span>
                      </div>
                  </div>
                )
              })
            }
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

export default ListServicePage