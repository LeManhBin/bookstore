import React, { useState } from 'react'
import './Evaluate.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actCreateEvaluate } from '../../redux/features/evaluateSlice/evaluateSlice';
import { actChangeOrderStatus, actReviewDoneChangeStatus } from '../../redux/features/orderSlice/orderSlice';
const Evaluate = ({setIsRating, idTemp}) => {

  const [number, setNumber] = useState(0)
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const initialEvaluate = {
    userId: user.id,
    orderId: "",
    star: 0,
    comment: '',
  }
  const [evaluateState, setEvaluateState] = useState(initialEvaluate)

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setEvaluateState({
      ...evaluateState,
      [name]: value,
      orderId: idTemp,
    })
  }

  const handleEvaluate = () => {
    dispatch(actCreateEvaluate({...evaluateState, star: number}))
    setIsRating(false)
    dispatch(actReviewDoneChangeStatus(idTemp, 5, user.id))
  }
  return (
    <div className='evaluate-container'>
      <span className='close' onClick={() => setIsRating(false)}><i className="fa-solid fa-xmark"></i></span>
        <h2 className='title'>Đánh giá của bạn</h2>
        <div className='rating'>
          {
            Array(5).fill().map((_, index) => (
                number >= index +  1 ?
                <i className="fa-solid fa-star" key={index} style={{cursor: 'pointer', margin: '5px', fontSize: '18px', color: '#FFD93D'}} onClick={() => setNumber(index +  1)}></i>
                :
                <i className="fa-solid fa-star" key={index} style={{cursor: 'pointer', margin: '5px', fontSize: '18px'}} onClick={() => setNumber(index +  1)}></i>
            ))
          }
        </div>
        <textarea name="comment" id="" cols="30" rows="10" placeholder='Nhập đánh giá của bạn..' value={evaluateState.comment} onChange={handleOnChange}></textarea>

        <button disabled={!number} onClick={handleEvaluate}>Đánh giá</button>

    </div>
  )
}

export default Evaluate