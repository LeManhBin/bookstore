import React, { useEffect, useState } from 'react'
import './AccountManagerPage.scss'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actDeleteUser, actFetchAllUser } from '../../redux/features/userSlice/userSlice';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/ModalDelete/Modal';


const AccountManagerPage = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [idTemp, setIdtemp] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {allUser} = useSelector((state) => state.user)

  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allUser.slice(firstPageIndex, lastPageIndex);

  const totalPage = allUser.length

  useEffect(() => {
    dispatch(actFetchAllUser())
  },[])
  const handleAddNewPage = () => {
    navigate('/admin/add-new-account')
  }


  const handleModalDelete = (id) => {
    setIsDelete(true)
    setIdtemp(id)
  }

  const handleDelete = (id) => {
    dispatch(actDeleteUser(id))
  }
  return (
    <div className='manager'>
        <div className='heading'>
            <AdminHeading title={'Quản lý tài khoản'}/>
        </div>
        <div className='search'>
            <div className='search-input'>
                <input type="text" placeholder='Nhập email hoặc số điện thoại...'/>
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <button className='add-new' onClick={handleAddNewPage}>Thêm mới</button>
        </div>
        <div className='manager-container'>
              <div className='table'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                      <th>STT</th>
                      <th>Họ Tên</th>
                      <th>Ảnh Đại diện</th>
                      <th>Gmail</th>
                      <th>SĐT</th>
                      <th>Giới tính</th>
                      <th>Địa Chỉ</th>
                      <th>Quyền</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentItems.filter(user => user.status === 0).map((data, index) => {
                        return(
                          <tr key={data.id}>
                            <td>{currentPage + index}</td>
                            <td>{data.name}</td>
                            <td className='img'>
                                <img src={data.avatar} alt="" />
                            </td>
                            <td>{data.email}</td>
                            <td>{data.phone}</td>
                            <td>{data.gender}</td>
                            <td>{data.address}</td>
                            <td>{data.role.name}</td>
                            <td className='button'>
                              <button className='edit-btn'><i className="fa-regular fa-pen-to-square"></i></button>
                              <button className='delete-btn' onClick={() => handleModalDelete(data.id)}><i className="fa-sharp fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
                <div className='pagination'>
                    <Pagination
                    currentPage={currentPage}
                    limit={limit}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    background={'#AEE2FF'}
                />
                </div>
              </div>
        </div>
        {
            isDelete && 
            <Modal
            setIsDelete={setIsDelete} 
            title={"Bạn có chắc muốn xoá!"} 
            color={"#F65D4E"}
            handleDelete={handleDelete}
            idTemp={idTemp}
            />
          }
    </div>
  )
}

export default AccountManagerPage