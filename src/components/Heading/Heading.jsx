import React from 'react'
import './Heading.scss'
const Heading = ({title}) => {
  return (
    <div className='heading-container'>
        <h1>{title}</h1>
    </div>
  )
}

export default Heading