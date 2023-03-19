import React from 'react'
import VendorTitle from '../../components/VendorTitle/VendorTitle'
import Heading from '../../components/Heading/Heading'
import { vendorData } from '../../constants/vendorData'
import './VendorPage.scss'
import useScrollToTop from '../../hooks/useScrollToTop'
const VendorPage = () => {
  useScrollToTop()
  return (
    <div className='vendor-page'>
        <div className="heading">
          <Heading title={"Store List"}/>
        </div>
        <div className="vendor-list">
            <div className="search-container">
                <div className="search">
                  <input type="text" placeholder='Nhập tên cửa hàng cần tìm...'/>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
        </div>
        <div className='all-vendor'>
                {
                  vendorData.map(data => {
                    return(
                        <div key={data.id}>
                          <VendorTitle data={data}/>
                        </div>
                    )
                  })
                }
        </div>
    </div>
  )
}

export default VendorPage