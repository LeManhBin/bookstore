import React, { useState } from 'react'
import './UnWatchedContactPage.scss'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Table from 'react-bootstrap/Table';
import { NavLink, useNavigate } from 'react-router-dom';
import ViewContact from '../../components/ViewContact/ViewContact';
const UnWatchedContactPage = () => {
    const [isWatchContact, setIsWatchContact] = useState(false)
    const navigate = useNavigate()
    
    const styleActive = ({isActive}) => {
        return {
          backgroundColor: isActive ? '#F65D4E' : '#5a5a5a'
        }
    }
  return (
    <div className='manager'>
        <div className='heading'>
            <AdminHeading title={'Quản lý liên hệ'}/>
        </div>
        <div className='search'>
            <div className='search-input'>
            <NavLink style={styleActive} to={'/admin/contact'}><button>Xem tất cả</button></NavLink>
            <NavLink style={styleActive} to={'/admin/contact-unread'}><button>Tin chưa xem</button></NavLink>
            </div>
        </div>
        <div className='manager-container'>
              <div className='table'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                      <th>STT</th>
                      <th>Họ Tên</th>
                      <th>Gmail</th>
                      <th>Chủ đề</th>
                      <th>Ngày gửi</th>
                      <th>Trạng thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Winter</td>
                      <td>a@gmail.com</td>
                      <td>Web lag quá</td>
                      <td>15/03/2023</td>
                      <td>Chưa xem</td>
                      <td className='button'>
                        <button className='edit-btn' onClick={() => setIsWatchContact(true)}>Xem</button>
                        <button className='delete-btn'><i className="fa-sharp fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
        </div>
        {
            isWatchContact && <ViewContact setIsWatchContact={setIsWatchContact}/>
        }
    </div>
  )
}

export default UnWatchedContactPage