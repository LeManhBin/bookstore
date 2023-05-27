import React, { useEffect, useState } from 'react'
import './PaymentSuccess.scss'
import succesImg from '../../assets/imgs/success.svg'
import failureImg from '../../assets/imgs/failure.svg'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchConfirmRegisterService } from '../../redux/features/serviceSlice/serviceSlide';
const PaymentSuccess = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const { vnp_ResponseCode } = queryString?.parse(location?.search);
  const { vnp_OrderInfo } = queryString?.parse(location?.search);
  const [isSuccess, setIsSuccess] = useState(false)
  const {user} = useSelector((state) => state.user)
  
  const serviceId = localStorage.getItem("serviceId")
  const dataService = {
    storeId:user?.storeId,
    idService: Number(serviceId)
  }
  console.log(dataService);
  const handleCheckPayment = () => {
    if (vnp_ResponseCode == '00') {
      setIsSuccess(true)
    } else {
      setIsSuccess(false)
    }
  }

  useEffect(() => {
    handleCheckPayment();
  }, []);

  useEffect(() => {
    if(user?.storeId){
      dispatch(actFetchConfirmRegisterService(dataService))
    }
  },[user])


  return (
    <div className='payment-success'>
        <div className='left'>
            {/* <span className='icon' style={isSuccess ? "" : {backgroundColor: '#F50057'}}>{isSuccess ? <i className="fa-solid fa-check"></i>:<i className="fa-solid fa-triangle-exclamation"></i>}</span> */}
            {
              isSuccess ? <h2>Thanh toán thành công</h2> :
              <h2 style={{color: '#F50057'}}>Thanh toán thất bại</h2>
            }
            <span></span>
        </div>
        <div className="right">
            <img src={isSuccess ? succesImg : failureImg} alt="" />
        </div>
    </div>
  )
}

export default PaymentSuccess