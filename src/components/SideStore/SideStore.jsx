import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SideStore.scss'

const SideStore = () => {

    const [showItem1, setShowItem1] = useState(false)
    const [showItem2, setShowItem2] = useState(false)
    const [showItem3, setShowItem3] = useState(false)
    const [showItem4, setShowItem4] = useState(false)
    const [showItem5, setShowItem5] = useState(false)
  return (
    <div className='sidebar'>
    <div className='logo'>
        <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/logo-1.svg" alt="" />
    </div>
    <div className='sidebar-container'>
        <ul className='category'>
            <li className='item'>
                    <div className='title' onClick={() => setShowItem1(!showItem1)}>
                        <div className='name'>
                            <i className="fa-solid fa-chart-line"></i>
                            <span>Quản lý thống kê</span>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    {
                        showItem1 && 
                        <ul className='links'>
                            <Link to={'/store'}>
                                <li className='link'>Bảng thống kê</li>
                            </Link>
                        </ul>
                    }
            </li>
            <li className='item'>
                <div className='title' onClick={() => setShowItem5(!showItem5)}>
                    <div className="name">
                        <i className="fa-solid fa-store"></i>
                        <span>Quản lý đơn hàng</span>
                    </div>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
                {
                    showItem5 && 
                    <ul className='links'>
                        <Link to={'/store/order-store'}>
                            <li className='link'>Đơn hàng</li>
                        </Link>
                    </ul>
                }
            </li>
            <li className='item'>
                <div className='title' onClick={() => setShowItem2(!showItem2)}>
                    <div className="name">
                        <i className="fa-solid fa-table-cells"></i>
                        <span>Quản lý sản phẩm</span>
                    </div>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
                {
                    showItem2 && 
                    <ul className='links'>
                        <Link to={'/store/all-product'}>
                            <li className='link'>Tất cả sản phẩm</li>
                        </Link>
                        <Link to={'/store/add-product'}>
                            <li className='link'>Thêm sản phẩm</li>
                        </Link>
                    </ul>
                }
            </li>
            <li className='item'>
                    <div className='title' onClick={() => setShowItem3(!showItem3)}>
                        <div className="name">
                            <i className="fa-solid fa-user"></i>
                            <span>Quản lý khuyến mãi</span>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    {
                        showItem3 && 
                        <ul className='links'>
                            <Link to={'/store/list-promotion'}>
                                <li className='link'>Danh sách khuyến mãi</li>
                            </Link>
                            <Link to={'/store/add-promotion'}>
                                <li className='link'>Thêm khuyễn mãi</li>
                            </Link>
                        </ul>
                    }
            </li>
            <li className='item'>
                    <div className='title' onClick={() => setShowItem4(!showItem4)}>
                        <div className="name">
                            <i className="fa-solid fa-user"></i>
                            <span>Quản lý dịch vụ</span>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    {
                        showItem4 && 
                        <ul className='links'>
                            <Link to={'/store/list-service'}>
                                <li className='link'>Danh sách dịch vụ</li>
                            </Link>
                        </ul>
                    }
            </li>
        </ul>
    </div>
</div>
  )
}

export default SideStore