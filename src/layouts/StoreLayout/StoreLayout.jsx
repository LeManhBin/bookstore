import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import SideStore from '../../components/SideStore/SideStore'
import './StoreLayout.scss'
import NavbarStore from '../../components/NavbarStore/NavbarStore'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchStoreById } from '../../redux/features/storeSlice/storeSlice'
import moment from 'moment';

const StoreLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.user)
    const {store} = useSelector((state) => state.store)
    const idStore = user?.storeId
    const [isExpired, setIsExpired] = useState(false)
    useEffect(() => {
        dispatch(actFetchStoreById(idStore))
    },[user])



    const currentDate = moment().format('YYYY-MM-DD');
    const endDate = store?.data?.endDate;

    const isBeforeEndDate = moment(currentDate).isBefore(endDate, 'day');


    const handleCheckExpired = () => {
        if(isBeforeEndDate === false) {
            setIsExpired(true)
        }else {
            setIsExpired(false)
        }
    }
    useEffect(() => {
        handleCheckExpired()
    },[store])


    const handleRegisterService = () => {
        navigate("/register-service")
    }

  return (
    <div className='store-layout'>
        {
            isExpired &&
            <div className='overlay'>
                <div className='popUp'>
                    <h2 className='popUp-title'>Dịch vụ đã hết hạn</h2>
                    <span>Để tiếp tục sử dụng dịch vụ vui lòng đăng ký</span>
                    <button onClick={handleRegisterService}>Đăng ký dịch vụ</button>
                </div>
            </div>
        }

        <div className='left'>
            <SideStore/>
        </div>
        <div className='right'>
            <div className="navbar">
                <NavbarStore/>
            </div>
            <div className="outlet">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default StoreLayout