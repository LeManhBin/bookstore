import React, { useEffect } from 'react'
import './Modal.scss'
const Modal = ({setIsDelete, title, color, handleDelete, idTemp}) => {
    const handleClick = () => {
        handleDelete(idTemp)
        setIsDelete(false)
    }


  return (
    <div className='modal'>
        <div className="title">{title}</div>
        <div className='button'>
            <button className='cancel-btn' onClick={() => setIsDelete(false)}>Cancel</button>
            <button className='continue-btn' style={{backgroundColor: `${color}`}} onClick={() => handleClick()}>Delete</button>
        </div>
    </div>
  )
}

export default Modal