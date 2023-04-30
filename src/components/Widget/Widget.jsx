import React from 'react'
import './Widget.scss'
import { Link } from 'react-router-dom';

const Widget = ({type, quantity}) => {
  let data 

  switch(type){
      case "user":
          data={
              title: "Người dùng",
              isMoney: false,
              link: "Quản lý người dùng",
              to: "admin/account-manager/user",
              amount: quantity,
              icon: <i className="fa-solid fa-circle-user" style={{color: '#FF7B54', backgroundColor: '#FFB26B' }}></i>
          };
          break;
      case "employee":
          data={
              title: "Employee",
              isMoney: false,
              link: "Quản trị viên",
              to: "admin/account-manager/admin",
              amount: quantity,
              icon: <i className="fa-solid fa-address-card" style={{color: '#47B5FF', backgroundColor: '#DFF6FF' }}></i>
          };
      break;
      case "store":
          data={
              title: "Cửa hàng",
              isMoney: false,
              link: "Quản lý cửa hàng",
              to: "admin/store-list",
              amount: quantity,
              icon: <i className="fa-solid fa-hotel" style={{color: '#439A97', backgroundColor: '#62B6B7' }}></i>
          };
          break;
      case "revenue":
          data={
              title: "Doanh thu",
              isMoney: true,
              amount: quantity,
              icon: <i className="fa-solid fa-sack-dollar" style={{color: '#379237', backgroundColor: '#54B435' }}></i>
          };
          break;
      case "order":
          data={
              title: "Đơn hàng",
              isMoney: false,
              amount: quantity,
              icon: <i className="fa-solid fa-truck" style={{color: '#D21312', backgroundColor: '#ED2B2A' }}></i>
          };
          break;
      case "product":
          data={
              title: "Sản phẩm",
              isMoney: false,
              amount: quantity,
              icon: <i className="fa-solid fa-boxes-stacked" style={{color: '#EBB02D', backgroundColor: '#F7DB6A' }}></i>
          };
          break;
      case "promotion":
          data={
              title: "Khuyến mãi",
              isMoney: false,
              amount: quantity,
              icon: <i className="fa-solid fa-gift" style={{color: '#088395', backgroundColor: '#05BFDB' }}></i>
          };
          break;
      case "revenueStore":
          data={
              title: "Doanh thu",
              isMoney: true,
              amount: 999,
              icon: <i className="fa-solid fa-sack-dollar" style={{color: '#379237', backgroundColor: '#54B435' }}></i>
          };
          break;
      default:
          break;
  }
  return (
    <div className='widget'>
        <div className="left">
          <div className="title">{data.title}</div>
          <div className="counter">{data.isMoney && "$"} {data.amount}</div> 
          <div className="link"><Link style={{textDecoration: 'none'}} to={`/${data.to}`}>{data.link}</Link></div>
        </div>
        <div className="right">
            {data.icon}
        </div>
    </div>
  )
}

export default Widget