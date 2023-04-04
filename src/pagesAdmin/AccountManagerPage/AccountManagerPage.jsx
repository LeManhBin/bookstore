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


const AccountManagerPage = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [idTemp, setIdtemp] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {allUser} = useSelector((state) => state.user)


  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allUser.slice(firstPageIndex, lastPageIndex);

  const totalPage = allUser.length

  const handleFilterBlog = () => {
    return allUser?.filter((user) => {
      return user?.object?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    }).slice(firstPageIndex, lastPageIndex);
  }

  useEffect(() => {
    dispatch(actFetchAllUser())
  },[])
  const handleAddNewPage = () => {
    navigate('/admin/add-new-account')
  }

  console.log(allUser);

  const handleModalDelete = (id) => {
    setIsDelete(true)
    setIdtemp(id)
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
            <AdminHeading title={'Quản lý tài khoản'}/>
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
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        handleFilterBlog().map((data, index) => {
                          let role
                          if(data?.object?.role == 1) {
                            role = "Admin"
                          }else{
                            role = "Khách hàng"
                          }
                        return(
                          <tr key={data?.object?.id}>
                            <td>{currentPage + index}</td>
                            <td className='name'>{data?.object?.fullName}</td>
                            <td className='img'>
                                <img src={`data:image/jpeg;base64,${data?.file}`} alt="Avatar" />
                            </td>
                            <td className='email'>{data?.object?.email}</td>
                            <td>{data?.object?.phone}</td>
                            <td>{data?.object?.gender}</td>
                            <td>{role}</td>
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleModalUpdate(data?.object?.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                              <button className='delete-btn' onClick={() => handleModalDelete(data?.object?.id)}><i className="fa-sharp fa-solid fa-trash"></i></button>
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