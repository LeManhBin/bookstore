import React, { useEffect, useState } from 'react'
import './AccountPage.scss'
import useScrollToTop from '../../hooks/useScrollToTop'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchUserById } from '../../redux/features/userSlice/userSlice'
import { actFetchOrderUserByStatus } from '../../redux/features/orderSlice/orderSlice'
import Evaluate from '../../components/Evaluate/Evaluate'
import PopupCancelOrder from '../../components/PopupCancelOrder/PopupCancelOrder'
import Account from '../../components/Account/Account'
import { IMG_URL } from '../../constants/config'


const AccountPage = () => {
  const [isRating,setIsRating ] = useState(false)
  const [isCancelOrder, setIsCancelOrder] = useState(false)
  const [idTemp, setIdtemp] = useState("")
  useScrollToTop()
  const [status, setStatus] = useState(0)
  const [isPending, setIsPending] = useState(true)
  const [isApproved, setIsApproved] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isCancel, setIsCancel] = useState(false)
  const [isHistory, setIsHistory] = useState(false)

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
    setIsHistory(false)
    setStatus(0)
  }
  const handleIsApproved = () => {
    setIsPending(false)
    setIsApproved(true)
    setIsMoving(false)
    setIsComplete(false)
    setIsCancel(false)
    setIsHistory(false)
    setStatus(1)
  }
  const handleIsMoving = () => {
    setIsPending(false)
    setIsApproved(false)
    setIsMoving(true)
    setIsComplete(false)
    setIsCancel(false)
    setIsHistory(false)
    setStatus(2)
  }
  const handleIsComplete = () => {
    setIsPending(false)
    setIsApproved(false)
    setIsMoving(false)
    setIsComplete(true)
    setIsCancel(false)
    setIsHistory(false)
    setStatus(3)
  }
  const handleIsCancel = () => {
    setIsPending(false)
    setIsApproved(false)
    setIsMoving(false)
    setIsComplete(false)
    setIsCancel(true)
    setIsHistory(false)
    setStatus(4)
  }
  const handleIsHistory = () => {
    setIsPending(false)
    setIsApproved(false)
    setIsMoving(false)
    setIsComplete(false)
    setIsCancel(false)
    setIsHistory(true)
    setStatus(5)
  }

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const {orderByStatus} = useSelector((state) => state.order)


  useEffect(() => {
    dispatch(actFetchUserById(user?.id))
  },[])



  useEffect(() => {
    dispatch(actFetchOrderUserByStatus(user?.id))
  },[user])

  const handleCancelOrder = (id) => {
    setIdtemp(id)
    setIsCancelOrder(true)
  }

  const handleEvaluate = (id) => {
    setIsRating(true)
    setIdtemp(id)
  }


  
  return (
    <div className='account-page'>
          {
            isCancelOrder && 
            <PopupCancelOrder
            setIsCancelOrder={setIsCancelOrder} 
            color={"#F65D4E"}
            handleCancelOrder={handleCancelOrder}
            idTemp={idTemp}
            idUser={user.id}
            />
          }
        {
          isRating && <Evaluate setIsRating={setIsRating} idTemp={idTemp}/>
        }
        <div className='left'>
            <Account/>
        </div>
        <div className="right">
            <div className="heading">
              <ul className='heading-links'>
                  <li onClick={handleIsPending} style={isPending ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Chờ duyệt</li>
                  <li onClick={handleIsApproved} style={isApproved ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Đã duyệt</li>
                  <li onClick={handleIsMoving} style={isMoving ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Đang vận chuyển</li>
                  <li onClick={handleIsComplete} style={isComplete ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Đã giao</li>
                  <li onClick={handleIsCancel} style={isCancel ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Đã huỷ</li>
                  <li onClick={handleIsHistory} style={isHistory ? {color: '#F65D4E', borderBottom: '2px solid #F65D4E'} : {color: '#000', borderBottom: 'none'} }>Đơn hàng đã mua</li>
              </ul>
            </div>
          {
            isPending &&
            <div className='pending'>
              { 
                Object?.entries(
                  orderByStatus.filter(order => order?.status === 0).reduce((acc, item) => {
                    if(!acc[item?.store?.name]) {
                      acc[item?.store?.name] = [];
                    }
                    acc[item?.store?.name].push(item);
                    return acc;
                  },{})
                ).map(([storeName, items]) => (
                  <div key={storeName}>
                    <div className="pending-heading">
                      <p>{storeName}</p>
                    </div>
                    {
                      items.map((item) => {
                        let totalPrice = 0;
                        let totalPriceAfterDiscount = 0;

                        return item?.orderDetails?.map((itemChild) => {
                          const price = itemChild?.price || 0;
                          const discount = itemChild?.discount || 0;
                          const amount = itemChild?.amount || 0;

                          totalPrice += price * amount;
                          totalPriceAfterDiscount += (price - (price * (discount / 100))) * amount;

                          const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });
                          const formattedAfterDiscount = totalPriceAfterDiscount.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });

                          return (
                            <>
                              <div className='pending-card'>
                                <div className="desc-card">
                                  <img src={`${IMG_URL}${itemChild?.image}`} alt="" />
                                  <div className="info-card">
                                      <p className='name'>{itemChild?.name}</p>
                                      <span className='author'>{itemChild?.author}</span>
                                      <span className='quantity'>Số lượng: {itemChild?.amount}</span>
                                  </div>
                                </div>
                                <div className="price-card">
                                  {discount > 0 ? 
                                    <>
                                      <p className='cost'>{formattedTotalPrice}</p>
                                      <p className="real-price">{formattedAfterDiscount}</p>
                                    </>
                                  :
                                    <p className="real-price">{formattedAfterDiscount}</p>
                                  }
                                </div>
                              </div>
                              <div className="order-button">
                                <button onClick={() => handleCancelOrder(item.id)}>Huỷ đơn hàng</button>
                              </div>
                            </>
                          );
                        });
                      })
                    }
                    {/* <div className='total-payment'>
                        <p className='total'>Thành tiền: $0</p>
                    </div> */}
                  </div>
                )) 
              }

            </div>
          }

            {/* approved */}
            {
            isApproved &&
              <div className='approved'>
               { 
                Object?.entries(
                  orderByStatus.filter(order => order?.status === 1).reduce((acc, item) => {
                    if(!acc[item?.store?.name]) {
                      acc[item?.store?.name] = [];
                    }
                    acc[item?.store?.name].push(item);
                    return acc;
                  },{})
                ).map(([storeName, items]) => (
                  <div key={storeName}>
                    <div className="approved-heading">
                      <p>{storeName}</p>
                    </div>
                    {
                      items.map((item) => {
                        let totalPrice = 0;
                        let totalPriceAfterDiscount = 0;

                        return item?.orderDetails?.map((itemChild) => {
                          const price = itemChild?.price || 0;
                          const discount = itemChild?.discount || 0;
                          const amount = itemChild?.amount || 0;

                          totalPrice += price * amount;
                          totalPriceAfterDiscount += (price - (price * (discount / 100))) * amount;

                          const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });
                          const formattedAfterDiscount = totalPriceAfterDiscount.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });

                          return (
                            <>
                              <div className='approved-card'>
                                <div className="desc-card">
                                  <img src={`${IMG_URL}${itemChild?.image}`} alt="" />
                                  <div className="info-card">
                                      <p className='name'>{itemChild?.name}</p>
                                      <span className='author'>{itemChild?.author}</span>
                                      <span className='quantity'>Số lượng: {itemChild?.amount}</span>
                                  </div>
                                </div>
                                <div className="price-card">
                                  {discount > 0 ? 
                                    <>
                                      <p className='cost'>{formattedTotalPrice}</p>
                                      <p className="real-price">{formattedAfterDiscount}</p>
                                    </>
                                  :
                                    <p className="real-price">{formattedAfterDiscount}</p>
                                  }
                                </div>
                              </div>
                            </>
                          );
                        });
                      })
                    }
                      {/* <div className='total-payment'>
                          <p className='total'>Thành tiền: 0</p>
                      </div> */}
                    </div>
                  )) 
                }
              </div>
            }
            {/* moving */}
            {
            isMoving &&
            <div className='pending'>
               { 
                Object?.entries(
                  orderByStatus.filter(order => order?.status === 2).reduce((acc, item) => {
                    if(!acc[item?.store?.name]) {
                      acc[item?.store?.name] = [];
                    }
                    acc[item?.store?.name].push(item);
                    return acc;
                  },{})
                ).map(([storeName, items]) => (
                  <div key={storeName}>
                    <div className="pending-heading">
                      <p>{storeName}</p>
                    </div>
                    {
                      items.map((item) => {
                        let totalPrice = 0;
                        let totalPriceAfterDiscount = 0;

                        return item?.orderDetails?.map((itemChild) => {
                          const price = itemChild?.price || 0;
                          const discount = itemChild?.discount || 0;
                          const amount = itemChild?.amount || 0;

                          totalPrice += price * amount;
                          totalPriceAfterDiscount += (price - (price * (discount / 100))) * amount;

                          const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });
                          const formattedAfterDiscount = totalPriceAfterDiscount.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });

                          return (
                            <>
                              <div className='pending-card'>
                                <div className="desc-card">
                                  <img src={`${IMG_URL}${itemChild?.image}`} alt="" />
                                  <div className="info-card">
                                      <p className='name'>{itemChild?.name}</p>
                                      <span className='author'>{itemChild?.author}</span>
                                      <span className='quantity'>Số lượng: {itemChild?.amount}</span>
                                  </div>
                                </div>
                                <div className="price-card">
                                  {discount > 0 ? 
                                    <>
                                      <p className='cost'>{formattedTotalPrice}</p>
                                      <p className="real-price">{formattedAfterDiscount}</p>
                                    </>
                                  :
                                    <p className="real-price">{formattedAfterDiscount}</p>
                                  }
                                </div>
                              </div>
                            </>
                          );
                        });
                      })
                    }
                      {/* <div className='total-payment'>
                          <p className='total'>Thành tiền: 0</p>
                      </div> */}
                    </div>
                  )) 
                }
            </div>
            }
                 {/* complete */}
            {
            isComplete &&
              <div className='pending'>
 { 
                Object?.entries(
                  orderByStatus.filter(order => order?.status === 3).reduce((acc, item) => {
                    if(!acc[item?.store?.name]) {
                      acc[item?.store?.name] = [];
                    }
                    acc[item?.store?.name].push(item);
                    return acc;
                  },{})
                ).map(([storeName, items]) => (
                  <div key={storeName}>
                    <div className="pending-heading">
                      <p>{storeName}</p>
                    </div>
                    {
                      items.map((item) => {
                        let totalPrice = 0;
                        let totalPriceAfterDiscount = 0;

                        return item?.orderDetails?.map((itemChild) => {
                          const price = itemChild?.price || 0;
                          const discount = itemChild?.discount || 0;
                          const amount = itemChild?.amount || 0;

                          totalPrice += price * amount;
                          totalPriceAfterDiscount += (price - (price * (discount / 100))) * amount;

                          const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });
                          const formattedAfterDiscount = totalPriceAfterDiscount.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });

                          return (
                            <>
                              <div className='pending-card'>
                                <div className="desc-card">
                                  <img src={`${IMG_URL}${itemChild?.image}`} alt="" />
                                  <div className="info-card">
                                      <p className='name'>{itemChild?.name}</p>
                                      <span className='author'>{itemChild?.author}</span>
                                      <span className='quantity'>Số lượng: {itemChild?.amount}</span>
                                  </div>
                                </div>
                                <div className="price-card">
                                  {discount > 0 ? 
                                    <>
                                      <p className='cost'>{formattedTotalPrice}</p>
                                      <p className="real-price">{formattedAfterDiscount}</p>
                                    </>
                                  :
                                    <p className="real-price">{formattedAfterDiscount}</p>
                                  }
                                </div>
                              </div>
                              <div className="order-button">
                                <button onClick={() => handleEvaluate(item.id)}>Đánh giá</button>
                            </div>
                            </>
                          );
                        });
                      })
                    }
                      {/* <div className="order-button">
                          <button onClick={() => handleEvaluate(items.id)}>Đánh giá</button>
                          {
                            console.log(items, "items")
                          }
                      </div> */}
                    </div>
                  )) 
                }
              </div>
            }
            {/* cancel */}
            {
            isCancel && 
              <div className='pending'>
               { 
                Object?.entries(
                  orderByStatus.filter(order => order?.status === 4).reduce((acc, item) => {
                    if(!acc[item?.store?.name]) {
                      acc[item?.store?.name] = [];
                    }
                    acc[item?.store?.name].push(item);
                    return acc;
                  },{})
                ).map(([storeName, items]) => (
                  <div key={storeName}>
                    <div className="pending-heading">
                      <p>{storeName}</p>
                    </div>
                    {
                      items.map((item) => {
                        let totalPrice = 0;
                        let totalPriceAfterDiscount = 0;

                        return item?.orderDetails?.map((itemChild) => {
                          const price = itemChild?.price || 0;
                          const discount = itemChild?.discount || 0;
                          const amount = itemChild?.amount || 0;

                          totalPrice += price * amount;
                          totalPriceAfterDiscount += (price - (price * (discount / 100))) * amount;

                          const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });
                          const formattedAfterDiscount = totalPriceAfterDiscount.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });

                          return (
                            <>
                              <div className='pending-card'>
                                <div className="desc-card">
                                  <img src={`${IMG_URL}${itemChild?.image}`} alt="" />
                                  <div className="info-card">
                                      <p className='name'>{itemChild?.name}</p>
                                      <span className='author'>{itemChild?.author}</span>
                                      <span className='quantity'>Số lượng: {itemChild?.amount}</span>
                                  </div>
                                </div>
                                <div className="price-card">
                                  {discount > 0 ? 
                                    <>
                                      <p className='cost'>{formattedTotalPrice}</p>
                                      <p className="real-price">{formattedAfterDiscount}</p>
                                    </>
                                  :
                                    <p className="real-price">{formattedAfterDiscount}</p>
                                  }
                                </div>
                              </div>
                            </>
                          );
                        });
                      })
                    }
                      {/* <div className='total-payment'>
                          <p className='total'>Thành tiền: 0</p>
                      </div> */}
                    </div>
                  )) 
                }
              </div>
            }
            {/* history */}
            {
            isHistory && 
              <div className='pending'>
               { 
                Object?.entries(
                  orderByStatus.filter(order => order?.status === 5).reduce((acc, item) => {
                    if(!acc[item?.store?.name]) {
                      acc[item?.store?.name] = [];
                    }
                    acc[item?.store?.name].push(item);
                    return acc;
                  },{})
                ).map(([storeName, items]) => (
                  <div key={storeName}>
                    <div className="pending-heading">
                      <p>{storeName}</p>
                    </div>
                    {
                      items.map((item) => {
                        let totalPrice = 0;
                        let totalPriceAfterDiscount = 0;

                        return item?.orderDetails?.map((itemChild) => {
                          const price = itemChild?.price || 0;
                          const discount = itemChild?.discount || 0;
                          const amount = itemChild?.amount || 0;

                          totalPrice += price * amount;
                          totalPriceAfterDiscount += (price - (price * (discount / 100))) * amount;

                          const formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });
                          const formattedAfterDiscount = totalPriceAfterDiscount.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });

                          return (
                            <>
                              <div className='pending-card'>
                                <div className="desc-card">
                                  <img src={`${IMG_URL}${itemChild?.image}`} alt="" />
                                  <div className="info-card">
                                      <p className='name'>{itemChild?.name}</p>
                                      <span className='author'>{itemChild?.author}</span>
                                      <span className='quantity'>Số lượng: {itemChild?.amount}</span>
                                  </div>
                                </div>
                                <div className="price-card">
                                  {discount > 0 ? 
                                    <>
                                      <p className='cost'>{formattedTotalPrice}</p>
                                      <p className="real-price">{formattedAfterDiscount}</p>
                                    </>
                                  :
                                    <p className="real-price">{formattedAfterDiscount}</p>
                                  }
                                </div>
                              </div>
                            </>
                          );
                        });
                      })
                    }
                      {/* <div className='total-payment'>
                          <p className='total'>Thành tiền: 0</p>
                      </div> */}
                    </div>
                  )) 
                }
              </div>
            }
        </div>
    </div>
  )
}

export default AccountPage