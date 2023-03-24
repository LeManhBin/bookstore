import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import { cardData } from '../../constants/cartData'
import { actFetchStoreById } from '../../redux/features/storeSlice/storeSlice'
import './ViewStore.scss'
const ViewStore = () => {
  const param = useParams()
  const dispatch = useDispatch()
  const {store} = useSelector((state) => state.store)

  const [avatar, setAvatar] = useState('')
  const [coverImage, setCoverImage] = useState('')

  const [isDetail, setIsDetail] = useState(true)
  const [isAllProduct, setIsAllProduct] = useState(false)
  const [isStatistical, setIsStatistical] = useState(false)

  const handleSetImage = () => {
    if (store && store.file && store.file.length > 0) {
      setAvatar(store?.file[0])
      setCoverImage(store?.file[1])
    }
  }

  useEffect(() => {
    handleSetImage()
  },[store])


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

  return (
    <div className='store-detail'>
        <div className="top">
            <div className="thumbnail">
                <img src={`data:image/jpeg;base64,${coverImage}`} alt="" className='background'/>
                <div className='thumbnail-desc'>
                  <img src={`data:image/jpeg;base64,${avatar}`} alt=""/>
                  <div className='desc'>
                    <p className='name'>{store?.object?.name}</p>
                    <p className='address'>{store?.object?.address}</p>
                    <p className='phone'>{store?.object?.phone}</p>
                  </div>
                </div>
            </div>
            <div className='information'>
                <div className='_left'>
                    <div className='content'>
                      <i className="fa-solid fa-box"></i>
                      <p>Sản Phẩm: <span>10</span></p>
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
               <li onClick={handleDetail} style={{color: `${isDetail ? '#F65D4E' : '#000'}`, borderBottom: `${isDetail ? '2px solid #F65D4E' : 'none'}`}} >Thông tin cửa hàng</li>
               <li onClick={handleAllProduct} style={{color: `${isAllProduct ? '#F65D4E' : '#000'}`, borderBottom: `${isAllProduct ? '2px solid #F65D4E' : 'none'}`}}>Tất cả sản phẩm</li>
               <li onClick={handleStatistical} style={{color: `${isStatistical ? '#F65D4E' : '#000'}`, borderBottom: `${isStatistical ? '2px solid #F65D4E' : 'none'}`}}>Thống kê</li>
            </ul>
            {
              isDetail && 
              <div className='detail-store-page'>
                  <h1>Trang thông tin sản phẩm</h1>
              </div>
            }
            {
              isAllProduct &&
              <div className="all-product-page">
                {
                  cardData.map((data,index) => {
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