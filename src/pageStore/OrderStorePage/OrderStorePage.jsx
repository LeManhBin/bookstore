import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Pagination from '../../components/Pagination/Pagination'
import './OrderStorePage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actChangeOrderStatus, actFetchOrderByIdStore } from '../../redux/features/orderSlice/orderSlice'
import { useNavigate } from 'react-router-dom'
const OrderStorePage = () => {
  const [isPending, setIsPending] = useState(true)
  const [isApproved, setIsApproved] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isCancel, setIsCancel] = useState(false)

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

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {orderByIdStore} = useSelector((state) => state.order)
  const {user} = useSelector((state) => state.user)
  const idStore = user.storeId

  const [searchTerm, setSearchTerm] = useState("");

  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = orderByIdStore.filter(user => user.role === 1).slice(firstPageIndex, lastPageIndex);
  const totalPage = orderByIdStore.length

  const handleFilterOrder = () => {
    return orderByIdStore?.filter((order) => {
      return order?.name?.toLowerCase()?.includes(searchTerm.toLowerCase());
    }).slice(firstPageIndex, lastPageIndex);
  }

  useEffect(() => {
    dispatch(actFetchOrderByIdStore(idStore))
  },[idStore])

  const handleConfirm = (id) => {
      dispatch(actChangeOrderStatus(id,1, idStore))

  }
  const handleTransport = (id) => {
      dispatch(actChangeOrderStatus(id,2, idStore))

  }
  const handleComplete = (id) => {
      dispatch(actChangeOrderStatus(id,3, idStore))
  }

  const handleDetailOrder = (id) => {
    navigate(`/store/order-store/${id}`)
  }


  return (
    <div className='order-page'>
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
            <div className='order'>
              <div className="order-heading">
                <input type="text" className='search-input' placeholder='Nhập mã đơn hàng' name="" id="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>
              {/* ------- */}
              <div className='order-card'>
              <div className='table'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                    <th>Mã đơn hàng</th>
                    <th>Thông tin người nhận</th>
                    <th>Loại thanh toán</th>
                    <th>Tổng tiền đơn hàng</th>
                    <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        handleFilterOrder()?.filter(item => item.status === 0).map((order, index) => {
                          let loaiThanhToan;
                          if(order.payment === 1) {
                            loaiThanhToan = 'Trực tiếp'
                          }else {
                            loaiThanhToan = 'Zalo Pay'
                          }
                          return(
                            <tr key={order.id}>
                              <td>{order.id}</td>
                              <td style={{textAlign: 'left'}}>
                                {order.name}
                                <br />{order.phone}
                                <br />{order.address}
                              </td>
                              <td>{loaiThanhToan}</td>
                              <td></td>
                              <td className='button'>
                                <button className='edit-btn' onClick={() => handleDetailOrder(order.id)}><i className="fa-solid fa-binoculars"></i></button>
                                <button className='edit-btn' onClick={() => handleConfirm(order.id)}>Xác nhận</button>
                                <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                          )
                        })
                      }
                  </tbody>
                </Table>
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
              {/* --------- */}
          </div>
          }

            {/* approved */}
            {
              isApproved &&
              <div className='order'>
                  <div className="order-heading">
                    <input type="text" className='search-input' placeholder='Nhập mã đơn hàng' name="" id="" />
                  </div>
                  {/* ------- */}
                  <div className='order-card'>
                  <div className='table'>
                  <Table striped bordered hover>
                    <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                      <tr>
                      <th>Mã đơn hàng</th>
                      <th>Thông tin người nhận</th>
                      <th>Loại thanh toán</th>
                      <th>Tổng tiền đơn hàng</th>
                      <th>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                          orderByIdStore?.filter(item => item.status === 1).map((order, index) => {
                            let loaiThanhToan;
                            if(order.payment === 1) {
                              loaiThanhToan = 'Trực tiếp'
                            }else {
                              loaiThanhToan = 'Zalo Pay'
                            }
                            return(
                              <tr key={order.id}>
                                <td>{order.id}</td>
                                <td style={{textAlign: 'left'}}>
                                  {order.name}
                                  <br />{order.phone}
                                  <br />{order.address}
                                </td>
                                <td>{loaiThanhToan}</td>
                                <td></td>
                                <td className='button'>
                                  <button className='edit-btn' onClick={() => handleDetailOrder(order.id)}><i className="fa-solid fa-binoculars"></i></button>
                                  <button className='edit-btn' onClick={() => handleTransport(order.id)}>Giao</button>
                                  <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                                </td>
                              </tr>
                            )
                          })
                        }
                    </tbody>
                  </Table>
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
                  {/* --------- */}
              </div>
            }
            {/* moving */}
            {
              isMoving &&
              <div className='order'>
                  <div className="order-heading">
                    <input type="text" className='search-input' placeholder='Nhập mã đơn hàng' name="" id="" />
                  </div>
                  {/* ------- */}
                  <div className='order-card'>
                  <div className='table'>
                  <Table striped bordered hover>
                    <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                      <tr>
                      <th>Mã đơn hàng</th>
                      <th>Thông tin người nhận</th>
                      <th>Loại thanh toán</th>
                      <th>Tổng tiền đơn hàng</th>
                      <th>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                          orderByIdStore?.filter(item => item.status === 2).map((order, index) => {
                            let loaiThanhToan;
                            if(order.payment === 1) {
                              loaiThanhToan = 'Trực tiếp'
                            }else {
                              loaiThanhToan = 'Zalo Pay'
                            }
                            return(
                              <tr key={order.id}>
                                <td>{order.id}</td>
                                <td style={{textAlign: 'left'}}>
                                  {order.name}
                                  <br />{order.phone}
                                  <br />{order.address}
                                </td>
                                <td>{loaiThanhToan}</td>
                                <td></td>
                                <td className='button'>
                                  <button className='edit-btn' onClick={() => handleDetailOrder(order.id)}><i className="fa-solid fa-binoculars"></i></button>
                                  <button className='edit-btn' onClick={() => handleComplete(order.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                                  <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                                </td>
                              </tr>
                            )
                          })
                        }
                    </tbody>
                  </Table>
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
                  {/* --------- */}
              </div>
            }
                 {/* complete */}
            {
              isComplete &&
              <div className='order'>
                  <div className="order-heading">
                    <input type="text" className='search-input' placeholder='Nhập mã đơn hàng' name="" id="" />
                  </div>
                  {/* ------- */}
                  <div className='order-card'>
                  <div className='table'>
                  <Table striped bordered hover>
                    <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                      <tr>
                      <th>Mã đơn hàng</th>
                      <th>Thông tin người nhận</th>
                      <th>Loại thanh toán</th>
                      <th>Tổng tiền đơn hàng</th>
                      <th>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                          orderByIdStore?.filter(item => item.status === 3).map((order, index) => {
                            let loaiThanhToan;
                            if(order.payment === 1) {
                              loaiThanhToan = 'Trực tiếp'
                            }else {
                              loaiThanhToan = 'Zalo Pay'
                            }
                            return(
                              <tr key={order.id}>
                                <td>{order.id}</td>
                                <td style={{textAlign: 'left'}}>
                                  {order.name}
                                  <br />{order.phone}
                                  <br />{order.address}
                                </td>
                                <td>{loaiThanhToan}</td>
                                <td></td>
                                <td className='button'>
                                  <button className='edit-btn' onClick={() => handleDetailOrder(order.id)}><i className="fa-solid fa-binoculars"></i></button>
                                  <button className='edit-btn'><i className="fa-regular fa-pen-to-square"></i></button>
                                  <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                                </td>
                              </tr>
                            )
                          })
                        }
                    </tbody>
                  </Table>
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
                  {/* --------- */}
              </div>
            }
            {/* cancel */}
            {
              isCancel &&
              <div className='order'>
                  <div className="order-heading">
                    <input type="text" className='search-input' placeholder='Nhập mã đơn hàng' name="" id="" />
                  </div>
                  {/* ------- */}
                  <div className='order-card'>
                  <div className='table'>
                  <Table striped bordered hover>
                    <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                      <tr>
                      <th>Mã đơn hàng</th>
                      <th>Thông tin người nhận</th>
                      <th>Loại thanh toán</th>
                      <th>Tổng tiền đơn hàng</th>
                      <th>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                          orderByIdStore?.filter(item => item.status === 4).map((order, index) => {
                            let loaiThanhToan;
                            if(order.payment === 1) {
                              loaiThanhToan = 'Trực tiếp'
                            }else {
                              loaiThanhToan = 'Zalo Pay'
                            }
                            return(
                              <tr key={order.id}>
                                <td>{order.id}</td>
                                <td style={{textAlign: 'left'}}>
                                  {order.name}
                                  <br />{order.phone}
                                  <br />{order.address}
                                </td>
                                <td>{loaiThanhToan}</td>
                                <td></td>
                                <td className='button'>
                                  <button className='edit-btn' onClick={() => handleDetailOrder(order.id)}><i className="fa-solid fa-binoculars"></i></button>
                                  <button className='edit-btn' ><i className="fa-regular fa-pen-to-square"></i></button>
                                  <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                                </td>
                              </tr>
                            )
                          })
                        }
                    </tbody>
                  </Table>
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
                  {/* --------- */}
              </div>
            }
    </div>
  )
}

export default OrderStorePage