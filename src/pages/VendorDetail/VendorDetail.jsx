import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Heading from '../../components/Heading/Heading'
import { vendorData } from '../../constants/vendorData'
import {cardData} from '../../constants/cartData'
import Card from '../../components/Card/Card'
import './VendorDetail.scss'
import useScrollToTop from '../../hooks/useScrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchStoreById } from '../../redux/features/storeSlice/storeSlice'
import { actFetchBookByIdCategory, actFetchBookByIdStore } from '../../redux/features/bookSlice/bookSlice'
import Pagination from '../../components/Pagination/Pagination'
import Loading from '../../components/Loading/Loading'
import { IMG_URL } from '../../constants/config'
const VendorDetail = () => {
    useScrollToTop()
    const param = useParams()
    const dispatch = useDispatch()
    const {store} = useSelector((state) => state.store)
    const {bookByStore} = useSelector((state) => state.book)

    const [vendorState, setVendorState] = useState(store.data)
    const {isLoading} = useSelector((state) => state.store)

    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
        setIsLoaded(!isLoading);
    }, [isLoading]);
    
      // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(6)
    const lastPageIndex = currentPage * limit;
    const firstPageIndex = lastPageIndex - limit;
    const currentItems = bookByStore.slice(firstPageIndex, lastPageIndex);
    const [searchTerm, setSearchTerm] = useState("");
    const totalPage = bookByStore.length

    useEffect(() => {
        dispatch(actFetchStoreById(Number(param.idVendor)))
        dispatch(actFetchBookByIdCategory())
    },[])

    useEffect(() => {
        setVendorState(store.data)
        dispatch(actFetchBookByIdStore(store?.data?.id))
    },[store])

    const handleFilterAccount = () => {
        return bookByStore?.filter((book) => {
          return book?.name?.toLowerCase()?.includes(searchTerm.toLowerCase());
        }).slice(firstPageIndex, lastPageIndex);
    }

  return (
    <>
        {
            isLoaded ?
            (
                <div className='vendor-detail'>
                <div className="heading">
                    <Heading title={vendorState?.name}/>
                </div>
                <div className='vendor-banner'>
                    <div className='left'>
                        <span className='left-title'>Danh mục sản phẩm</span>
                        <div className='category-container'>
                            <ul className='category'>
                                <li>Action & Adventure</li>
                                <li>Activity Books</li>
                                <li>Cultural</li>
                                <li>Arts & Literature</li>
                                <li>Genre Fiction</li>
                                <li>Anthologies</li>
                                <li>Animals</li>
                            </ul>
                        </div>
                    </div>
                        <div className="right" style={{backgroundImage: `url(${IMG_URL}${vendorState.coverImage})`}}>
                            <div className='content'>
                            <div className='avatar'>
                                <img src={`${IMG_URL}${vendorState?.avatar}`} alt="store" />
                            </div>
                            <span className="name">{vendorState?.name}</span>
                            <span className="address"><i className="fa-solid fa-location-dot"></i>{vendorState?.address?.fullAddress}</span>
                            <span className="phone"><i className="fa-solid fa-phone"></i>{vendorState?.phone}</span>
                            <span className="rating"><i className="fa-regular fa-star"></i>4.00 rating from 30 reviews</span>
                            </div>
                        </div>
                </div>
                <div className="vendor-product">
                    <div className="left">
                        <span className="left-title">
                            Liên hệ người bán
                        </span>
                        <form>
                            <input type="text" placeholder='Your Name...'/>
                            <input type="text" placeholder='Your Email...'/>
                            <textarea name="" id="" cols="10" rows="5" placeholder='Type Your Message...'></textarea>
                            <button>Gửi</button>
                        </form>
                    </div>
                    <div className="right">
                        <div className='right-title'>
                            <span>Sản phẩm</span>
                        </div>
                        <div className='search-container'>
                            <div className='search-input'>
                                <input type="text" placeholder='Nhập tên sản phẩm...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <select name="" id="">
                                <option value="">Sắp xếp theo</option>
                                <option value="">Giá tăng dần</option>
                                <option value="">Giá giảm dần</option>
                            </select>
                        </div>
                        <div className='product'>
                            {
                                handleFilterAccount()?.map(data => {
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
            </div>
            )
                :(
                    <Loading/>
            )
        }
    </>
  )
}

export default VendorDetail