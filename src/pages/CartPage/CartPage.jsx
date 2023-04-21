import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../../components/Heading/Heading'
import useScrollToTop from '../../hooks/useScrollToTop'
import {actChangeQuantity, actDeleteCart, actFetchAllDataCartByIdUser} from '../../redux/features/cartSlice/cartSlice'
import './CartPage.scss'
import { useNavigate } from 'react-router-dom'
import { actCreatePayment } from '../../redux/features/paymentSlice/paymentSlice'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading/Loading'
import { IMG_URL } from '../../constants/config'
const CartPage = () => {

  useScrollToTop()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {cartItems} = useSelector((state) => state.cart)
  // const {totalAmount} = useSelector((state) => state.cart)
  const {user} = useSelector((state) => state.user)
  const idUser = user.id
  const [cartChecked, setCartChecked] = useState([])
  // let totalPayment = totalAmount;

  const [totalPayment, setTotalPayment] = useState(0)
  let formattedTotalPayment = totalPayment.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});

  const {isLoading} = useSelector((state) => state.cart)

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      setIsLoaded(!isLoading);
  }, [isLoading]);
  
  
  const handleRemove = (item) => {
    dispatch(actDeleteCart(item, idUser))
  }

  const handleGetTotal = () => {
    let totalPayment = 0;
    cartItems.forEach((item) => {
      item.cartDetails.forEach((itemChild) => {
        if (cartChecked.includes(itemChild.id)) {
          totalPayment += (itemChild.price - (itemChild.price * (itemChild.discount/100))) *itemChild.amount ;
        }
      });
    });
    setTotalPayment(totalPayment);

  }

  useEffect(() => {
    handleGetTotal();
  }, [cartChecked]);

  
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

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCartChecked([...cartChecked, Number(value)]);
    } else {
      setCartChecked(cartChecked.filter((item) => item != value));
    }
    handleGetTotal()
  };

  const handleSubmit = () => {
    if(cartChecked.length == 0) {
      toast.warning('Bạn chưa chọn sản phẩm nào')
    }else{
      dispatch(actCreatePayment(cartChecked))
      navigate('/payment')
    }

  }

  return (
    <>
      {
        isLoaded ? (
          <div className='cart-page'>
          <div className="heading">
             <Heading title={"Giỏ Hàng"}/>
           </div>
   
           <div className='cart-container'>
             <Table className='heading-table'>
               <thead style={{ backgroundColor: '#F65D4E', color: '#fff' }}>
                 <tr>
                   <th>
                     <input type="checkbox" />
                   </th>
                   <th>Hình ảnh</th>
                   <th>Tên sản phẩm</th>
                   <th>Giá</th>
                   <th>Số lượng</th>
                   <th>Đơn giá</th>
                   <th>Thao Tác</th>
                 </tr>
               </thead>
             </Table>
             {Object.entries(
               cartItems.reduce((acc, item) => {
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
                         <input type="checkbox" />
                       </th>
                       <th>
                         <h4 style={{cursor: 'pointer'}}>{storeName}</h4>
                       </th>
                       <th></th>
                       <th></th>
                       <th></th>
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
                       let totalPrice = (item.cartDetails[index].price - (item.cartDetails[index].price * (item.cartDetails[index].discount/100))) * item.cartDetails[index].amount;
                       let priceAfterDiscount = (item.cartDetails[index].price - (item.cartDetails[index].price * (item.cartDetails[index].discount/100)))
                       let formattedPriceAfterDiscount = priceAfterDiscount.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      });
                       let formattedTotalPrice = totalPrice.toLocaleString('vi-VN', {
                         style: 'currency',
                         currency: 'VND',
                       });
                       return item.cartDetails.map((itemChild) => (
                        
                         <tr key={itemChild?.id}>
                           <td>
                           <input type="checkbox" value={Number(itemChild.id)} name={itemChild.id} checked={cartChecked.includes(itemChild.id)} onChange={handleCheckboxChange}/> 
                           </td>
                           <td className='img'>
                             <img
                               src={`${IMG_URL}${itemChild.image}`}
                               alt='Product'
                             />
                           </td>
                           <td className='name'>{itemChild?.name}</td>
                           <td className='price'>
                            {
                              itemChild.discount > 0 ? 
                              (   
                                  <>
                                    <p style={{textDecoration: 'line-through'}}>{formattedPrice}</p>
                                    <p>{formattedPriceAfterDiscount}</p>
                                  </>
                              ):
                              <p>{formattedPrice}</p>
                            }
                           </td>
                           <td className='button'>
                             <button onClick={() => handleDecre(itemChild)}>-</button>
                             <input type='number' min={1} value={itemChild.amount} />
                             <button onClick={() => handleIncre(itemChild)}>+</button>
                           </td>
                           <td className='total-price'>${formattedTotalPrice}</td>
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
             {cartItems.length === 0 && (
               <div className='cart-empty'>Chưa có sản phẩm nào trong giỏ hàng</div>
             )}
   
               <div className='total-container'>
                 <div className='form'>
                   <span className='title'>Cart Total</span>
                   <div className='total'>
                     {/* <div className='subtotal'>
                       <span>Subtotal:</span>
                       <span className='price'>$150</span>
                     </div> */}
                     <div className='totalpayment'>
                       <span>Total:</span>
                       <span className='price'>${formattedTotalPayment}</span>
                     </div>
                     <button className='payment-btn' onClick={handleSubmit}>Thanh toán</button>
                   </div>
                 </div>
               </div>
           </div>
       </div>
        ): (
          <Loading/>
        )
      }
    </>
  )
}

export default CartPage