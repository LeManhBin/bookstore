import React, { useEffect, useState } from 'react'
import Widget from '../../components/Widget/Widget'
import './RevenueStorePage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actChangeOrderStatus, actFetchOrderByIdStore } from '../../redux/features/orderSlice/orderSlice'
import { actFetchBookByIdStore, actFetchPromotionByStoreId } from '../../redux/features/bookSlice/bookSlice'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Status from '../../components/Status/Status'
import Pagination from '../../components/Pagination/Pagination'
import ChartColumn from '../ChartColumn/ChartColumn'
import PieChart from '../PieChart/PieChart'
const RevenueStorePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {orderByIdStore} = useSelector((state) => state.order)
  const {bookByStore} = useSelector((state) => state.book)
  const [totalMoney, setTotalMoney] = useState(0)
  const {bookPromotionByIdStore} = useSelector((state) => state.book)
  const {user} = useSelector((state) => state.user)
  const idStore = user.storeId
  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = orderByIdStore.filter(order => order.status === 0).slice(firstPageIndex, lastPageIndex);

  const totalPage = orderByIdStore.filter(order => order.status === 0).length

  useEffect(() => {
    dispatch(actFetchOrderByIdStore(idStore))
    dispatch(actFetchBookByIdStore(idStore))
    dispatch(actFetchPromotionByStoreId(idStore))
  },[idStore])

  const orderQuantity = orderByIdStore.length
  const productQuantity = bookByStore.length
  const promotionQuantity = bookPromotionByIdStore.length
  const formatToTalMoney = totalMoney?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
  const handleTotalMoney = () => {
    let total = 0
    const data = orderByIdStore.filter(data => data.status === 3)
    for(let i = 0; i < data.length; i++) {
      total += data[i].totalMoney
    }
    setTotalMoney(total)
  }
  
  const handleConfirm = (id) => {
    dispatch(actChangeOrderStatus(id,1, idStore))
  }

  
  const handleDetailOrder = (id) => {
    navigate(`/store/order-store/${id}`)
  }

  useEffect(() => {
    handleTotalMoney()
  })
  
  return (
    <div className='revenue-container'>
      <div className="wrapper-container">
        <Widget type="order" quantity={orderQuantity}/>
        <Widget type="product" quantity={productQuantity}/>
        <Widget type="promotion" quantity={promotionQuantity}/>
        <Widget type="revenueStore" quantity={formatToTalMoney}/>
      </div>
      <div className="chart-container">
        {/* <div className="chart-left">
          <PieChart/>
        </div> */}
        <div className="chart-right">
          <ChartColumn/>
        </div>
      </div>
      <div className="table-container">
        <Table striped bordered hover className='table'>
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
                currentItems.map((order, index) => {
                  let loaiThanhToan;
                  const formatTotalMoney = order?.totalMoney?.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });
                  if(order.payment === 1) {
                    loaiThanhToan = <Status text={"Trực tiếp"} className={"active"}/>
                  }else {
                    loaiThanhToan = <Status text={"Zalo Pay"} className={"primary"}/>
                  }
                  return(
                    <tr key={order.id}>
                      <td style={{verticalAlign: 'middle', textAlign: 'center'}}>{order.id}</td>
                      <td style={{textAlign: 'left'}}>
                        {order.name}
                        <br />{order.phone}
                        <br />{order.address}
                      </td>
                      <td style={{verticalAlign: 'middle', textAlign: 'center'}}>{loaiThanhToan}</td>
                      <td>{formatTotalMoney}</td>
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
    </div>
  )
}

export default RevenueStorePage