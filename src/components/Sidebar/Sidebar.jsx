import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.scss'
const Sidebar = () => {
    const [showItem1, setShowItem1] = useState(false)
    const [showItem2, setShowItem2] = useState(false)
    const [showItem3, setShowItem3] = useState(false)
    const [showItem4, setShowItem4] = useState(false)
    const [showItem5, setShowItem5] = useState(false)
    const [showItem6, setShowItem6] = useState(false)
    const [showItem7, setShowItem7] = useState(false)

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
                                <Link to={'/admin'}>
                                    <li className='link'>Bảng thống kê</li>
                                </Link>
                            </ul>
                        }
                </li>
                <li className='item'>
                    <div className='title' onClick={() => setShowItem5(!showItem5)}>
                        <div className="name">
                            <i className="fa-solid fa-store"></i>
                            <span>Quản lý cửa hàng</span>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    {
                        showItem5 && 
                        <ul className='links'>
                            <Link to={'/admin/store-list'}>
                                <li className='link'>Danh sách cửa hàng</li>
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
                            <Link to={'/admin/category'}>
                                <li className='link'>Quản lý danh mục</li>
                            </Link>
                            <Link to={'/admin/topic'}>
                                <li className='link'>Quản lý chủ đề</li>
                            </Link>
                        </ul>
                    }
                </li>
                <li className='item'>
                    <div className='title' onClick={() => setShowItem3(!showItem3)}>
                        <div className="name">
                            <i className="fa-solid fa-user"></i>
                            <span>Quản lý tài khoản</span>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    {
                        showItem3 && 
                        <ul className='links'>
                            <Link to={'/admin/account-manager/user'}>
                                <li className='link'>Người dùng</li>
                            </Link>
                            <Link to={'/admin/account-manager/admin'}>
                                <li className='link'>Quản trị viên</li>
                            </Link>
                            <Link to={'/admin/add-new-account'}>
                                <li className='link'>Thêm tài khoản</li>
                            </Link>
                        </ul>
                    }
                </li>
                <li className='item'>
                    <div className='title' onClick={() => setShowItem4(!showItem4)}>
                        <div className="name">
                            <i className="fa-solid fa-ticket"></i>
                            <span>Quản lý dịch vụ</span>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    {
                        showItem4 && 
                        <ul className='links'>
                            <Link to={'/admin/service'}>
                                <li className='link'>Danh sách dịch vụ</li>
                            </Link>
                            <Link to={'/admin/add-new-service'}>
                                <li className='link'>Thêm dịch vụ</li>
                            </Link>
                        </ul>
                    }
                </li>
                <li className='item'>
                    <div className='title' onClick={() => setShowItem6(!showItem6)}>
                        <div className="name">
                            <i className="fa-solid fa-bell"></i>
                            <span>Quản lý liên hệ</span>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    {
                        showItem6 && 
                        <ul className='links'>
                            <Link to={'/admin/contact'}>
                                <li className='link'>Quản lý liên hệ</li>
                            </Link>
                        </ul>
                    }
                </li>
                <li className='item'>
                    <div className='title' onClick={() => setShowItem7(!showItem7)}>
                        <div className="name">
                            <i className="fa-solid fa-gear"></i>
                            <span>Cài đặt</span>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    {
                        showItem7 && 
                        <ul className='links'>
                            <Link to={'/admin/config-slide'}>
                                <li className='link'>Quản lý slide</li>
                            </Link>
                        </ul>
                    }
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar