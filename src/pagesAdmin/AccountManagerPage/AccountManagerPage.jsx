import React, { useEffect, useState } from 'react'
import './AccountManagerPage.scss'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actDeleteUser, actFetchAllUser, actFetchUserById } from '../../redux/features/userSlice/userSlice';
import Pagination from '../../components/Pagination/Pagination';
import UpdateAccount from './UpdateAccount';
import ModalDelete from '../../components/Modal/ModalDelete';
import ModalAcces from '../../components/ModalAcces/ModalAcces';
import { IMG_URL } from '../../constants/config';
import Status from '../../components/Status/Status';
import { toast } from 'react-toastify';


const AccountManagerPage = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [idTemp, setIdtemp] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {allUser} = useSelector((state) => state.user)
  const {user} = useSelector((state) => state.user)
  const userCurrent = localStorage.getItem("user")

  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(6)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allUser.slice(firstPageIndex, lastPageIndex);

  const totalPage = allUser.filter(user => user.role === 0).length

  const handleFilterAccount = () => {
    return allUser?.filter((user) => {
      return user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase());
    }).filter(user => user.role === 0).slice(firstPageIndex, lastPageIndex);
  }

  useEffect(() => {
    dispatch(actFetchAllUser())
  },[])
  const handleAddNewPage = () => {
    navigate('/admin/add-new-account')
  }

  const handleModalDelete = (id) => {
    if(user?.id === id) {
      toast.warning("Không thể xoá tài khoản đang hoạt động")
    }else {
      setIsDelete(true)
      setIdtemp(id)
    }
  }

  const handleDelete = (id) => {
    dispatch(actDeleteUser(id))
  }

  const handleModalUpdate = (id) => {
    navigate(`/admin/account-manager/${id}`)
  }
  return (
    <div className='manager'>
        <div className='heading'>
            <AdminHeading title={'Quản lý tài khoản người dùng'}/>
        </div>
        <div className='search'>
            <div className='search-input'>
                <input type="text" placeholder='Nhập email hoặc số điện thoại...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
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
                      <th>Quyền</th>
                      <th>Trạng thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        handleFilterAccount().map((data, index) => {
                          let active
                          if (data.status === 0) {
                            active = <Status text={"Hoạt động"} className={"active"}/>
                          }else {
                            active = <Status text={"Ngừng hoạt động"} className={"stop"}/>
                          }
                          let role
                          if(data?.role == 1) {
                            role = "Admin"
                          }else{
                            role = "Khách hàng"
                          }
                        return(
                          <tr key={data?.id}>
                            <td>{currentPage + index}</td>
                            <td className='name'>{data?.fullName}</td>
                            <td className='img'>
                                <img src={`${IMG_URL}${data?.avatar}`} alt="Avatar" />
                            </td>
                            <td className='email'>{data?.email}</td>
                            <td>{data?.phone}</td>
                            <td>{data?.gender}</td>
                            <td>{role}</td>
                            <td>{active}</td>
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleModalUpdate(data?.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                              <button className='delete-btn' onClick={() => handleModalDelete(data?.id)}><i className="fa-sharp fa-solid fa-trash"></i></button>
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
            <ModalAcces
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