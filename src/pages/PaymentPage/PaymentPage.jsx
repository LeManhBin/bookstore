import React, { useEffect, useState } from 'react'
import './PaymentPage.scss'
import Heading from '../../components/Heading/Heading'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllPayment } from '../../redux/features/paymentSlice/paymentSlice'
import { actFetchUserById } from '../../redux/features/userSlice/userSlice'
import { actChangeQuantity, actDeleteCart, actFetchAllDataCartByIdUser } from '../../redux/features/cartSlice/cartSlice'
const PaymentPage = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const idUser = user.id
    const {allPayment} = useSelector((state) => state.payment)

    console.log(idUser);
    console.log(allPayment);
    useEffect(() => {
        dispatch(actFetchAllPayment(idUser))
    },[])
    const [totalPayment, setTotalPayment] = useState(0)
    let formattedTotalPayment = totalPayment.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  
  
    
    const handleRemove = (item) => {
      dispatch(actDeleteCart(item, idUser))
    }
  
    useEffect(() => {
        let totalPrice = 0;
        allPayment.forEach((payment) => {
          payment.cartDetails.forEach((cart) => {
            totalPrice += cart.price;
          });
        });
        setTotalPayment(totalPrice);
      }, []);

      console.log(totalPayment);
  
    
      useEffect(() => {
          dispatch(actFetchAllDataCartByIdUser(user?.id))
      },[])
  
    const handleIncre = (item) => {
      let quantity = item.amount
      quantity++
      dispatch(actChangeQuantity(item, quantity, idUser))
    }
  
    const handleDecre = (item) => {
      let quantity = item.amount
      quantity--
      dispatch(actChangeQuantity(item, quantity, idUser))
    }

  return (
    <div className='payment-page'>
        <div className="heading">
          <Heading title={"Thanh toán"}/>
        </div>
        <div className="payment-container">
            <div className="left">
                <div className='cart-container'>
                    <Table className='heading-table'>
                        <thead style={{ backgroundColor: '#F65D4E', color: '#fff' }}>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            {/* <th>Số lượng</th> */}
                            <th>Đơn giá</th>
                            <th>Thao Tác</th>
                        </tr>
                        </thead>
                    </Table>

                    {Object.entries(
                            allPayment.reduce((acc, item) => {
                            if (!acc[item.store.name]) {
                                acc[item.store.name] = [];
                            }
                            acc[item.store.name].push(item);
                            return acc;
                            }, {})
                        ).map(([storeName, items]) => (
                            <div key={storeName}>
                            
                            <Table striped bordered hover>
                                <thead style={{ backgroundColor: '#F65D4E', color: '#fff', width: '100%' }}>
                                <tr>
                                    <th>
                                        <h4>{storeName}</h4>
                                    </th>
                                    <th></th>
                                    <th></th>
                                    {/* <th></th> */}
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map((item, index) => {
                                    let price = item.cartDetails[index].price;
                                    let formattedPrice = price.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    });
                                    let totalPrice = item.cartDetails[index].price * item.cartDetails[index].amount;
                                    let formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    });
                                    return item.cartDetails.map((itemChild) => (
                                    <tr key={itemChild?.id}>
                                        <td className='img' style={{width: "120px", height: "150px"}}>
                                            <img src={`data:image/jpeg;base64,${itemChild?.imagebyte}`} alt='Product' style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                        </td>
                                        <td className='name'>{itemChild?.name}</td>
                                        <td className='price'>{formattedPrice}</td>
                                        {/* <td className='button'>
                                        <button onClick={() => handleDecre(itemChild)}>-</button>
                                        <input type='number' min={1} value={itemChild.amount} />
                                        <button onClick={() => handleIncre(itemChild)}>+</button>
                                        </td> */}
                                        <td>${formattedTotalPrice}</td>
                                        <td className='button'>
                                        <button onClick={() => handleRemove(itemChild)}>Gỡ</button>
                                        </td>
                                    </tr>
                                    ));
                                })}
                                </tbody>
                            </Table>
                            </div>
                        ))}
                    <div className='total-payment'>
                        <p className='total'>Tổng tiền: <span className='money'>{formattedTotalPayment}</span></p>
                    </div>
                </div>
            </div>
            <div className="right">
                <form action="">
                    <div className="form-input">
                        <label htmlFor="">Họ và tên</label>
                        <input type="text" placeholder='Nhập họ và tên' />
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Số điện thoại</label>
                        <input type="text" placeholder='Nhập số điện thoại' />
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Địa chỉ</label>
                        <input type="text" placeholder='Nhập địa chỉ nhận hàng' />
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Ghi chí</label>
                        <textarea name="" id="" cols="30" rows="3" placeholder='Nhập ghi chú'></textarea>
                    </div>
                    <div className="payment-methods">
                        <label htmlFor="" className='title'>Phương thức thanh toán</label>
                        <div className='method'>
                            <input  type="radio" id="direct" name="payment" value="1"/>
                            <label htmlFor="direct">Thanh toán khi nhận hàng</label>
                        </div>
                        <div className='method'>
                            <input  type="radio" id="zalo" name="payment" value="2"/>
                            <img src="https://img.websosanh.vn/v2/users/financial/images/ypa8r8jf575ck.jpg?compress=85" alt="" />
                        </div>
                    </div>

                    <div className="payment-btn">
                        <button>Thanh toán</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PaymentPage