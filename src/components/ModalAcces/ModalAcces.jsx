import React from 'react'
import './ModalAccses.scss'
const ModalAcces = ({setIsDelete, title, color, handleDelete, idTemp}) => {

    const handleClick = () => {
        handleDelete(idTemp)
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

export default ModalAcces