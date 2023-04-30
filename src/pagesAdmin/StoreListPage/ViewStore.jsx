import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import { cardData } from '../../constants/cartData'
import { actFetchStoreById } from '../../redux/features/storeSlice/storeSlice'
import './ViewStore.scss'
import { IMG_URL } from '../../constants/config'
import { actFetchBookByIdStore } from '../../redux/features/bookSlice/bookSlice'
const ViewStore = () => {
  const param = useParams()
  const dispatch = useDispatch()
  const {store} = useSelector((state) => state.store)
  const {bookByStore} = useSelector((state) => state.book)
  const [isDetail, setIsDetail] = useState(true)
  const [isAllProduct, setIsAllProduct] = useState(true)
  const [isStatistical, setIsStatistical] = useState(false)

  const productStore = bookByStore.length

  const handleDetail = () => {
    setIsDetail(true)
    setIsAllProduct(false)
    setIsStatistical(false)
  }
  const handleAllProduct = () => {
    setIsDetail(false)
    setIsAllProduct(true)
    setIsStatistical(false)
  }
  const handleStatistical = () => {
    setIsDetail(false)
    setIsAllProduct(false)
    setIsStatistical(true)
  }


  useEffect(() => {
    dispatch(actFetchStoreById(Number(param?.idStore)))
  },[param])

  useEffect(() => {
    dispatch(actFetchBookByIdStore(Number(param?.idStore)))
  },[param])

  return (
    <div className='store-detail'>
        <div className="top">
            <div className="thumbnail">
                <img src={`${IMG_URL}${store?.data?.coverImage}`}  alt="" className='background'/>
                <div className='thumbnail-desc'>
                  <img src={`${IMG_URL}${store?.data?.avatar}`} alt="avatar" />
                  <div className='desc'>
                    <p className='name'>{store?.data?.name}</p>
                    <p className='address'>{store?.data?.address?.fullAddress}</p>
                    <p className='email'>{store?.data?.email}</p>
                    <p className='phone'>{store?.data?.phone}</p>
                  </div>
                </div>
            </div>
            <div className='information'>
                <div className='_left'>
                    <div className='content'>
                      <i className="fa-solid fa-box"></i>
                      <p>Sản Phẩm: <span>{productStore}</span></p>
                    </div>
                    <div className='content'>
                      <i className="fa-solid fa-box"></i>
                      <p>Đang Theo: <span>10</span></p>
                    </div>
                </div>
                <div className='_right'>
                    <div className='content'>
                      <i className="fa-solid fa-box"></i>
                      <p>Người Theo Dõi: <span>10</span></p>
                    </div>
                    <div className='content'>
                      <i className="fa-solid fa-box"></i>
                      <p>Đánh Giá: <span>10</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div className='bottom'>
            <ul className='links'>
               {/* <li onClick={handleDetail} style={{color: `${isDetail ? '#F65D4E' : '#000'}`, borderBottom: `${isDetail ? '2px solid #F65D4E' : 'none'}`}} >Thông tin cửa hàng</li> */}
               <li onClick={handleAllProduct} style={{color: `${isAllProduct ? '#F65D4E' : '#000'}`, borderBottom: `${isAllProduct ? '2px solid #F65D4E' : 'none'}`}}>Tất cả sản phẩm</li>
               <li onClick={handleStatistical} style={{color: `${isStatistical ? '#F65D4E' : '#000'}`, borderBottom: `${isStatistical ? '2px solid #F65D4E' : 'none'}`}}>Thống kê</li>
            </ul>
            {/* {
              isDetail && 
              <div className='detail-store-page'>
                  <h1>Trang thông tin sản phẩm</h1>
              </div>
            } */}
            {
              isAllProduct &&
              <div className="all-product-page">
                {
                  bookByStore.map((data,index) => {
                    return(
                      <div key={data.id}>
                          <Card data={data}/>
                      </div>
                    )
                  })
                }
              </div>  
            }

            {
              isStatistical &&
              <div className="statistical-page">
                  <h1>đây là trang thống kê</h1>
              </div>
            }
        </div>
    </div>
  )
}

export default ViewStore