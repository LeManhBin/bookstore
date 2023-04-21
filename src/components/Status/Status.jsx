import React from 'react'
import './Status.scss'
const Status = ({text, className}) => {
  return (
    <div className='status-container'>
        <div className={`${className} status-tag`}>
          {text}
        </div>
    </div>
  )
}

export default Status