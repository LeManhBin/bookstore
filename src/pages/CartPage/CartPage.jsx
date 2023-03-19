import React from 'react'
import { Table } from 'react-bootstrap'
import Heading from '../../components/Heading/Heading'
import useScrollToTop from '../../hooks/useScrollToTop'
import './CartPage.scss'
const CartPage = () => {
  useScrollToTop()
  return (
    <div className='cart-page'>
       <div className="heading">
          <Heading title={"Giỏ Hàng"}/>
        </div>
        <div className='cart-container'>
              <Table striped bordered hover>
                <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td className='img'>
                          <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/31.jpg" alt="" />
                      </td>
                      <td className='name'>alibaba</td>
                      <td className='price'>$150</td>
                      <td>
                        <input type="number" />
                      </td>
                      <td>
                        $150
                      </td>
                      <td className='button'>
                        <button>Gỡ</button>
                      </td>
                    </tr>
                </tbody>
              </Table>
            <div className="total-container">
                <div className="form">
                  <span className='title'>Cart Total</span>
                  <div className='total'>
                      <div className='subtotal'>
                          <span>Subtotal:</span> 
                          <span className='price'>$150</span>
                      </div>
                      <div className="totalpayment">
                          <span>Total:</span> 
                          <span className='price'>$150</span>
                      </div>
                      <button className='payment-btn'>Thanh toán</button>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartPage