import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Heading from '../../components/Heading/Heading'
import { vendorData } from '../../constants/vendorData'
import {cardData} from '../../constants/cartData'
import Card from '../../components/Card/Card'
import './VendorDetail.scss'
import useScrollToTop from '../../hooks/useScrollToTop'
const VendorDetail = () => {
    useScrollToTop()
    const param = useParams()
    const [vendorState, setVendorState] = useState({})

    const data = vendorData.find(vendor => vendor.id === Number(param.idVendor))

    useEffect(() => {
        setVendorState(data)
    },[param])

  return (
    <div className='vendor-detail'>
        <div className="heading">
            <Heading title={vendorState.name}/>
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
            <div className="right" style={{backgroundImage: `url(${vendorState.coverImg})`}}>
                <div className='content'>
                    <div className='avatar'>
                        <img src={vendorState.avatar} alt="" />
                    </div>
                    <span className="name">{vendorState.name}</span>
                    <span className="address"><i class="fa-solid fa-location-dot"></i>{vendorState.address}</span>
                    <span className="phone"><i class="fa-solid fa-phone"></i>{vendorState.phone}</span>
                    <span className="rating"><i class="fa-regular fa-star"></i>4.00 rating from 30 reviews</span>
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
                        <input type="text" />
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
                        cardData.map(data => {
                            return (
                                <div key={data.id}>
                                    <Card data={data}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default VendorDetail