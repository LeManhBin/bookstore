import React, { useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Pagination from '../../components/Pagination/Pagination'
import Table from 'react-bootstrap/Table';
import './ServiceManagerPage.scss'
import { useNavigate } from 'react-router-dom';
import ModalAcces from '../../components/ModalAcces/ModalAcces';
const ServiceManagerPage = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [idTemp, setIdtemp] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  //phân trang
  // const [currentPage, setCurrentPage] = useState(1);
  // const [limit, setLimit] = useState(3)
  // const lastPageIndex = currentPage * limit;
  // const firstPageIndex = lastPageIndex - limit;
  // const currentItems = allUser.slice(firstPageIndex, lastPageIndex);

  // const totalPage = allUser.length


  const handleAddNewPage = () => {
    navigate('/admin/add-new-service')
  }

  const handleModalDelete = (id) => {
    setIsDelete(true)
    setIdtemp(id)
  }

  const handleDelete = (id) => {

  }
  return (
    <div className='manager'>
        <div className='heading'>
            <AdminHeading title={'Quản lý dịch vụ'}/>
        </div>
        <div className='search'>
            <div className='search-input'>
                <input type="text" placeholder='Nhập Tên gói...' />
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
                      <th>Tên gói</th>
                      <th>Cước Phí</th>
                      <th>Số sản phẩm</th>
                      <th>Thời hạn</th>
                      <th>Trạng thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>1</td>
                      <td>Gói 100</td>
                      <td>100000</td>
                      <td>99</td>
                      <td>----</td>
                      <td>----</td>
                      <td className='button'>
                        <button className='edit-btn' ><i className="fa-regular fa-pen-to-square"></i></button>
                        <button className='delete-btn' onClick={() => handleModalDelete(1)} ><i className="fa-sharp fa-solid fa-trash"></i></button>
                      </td>
                  </tr>
                  </tbody>
                </Table>
                <div className='pagination'>
                    {/* <Pagination
                    currentPage={currentPage}
                    limit={limit}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    background={'#AEE2FF'}
                /> */}
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

export default ServiceManagerPage