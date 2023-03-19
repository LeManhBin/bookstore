import React from 'react'
import './WishListPage.scss'
import Heading from '../../components/Heading/Heading'
import { Table } from 'react-bootstrap'
import useScrollToTop from '../../hooks/useScrollToTop'
const WishListPage = () => {
  useScrollToTop()
  return (
    <div className='wishlist-page'>
        <div className="heading">
          <Heading title={"Wish List"}/>
        </div>
        <div className='wishlist-container'>
          <Table striped bordered hover>
            <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
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
                  <td className='button'>
                    <button>Gỡ</button>
                    <button>Thêm vào giỏ hàng</button>
                  </td>
                </tr>
            </tbody>
          </Table>
        </div>
    </div>
  )
}

export default WishListPage