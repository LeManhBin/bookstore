import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import AdminHeading from '../../components/AdminHeading/AdminHeading';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchOrderDetail } from '../../redux/features/orderSlice/orderSlice';
import './OrderDetailPage.scss'
import { IMG_URL } from '../../constants/config';
const OrderDetailPage = () => {
    const param = useParams()
    const dispatch = useDispatch()
    const {order} = useSelector((state) => state.order)

    useEffect(() => {
        dispatch(actFetchOrderDetail(Number(param.idOrder)))
    },[param])


    let totalPrice = 0;
    let discountAmount = 0;

    for(let i = 0; i < order?.orderDetails?.length; i++){

        let _order = order?.orderDetails[i];
        let price = _order.price * _order.amount;
        let discountPercent = _order.discount;
        let discount = (price * discountPercent) / 100;
        totalPrice += (price - discount);
        discountAmount += discount;
    }

    const formatTotalPrice = totalPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

  return (
    <div className='order-detail'>
        <div className="order-detail-heading">
         <AdminHeading title={`Chi tiết đơn hàng ${param.idOrder}`}/> 
         <p>Tổng tiền đơn hàng: {formatTotalPrice}</p>
        </div>
        <div className='order-card'>
            <div className="user">
                <p>Tên người nhận: {order.name}</p>
                <p>SĐT: {order.phone}</p>
                <p>Địa chỉ: {order.address}</p>
            </div>
            <div className='table'>
                <Table striped bordered hover>
                    <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Khuyến mãi</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order?.orderDetails?.map((order, index) => {
                                const priceAfterDiscount = (order.price - (order.price * (order.discount/100)) ) * order.amount
                                const formatPrice = order?.price.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                });
                                let formattedPriceAfterDiscount = priceAfterDiscount.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                });
                                return(
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.name}</td>
                                        <td >
                                            <img src={`${IMG_URL}${order.image}`} alt="" style={{width: '50px', height: '80px', objectFit: 'cover'}}/>
                                        </td>
                                        <td>
                                            {order.amount}
                                        </td>
                                        <td>{formatPrice}</td>
                                        <td>{order.discount}%</td>
                                        <td>{formattedPriceAfterDiscount}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>

    </div>
  )
}

export default OrderDetailPage