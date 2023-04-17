import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import Heading from '../../components/Heading/Heading';
import Pagination from '../../components/Pagination/Pagination';
import useScrollToTop from '../../hooks/useScrollToTop';
import { actFetchSearchBook } from '../../redux/features/bookSlice/bookSlice';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';

const SearchResultPage = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('payload');

    useScrollToTop()
    const dispatch = useDispatch()

    const {isLoading} = useSelector((state) => state.book)

    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      setIsLoaded(!isLoading);
    }, [isLoading]);

    const {bookSearch} = useSelector((state) => state.book)
    const [searchData, setSearchData] = useState(bookSearch)
    const [numberShow, setNumberShow] = useState(8)

    
    useEffect(() => {
        dispatch(actFetchSearchBook(searchTerm))
    }, [dispatch, searchTerm]);

    useEffect(() => {
        setSearchData(bookSearch)
    },[bookSearch])
    
    const handleOnChangeNumberShow = (e) => {
          const {value} = e.target;
          const number = Number(value)
          setNumberShow(number)
    }
  
    //phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8)
    const lastPageIndex = currentPage * limit;
    const firstPageIndex = lastPageIndex - limit;
    const currentItems = searchData?.data?.slice(firstPageIndex, lastPageIndex);
    const totalPage = searchData?.data?.length
  
    useEffect(() => {
      setLimit(numberShow)
    },[numberShow])

  return (
    <>
          {
      isLoaded ? (
        <div className='product-container'>
          <div className="heading">
              <Heading title={"Tìm kiếm"}/>
          </div>
          <div className='product'>
              <div className='sort'>
                  <div className="sort-filter">
                    <i className="fa-solid fa-arrow-up-z-a"></i>
                    <span>Sắp xếp</span>
                  </div>
                  <div className='sorting'>
                      <div className='default-sort'>
                        <select name="" id="">
                            <option value="">Xếp theo</option>
                            <option value="">Giá thấp đến cao</option>
                            <option value="">Giá cao đến thấp</option>
                        </select>
                      </div>
                      <div className='show-sort'> 
                        <span>Show</span>
                        <select name="" id="" value={numberShow} onChange={handleOnChangeNumberShow}>
                              <option value="8">8</option>
                              <option value="12">12</option>
                              <option value="16">16</option>
                              <option value="20">20</option>
                        </select>
                      </div>
                  </div>
              </div>
              <div className="all-product">
                  {
                      (searchData.length == 0) ? <div style={{fontSize: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', width: '100%'}}>
                          Không tìm thấy sản phẩm nào</div>
                      :
                      <>
                      {
                          currentItems?.map(data => {
                            return (
                              <div key={data?.id}>
                                <Card data={data}/>
                              </div>
                            )
                          })
                      }
                      </>
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
      </div>
      ): (
        <Loading/>
      )
    }
    </>
  )
}

export default SearchResultPage