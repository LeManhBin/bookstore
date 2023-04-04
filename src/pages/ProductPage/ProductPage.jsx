import React, { useEffect, useState } from 'react'
import './ProductPage.scss'
import Heading from '../../components/Heading/Heading'
import Card from '../../components/Card/Card'
import { cardData } from '../../constants/cartData'
import useScrollToTop from '../../hooks/useScrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllBook } from '../../redux/features/bookSlice/bookSlice'
import Pagination from '../../components/Pagination/Pagination'
const ProductPage = () => {
  useScrollToTop()
  const dispatch = useDispatch()
  const {allBook} = useSelector((state) => state.book)
  const [numberShow, setNumberShow] = useState(8)

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
  const currentItems = allBook?.data?.slice(firstPageIndex, lastPageIndex);
  const totalPage = allBook?.data?.length

  useEffect(() => {
    setLimit(numberShow)
  },[numberShow])

  useEffect(() => {
    dispatch(actFetchAllBook())
  },[])
  return (
    <div className='product-container'>
        <div className="heading">
            <Heading title={"Shop"}/>
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
                      currentItems?.map(data => {
                        return (
                          <div key={data?.id}>
                            <Card data={data}/>
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
    </div>
  )
}

export default ProductPage