import React from 'react'
import { useNavigate } from 'react-router-dom'
import './VendorTitle.scss'
import { IMG_URL } from '../../constants/config'
const VendorTitle = ({data}) => {
    const navigate = useNavigate()

    const handleShowDetail = (id) => {
        navigate(`/vendor/${id}`)
    }

  return (
    <div className='vendor-container'>
        <div className='top' style={{backgroundImage: `url(${IMG_URL}${data.coverImage})`}}>
            <span className='name'>{data?.name}</span>
            {/* <span className='star'>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </span> */}
            <span className='address'>{data?.address?.fullAddress}</span>
            <div className="phone"><i className="fa-solid fa-phone"></i>{data?.phone}</div>
        </div>
        <div className="bot">
            <span onClick={() => handleShowDetail(data?.id)}><i className="fa-solid fa-angle-right"></i></span>
            <div className="avatar">
                 <img src={`${IMG_URL}${data?.avatar}`} alt="store" />
            </div>
        </div>
    </div>
  )
}

export default VendorTitle