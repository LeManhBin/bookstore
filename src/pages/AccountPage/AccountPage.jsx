import React from 'react'
import './AccountPage.scss'
import useScrollToTop from '../../hooks/useScrollToTop'
import { useNavigate } from 'react-router-dom'

const AccountPage = () => {
  useScrollToTop()
  const navigate = useNavigate()

  const handleProfilePage = () => {
    navigate('/account/profile')
  }
  return (
    <div className='account-page'>
        <div className='left'>
            <div className='info'>
                <img src="" alt="" />
                <div className="name">
                  <p>Lê Mạnh Bin</p>
                  <span onClick={handleProfilePage}>Sửa hồ sơ</span>
                </div>
            </div>
            <ul>
              <li>Tài Khoản Của Tôi</li>
              <li>Đơn Mua</li>
            </ul>
        </div>
        <div className="right">
            <div className="heading">
              <ul className='heading-links'>
                  <li>Chờ duyệt</li>
                  <li>Đã duyệt</li>
                  <li>Đang vận chuyển</li>
                  <li>Đã giao</li>
                  <li>Đã huỷ</li>
              </ul>
            </div>
            <div className='content'>
                <div className="content-heading">
                  <p>Nhà xuất bản</p>
                </div>
                {/* ------- */}
                <div className='content-card'>
                  <div className="desc-card">
                    <img src="" alt="" />
                    <div className="info-card">
                        <p className='name'>Sách hai ten</p>
                        <span className='author'>ABCSAD</span>
                        <span className='quantity'>Số lượng: 2</span>
                    </div>
                  </div>
                  <div className="price-card">
                    <p className='cost'>$10000</p>
                    <p className="real-price">$9999</p>
                  </div>
                </div>
                {/* --------- */}
                <div className='total-payment'>
                    <p className='total'>Thành tiền: $9999</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccountPage