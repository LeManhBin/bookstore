import React from 'react'
import './PopupCancelOrder.scss'
import { useDispatch } from 'react-redux'
import { actCancelOrder, actChangeOrderStatus } from '../../redux/features/orderSlice/orderSlice'
const PopupCancelOrder = ({color, handleCancelOrder, idTemp, setIsCancelOrder, idUser}) => {

    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(actCancelOrder(idTemp,4, idUser))
        setIsCancelOrder(false)
    }
  return (
    <div className='modal-container'>
        <div className="title">Bạn có chắc với thao tác này</div>
        <div className='button'>
            <button className='cancel-btn' onClick={() =>setIsCancelOrder(false)}>Cancel</button>
            <button className='continue-btn' style={{backgroundColor: `${color}`}} onClick={handleSubmit}>Huỷ đơn hàng</button>
        </div>
    </div>
  )
}

export default PopupCancelOrder