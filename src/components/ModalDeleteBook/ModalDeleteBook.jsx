import React from 'react'
import { KEY_USER } from '../../constants/config';
import { toast } from 'react-toastify';
const ModalDeleteBook = ({setIsDelete, title, color, handleDelete, idTemp, idStore}) => {
    const userCurrent = localStorage.getItem(KEY_USER) ? JSON.parse(localStorage.getItem(KEY_USER)) : {}

    const handleClick = () => {
      if(idTemp === userCurrent.id){
        toast.warning("Tài khoản đang online")
      }else{
        handleDelete(idTemp, idStore)
      }
        setIsDelete(false)
    }
  return (
    <div className='modal-container'>
        <div className="title">{title}</div>
        <div className='button'>
            <button className='cancel-btn' onClick={() => setIsDelete(false)}>Cancel</button>
            <button className='continue-btn' style={{backgroundColor: `${color}`}} onClick={() => handleClick()}>Delete</button>
        </div>
    </div>
  )
}

export default ModalDeleteBook