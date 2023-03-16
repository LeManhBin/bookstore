import React from 'react'
import './AdminHeading.scss'
const AdminHeading = ({title}) => {
  return (
    <div className='heading'>
        <h2>{title}</h2>
    </div>
  )
}

export default AdminHeading