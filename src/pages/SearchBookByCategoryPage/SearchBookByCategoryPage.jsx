import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Heading from '../../components/Heading/Heading'
import Pagination from '../../components/Pagination/Pagination'
import useScrollToTop from '../../hooks/useScrollToTop'
import { actFetchBookByIdCategory } from '../../redux/features/bookSlice/bookSlice'
import { actFetchCategoryById } from '../../redux/features/categorySlice/categorySlide'

const SearchBookByCategoryPage = () => {
    const param = useParams()
  useScrollToTop()
  const dispatch = useDispatch()
  const {bookByCategory} = useSelector((state) => state.book)
  const {category} = useSelector((state) => state.category)
  const [numberShow, setNumberShow] = useState(8)
  const {isLoading} = useSelector((state) => state.book)

  console.log(bookByCategory);
      //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = bookByCategory?.slice(firstPageIndex, lastPageIndex);
  const totalPage = bookByCategory?.length

    useEffect(() => {
        dispatch(actFetchBookByIdCategory(Number(param.idCategoryBook)))
        dispatch(actFetchCategoryById(Number(param.idCategoryBook)))
    },[param.idCategoryBook])



    console.log(bookByCategory);

    useEffect(() => {
        setLimit(numberShow)
      },[numberShow])
      
  const handleOnChangeNumberShow = (e) => {
        const {value} = e.target;
        const number = Number(value)
        setNumberShow(number)
  }
  return (
    <div className='product-container'>
      <div className="heading">
          <Heading title={`${category.name}`}/>
      </div>
      {
        (currentItems.length > 0) ? <div className='product'>
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
                      <div key={data?.object?.id}>
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
    </div> : <div className='product-empty'>Không tìm thấy sản phẩm nào</div>
      }
    </div>
  )
}

export default SearchBookByCategoryPage