import React, { useEffect } from 'react'
import './AccountLockPage.scss'
import blockImg from "../../assets/imgs/block.svg"
import { useDispatch } from 'react-redux'
import { actLogout } from '../../redux/features/userSlice/userSlice'
const AccountLockPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actLogout())
    },[])
  return (
    <div className='block-page'>
        <img src={blockImg} alt="" />
    </div>
  )
}

export default AccountLockPage