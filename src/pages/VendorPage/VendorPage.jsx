import React, { useEffect, useState } from 'react'
import VendorTitle from '../../components/VendorTitle/VendorTitle'
import Heading from '../../components/Heading/Heading'
import { vendorData } from '../../constants/vendorData'
import './VendorPage.scss'
import useScrollToTop from '../../hooks/useScrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllStore } from '../../redux/features/storeSlice/storeSlice'
import Pagination from '../../components/Pagination/Pagination'
import Loading from '../../components/Loading/Loading'
const VendorPage = () => {
  useScrollToTop()
  const dispatch = useDispatch()
  const {allStore} = useSelector((state) => state.store)
  const [searchTerm, setSearchTerm] = useState("");

  const {isLoading} = useSelector((state) => state.store)

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      setIsLoaded(!isLoading);
  }, [isLoading]);

  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allStore?.slice(firstPageIndex, lastPageIndex);
  const totalPage = allStore?.length

  useEffect(() => {
    dispatch(actFetchAllStore())
  },[])

  const handleFilterStore = () => {
    return allStore.filter((store) => {
      return store?.name.toLowerCase().includes(searchTerm.toLowerCase());
    }).slice(firstPageIndex, lastPageIndex);
  }
  return (
    <>
      {
        isLoaded ? 
        (
          <div className='vendor-page'>
          <div className="heading">
            <Heading title={"Danh sách cửa hàng"}/>
          </div>
          <div className="vendor-list">
              <div className="search-container">
                  <div className="search">
                    <input type="text" placeholder='Nhập tên cửa hàng cần tìm...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
              </div>
          </div>
          <div className='all-vendor'>
                  {
                    handleFilterStore()?.map(data => {
                      return(
                          <div key={data?.id}>
                            <VendorTitle data={data}/>
                          </div>
                      )
                    })
                  }
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
        ):(
          <Loading/>
        )
      }
    </>
  )
}

export default VendorPage