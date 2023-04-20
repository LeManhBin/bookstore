import React, { useEffect, useState } from 'react'
import './PaymentPage.scss'
import Heading from '../../components/Heading/Heading'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllPayment } from '../../redux/features/paymentSlice/paymentSlice'
import { actFetchUserById } from '../../redux/features/userSlice/userSlice'
import { actChangeQuantity, actDeleteCart, actFetchAllDataCartByIdUser } from '../../redux/features/cartSlice/cartSlice'
import { actCreateOrder } from '../../redux/features/orderSlice/orderSlice'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../../constants/config'
const PaymentPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const idUser = user.id
    const {allPayment} = useSelector((state) => state.payment)
    const [clicked, setClicked] = useState(false);
    const initialState = {
        stores: [],
        recipient: {},
        payment: 0,
    }
    const [order, setOrder] = useState(initialState)

    const [recipient, setRecipient] = useState({
        userId: idUser,
        name: user.fullName,
        phone: user.phone,
        address: user.address,
    })
    const [payment, setPayment] = useState(0)

    useEffect(() => {
        dispatch(actFetchAllPayment(idUser))
    },[])
    const [totalPayment, setTotalPayment] = useState(0)
    let formattedTotalPayment = totalPayment.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    
    const handleOnChange = (e) => {
        const {name, value} = e.target
        setRecipient({
            ...recipient,
            [name]: value,
        })
    }

    const handleChangePayment = (e) => {
        const {value} = e.target;
        const payment = value
        setPayment(payment)
    }


    
    const stores = allPayment.map(payment => {
        const storeId = payment.store.id;
        const cartIds = payment.cartDetails.map(detail => detail.id);
        const note = "Giao hanh nhanh nhanh dum em";
        return { id: storeId, note, cartIds };
    });


    
    const handleRemove = (item) => {
      dispatch(actDeleteCart(item, idUser))
    }

      const handleGetTotal = () => {
        let totalPayment = 0;
        allPayment.forEach((item) => {
          item.cartDetails.forEach((itemChild) => {
              totalPayment += (itemChild.price - (itemChild.price * (itemChild.discount/100))) *itemChild.amount ;
          });
        });
        setTotalPayment(totalPayment);
    
      }
    
      useEffect(() => {
        handleGetTotal();
      }, [allPayment]);
    
      useEffect(() => {
          dispatch(actFetchAllDataCartByIdUser(user?.id))
      },[])


    const handlePayment = (e) => {
        e.preventDefault()
        setClicked(true)
        setOrder({
            stores: stores,
            recipient: recipient,
            payment: Number(payment),
        })
    }

    useEffect(() => {
        if (clicked) {
            dispatch(actCreateOrder(order))
    
            const timeoutId = setTimeout(() => {
              setClicked(false);
            }, 1000);
            return () => {
              clearTimeout(timeoutId);
            };
          }
    },[clicked])

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
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map((item, index) => {
                                    let price = item.cartDetails[index].price;
                                    let totalPrice = (item.cartDetails[index].price - (item.cartDetails[index].price * (item.cartDetails[index].discount/100))) * item.cartDetails[index].amount;
                                    let formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    });
                                    return item.cartDetails.map((itemChild) => (
                                    <tr key={itemChild?.id}>
                                        <td className='img' style={{width: "120px", height: "150px"}}>
                                            <img src={`${IMG_URL}${itemChild.image}`} alt='Product' style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                        </td>
                                        <td className='name'>{itemChild?.name}</td>
                                        <td>${formattedTotalPrice}</td>
                                        <td className='button'>
                                        <button onClick={() => handleRemove(itemChild)}>Gỡ</button>
                                        </td>
                                    </tr>
                                    ));
                                })}
                                </tbody>
                                {/* <div className="form-input">
                                    <label htmlFor="">Ghi chú</label>
                                    <textarea name="" id="" cols="30" rows="3" placeholder='Nhập ghi chú'></textarea>
                                </div> */}
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
                        <input type="text" name='name' placeholder='Nhập họ và tên' value={recipient.name} onChange={handleOnChange}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Số điện thoại</label>
                        <input type="text" name='phone' placeholder='Nhập số điện thoại' value={recipient.phone} onChange={handleOnChange}/>
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Địa chỉ</label>
                        <input type="text" name='address' placeholder='Nhập địa chỉ nhận hàng' value={recipient.address} onChange={handleOnChange}/>
                    </div>
                    <div className="payment-methods">
                        <label htmlFor="" className='title'>Phương thức thanh toán</label>
                        <div className='method'>
                            <input  type="radio" id="direct" name="payment" value="1" onChange={handleChangePayment}/>
                            <label htmlFor="direct">Thanh toán khi nhận hàng</label>
                        </div>
                        <div className='method'>
                            <input  type="radio" id="zalo" name="payment" value="2" onChange={handleChangePayment}/>
                            <img src="https://img.websosanh.vn/v2/users/financial/images/ypa8r8jf575ck.jpg?compress=85" alt="" />
                        </div>
                    </div>

                    <div className="payment-btn">
                        <button onClick={handlePayment}>Thanh toán</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PaymentPage