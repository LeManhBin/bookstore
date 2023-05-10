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
import { actFetchServiceCode } from '../../redux/features/provinceSlice/provinceSlice'
import axios from 'axios'
const PaymentPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const idUser = user.id
    const {allPayment} = useSelector((state) => state.payment)
    const [clicked, setClicked] = useState(false);
    const [serviceCodeState, setServiceCodeState] = useState([])
    const userDistrict = user?.address?.districtId;
    const [shipMoney, setShipMoney] = useState([])
    const token = "9f6af25c-c0a6-11ed-be76-3233f989b8f3";

    ///service
        useEffect(() => {
        const promises = allPayment.map(p => {
            const data = {
                from_district: userDistrict,
                to_district: p?.store?.address?.districtId,
                shop_id: p?.store?.id
            };
            return axios.post(
                `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`,
                data,
                {
                    headers: {
                        token: token,
                    },
                }
            );
        });
        
        Promise.all(promises)
            .then((responses) => {
                const services = responses.map(response => {
                    return response.data.data;
                });
                setServiceCodeState(services)
            })
            .catch((error) => {
                console.log(error);
                // handle the error
            });
    }, [allPayment]);

    //ship
    useEffect(() => {
        const ShipPromises = allPayment.map((p, index)=> {
            const shipPromiseArray = serviceCodeState.map((s, index) => {
                const dataShip = {
                    shop_id: p?.store?.id,
                    service_id: s[index]?.service_id,
                    service_type_id: 2,
                    insurance_value: 1,
                    coupon: "",
                    from_district_id: userDistrict,
                    to_ward_code: p?.store?.address?.wardId,
                    to_district_id: p?.store?.address?.districtId,
                    weight: 12,
                    length: 12,
                    width: 12,
                    height: 12,
                    cod_value: 10000,
                };
    
                return axios.post(
                    `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
                    dataShip,
                    {
                        headers: {
                            token: token,
                        },
                    }
                );
            });
    
            return Promise.all(shipPromiseArray);
        });
        
        Promise.all(ShipPromises)
            .then((responses) => {
                const ship = responses.map((response,index) => response[index].data.data);
                setShipMoney(ship)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [serviceCodeState]);


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
        address: user?.address?.fullAddress,
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
    };

    const handleChangePayment = (e) => {
        const {value} = e.target;
        const payment = value
        setPayment(payment)
    }


    
    const stores = allPayment.map(payment => {
        let totalMoney = 0;
        const storeId = payment.store.id;
        const cartIds = payment.cartDetails.map(detail => detail.id);
        const note = "Giao hanh nhanh nhanh dum em";
        let shiping = 0
        shipMoney.forEach((ship) => {
            shiping += ship?.total
        })
        for(let i=0; i < payment?.cartDetails?.length; i++){
          let itemPrice = payment?.cartDetails?.[i].price * payment?.cartDetails?.[i].amount
          let discountAmount = itemPrice * (payment?.cartDetails?.[i].discount/100);
          totalMoney += itemPrice - discountAmount + shiping;
        }
        return { id: storeId, note, cartIds, totalMoney };
      });

      const handleGetTotal = () => {
        let totalPayment = 0;
        let totalShip = 0
        shipMoney.forEach((ship) => {
            totalShip += ship?.total
        })
        allPayment.forEach((item, index) => {
            item.cartDetails.forEach((itemChild) => {
                totalPayment += (itemChild.price - (itemChild.price * (itemChild.discount/100))) * itemChild.amount ;
            });
        });
        const shipAndPay = totalPayment + totalShip
        setTotalPayment(shipAndPay);
      }


    
      useEffect(() => {
        handleGetTotal();
      }, [allPayment, shipMoney]);
    
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
            navigate("/")
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
                            {/* <th>Thao Tác</th> */}
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
                        ).map(([storeName, items], index) => {
                            const formatShipMoney = shipMoney[index]?.total.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            });
                            return(
                                <div key={storeName}>
                                
                                <Table striped bordered hover>
                                    <thead style={{ backgroundColor: '#F65D4E', color: '#fff', width: '100%' }}>
                                    <tr>
                                        <th>
                                            <h4>{storeName}</h4>
                                        </th>
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
                                        return item.cartDetails.map((itemChild) => {
                                            let price = (itemChild.price - (itemChild.price * (itemChild.discount/100))) * itemChild.amount;
                                            let formatPrice = price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            });
                                            return(
                                                <tr key={itemChild?.id}>
                                                    <td className='img' style={{width: "120px", height: "150px"}}>
                                                        <img src={`${IMG_URL}${itemChild.image}`} alt='Product' style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                                    </td>
                                                    <td className='name'>{itemChild?.name}</td>
                                                    <td>{formatPrice}</td>
                                                    {/* <td className='button'>
                                                    <button onClick={() => handleRemove(itemChild)}>Gỡ</button>
                                                    </td> */}
                                                </tr>
                                            )
                                        });
                                    })}
                                    </tbody>
                                </Table>
                                <div className='ship-money' style={{textAlign: "right"}}>
                                    <p>Phí giao hàng: {formatShipMoney}</p>
                                </div>
                                </div>
                            )
                        })}
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
                        <input type="text" name='address' placeholder='Nhập địa chỉ nhận hàng' value={recipient?.address} disabled={true} onChange={handleOnChange}/>
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