import React from 'react'
import './PaymentSuccess.scss'
import succesImg from '../../assets/imgs/success.svg'
const PaymentSuccess = () => {
  return (
    <div className='payment-success'>
        <div className='left'>
            <span className='icon'><i className="fa-solid fa-check"></i></span>
            <h2>Thanh toán thành công</h2>
            <span></span>
        </div>
        <div className="right">
            <img src={succesImg} alt="" />
        </div>
    </div>
  )
}

export default PaymentSuccess