import React, { useEffect, useState } from 'react'
import './AccountPage.scss'
import useScrollToTop from '../../hooks/useScrollToTop'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchUserById } from '../../redux/features/userSlice/userSlice'

const AccountPage = () => {
  useScrollToTop()
  const [isPending, setIsPending] = useState(true)
  const [isApproved, setIsApproved] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isCancel, setIsCancel] = useState(false)
  
  const styleActive = ({isActive}) => {
    return {
      color: isActive ? '#F65D4E' : '#000',
      borderBottom: isActive ? '1p solid #F65D4E' : 'none'
    }
}

  const handleIsPending = () => {
    setIsPending(true)
    setIsApproved(false)
    setIsMoving(false)
    setIsComplete(false)
    setIsCancel(false)
  }
  const handleIsApproved = () => {
    setIsPending(false)
    setIsApproved(true)
    setIsMoving(false)
    setIsComplete(false)
    setIsCancel(false)
  }
  const handleIsMoving = () => {
    setIsPending(false)
    setIsApproved(false)
    setIsMoving(true)
    setIsComplete(false)
    setIsCancel(false)
  }
  const handleIsComplete = () => {
    setIsPending(false)
    setIsApproved(false)
    setIsMoving(false)
    setIsComplete(true)
    setIsCancel(false)
  }
  const handleIsCancel = () => {
    setIsPending(false)
    setIsApproved(false)
    setIsMoving(false)
    setIsComplete(false)
    setIsCancel(true)
  }

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  console.log(user);

  useEffect(() => {
    dispatch(actFetchUserById(user.id))
  },[])

  const handleProfilePage = () => {
    navigate('/account/profile')
  }

  const handleRegisterSalePage = () => {
    navigate('/sale-register')
  }
  return (
    <div className='account-page'>
        <div className='left'>
            <div className='info'>
                <img src={`data:image/jpeg;base64,${user?.image}`} alt="Product" />  
                <div className="name">
                  <p>{user?.fullName}</p>
                  <span onClick={handleProfilePage}>Sửa hồ sơ</span>
                </div>
            </div>
            <ul>
              <li>Tài Khoản Của Tôi</li>
              <li onClick={handleRegisterSalePage}>Đăng ký bán hàng</li>
              <li>Đơn Mua</li>
            </ul>
        </div>
        <div className="right">
            <div className="heading">
              <ul className='heading-links'>
                  <li onClick={handleIsPending} style={isPending ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Chờ duyệt</li>
                  <li onClick={handleIsApproved} style={isApproved ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Đã duyệt</li>
                  <li onClick={handleIsMoving} style={isMoving ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Đang vận chuyển</li>
                  <li onClick={handleIsComplete} style={isComplete ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Đã giao</li>
                  <li onClick={handleIsCancel} style={isCancel ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Đã huỷ</li>
              </ul>
            </div>
          {
            isPending &&
            <div className='pending'>
              <div className="pending-heading">
                <p>Nhà xuất bản</p>
              </div>
              {/* ------- */}
              <div className='pending-card'>
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
          }

            {/* approved */}
            {
              isApproved &&
              <div className='approved'>
                  <div className="approved-heading">
                    <p>Nhà xuất bản</p>
                  </div>
                  {/* ------- */}
                  <div className='approved-card'>
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
            }
            {/* moving */}
            {
              isMoving &&
              <div className='approved'>
                  <div className="approved-heading">
                    <p>Nhà xuất bản</p>
                  </div>
                  {/* ------- */}
                  <div className='approved-card'>
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
            }
                 {/* complete */}
            {
              isComplete &&
              <div className='approved'>
                  <div className="approved-heading">
                    <p>Nhà xuất bản</p>
                  </div>
                  {/* ------- */}
                  <div className='approved-card'>
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
            }
            {/* cancel */}
            {
              isCancel &&
              <div className='approved'>
                  <div className="approved-heading">
                    <p>Nhà xuất bản</p>
                  </div>
                  {/* ------- */}
                  <div className='approved-card'>
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
            }
        </div>
    </div>
  )
}

export default AccountPage