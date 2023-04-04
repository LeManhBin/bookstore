import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import Pagination from '../../components/Pagination/Pagination'
import './OrderStorePage.scss'
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
                <input type="text" className='search-input' placeholder='Nhập mã đơn hàng' name="" id="" />
              </div>
              {/* ------- */}
              <div className='order-card'>
              <div className='table'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                      <th>STT</th>
                      <th>Mã đơn hàng</th>
                      <th>Tên khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Địa chỉ</th>
                      <th>Tổng tiền đơn hàng</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className='button'>
                            <button className='edit-btn' ><i className="fa-solid fa-binoculars"></i></button>
                            <button className='edit-btn' ><i className="fa-regular fa-pen-to-square"></i></button>
                            <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                          </td>
                        </tr>
                  </tbody>
                </Table>
                {/* <div className='pagination'>
                    <Pagination
                    currentPage={currentPage}
                    limit={limit}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    background={'#AEE2FF'}
                /> */}
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
                          <th>STT</th>
                          <th>Mã đơn hàng</th>
                          <th>Tên khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
                          <th>Tổng tiền đơn hàng</th>
                          <th>Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className='button'>
                                <button className='edit-btn' ><i className="fa-solid fa-binoculars"></i></button>
                                <button className='edit-btn' ><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                      </tbody>
                    </Table>
                    {/* <div className='pagination'>
                        <Pagination
                        currentPage={currentPage}
                        limit={limit}
                        setCurrentPage={setCurrentPage}
                        totalPage={totalPage}
                        background={'#AEE2FF'}
                    /> */}
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
                          <th>STT</th>
                          <th>Mã đơn hàng</th>
                          <th>Tên khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
                          <th>Tổng tiền đơn hàng</th>
                          <th>Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className='button'>
                                <button className='edit-btn' ><i className="fa-solid fa-binoculars"></i></button>
                                <button className='edit-btn' ><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                      </tbody>
                    </Table>
                    {/* <div className='pagination'>
                        <Pagination
                        currentPage={currentPage}
                        limit={limit}
                        setCurrentPage={setCurrentPage}
                        totalPage={totalPage}
                        background={'#AEE2FF'}
                    /> */}
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
                          <th>STT</th>
                          <th>Mã đơn hàng</th>
                          <th>Tên khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
                          <th>Tổng tiền đơn hàng</th>
                          <th>Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className='button'>
                                <button className='edit-btn' ><i className="fa-solid fa-binoculars"></i></button>
                                <button className='edit-btn' ><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                      </tbody>
                    </Table>
                    {/* <div className='pagination'>
                        <Pagination
                        currentPage={currentPage}
                        limit={limit}
                        setCurrentPage={setCurrentPage}
                        totalPage={totalPage}
                        background={'#AEE2FF'}
                    /> */}
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
                          <th>STT</th>
                          <th>Mã đơn hàng</th>
                          <th>Tên khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
                          <th>Tổng tiền đơn hàng</th>
                          <th>Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className='button'>
                                <button className='edit-btn' ><i className="fa-solid fa-binoculars"></i></button>
                                <button className='edit-btn' ><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn' ><i className="fa-sharp fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                      </tbody>
                    </Table>
                    {/* <div className='pagination'>
                        <Pagination
                        currentPage={currentPage}
                        limit={limit}
                        setCurrentPage={setCurrentPage}
                        totalPage={totalPage}
                        background={'#AEE2FF'}
                    /> */}
                  </div>
                  </div>
                  {/* --------- */}
              </div>
            }
    </div>
  )
}

export default OrderStorePage