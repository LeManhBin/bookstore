import React, { useEffect, useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Pagination from '../../components/Pagination/Pagination'
import Table from 'react-bootstrap/Table';
import './ServiceManagerPage.scss'
import { useNavigate } from 'react-router-dom';
import ModalAcces from '../../components/ModalAcces/ModalAcces';
import { useDispatch, useSelector } from 'react-redux';
import { all } from 'axios';
import { actDeleteService, actFetchAllService } from '../../redux/features/serviceSlice/serviceSlide';
import { IMG_URL } from '../../constants/config';
const ServiceManagerPage = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [idTemp, setIdtemp] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {allService} = useSelector((state) => state.service)

  useEffect(() => {
    dispatch(actFetchAllService())
  },[])
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allService.slice(firstPageIndex, lastPageIndex);

  const totalPage = allService.length


  const handleAddNewPage = () => {
    navigate('/admin/add-new-service')
  }

  const handleModalDelete = (id) => {
    setIsDelete(true)
    setIdtemp(id)
  }

  const handleDelete = (id) => {
      dispatch(actDeleteService(id))
  }

  const handleUpdatePage = (id) => {
    navigate(`/admin/service/${id}`)
  }

  const handleFilterBlog = () => {
    return allService?.filter((service) => {
      return service?.name.toLowerCase().includes(searchTerm.toLowerCase());
    }).slice(firstPageIndex, lastPageIndex);
  }
  return (
    <div className='manager'>
        <div className='heading'>
            <AdminHeading title={'Quản lý dịch vụ'}/>
        </div>
        <div className='search'>
            <div className='search-input'>
                <input type="text" placeholder='Nhập Tên gói...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
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
                      <th>Hình ảnh</th>
                      <th>Cước Phí</th>
                      {/* <th>Số lượng</th> */}
                      <th>Thời hạn</th>
                      {/* <th>Trạng thái</th> */}
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      handleFilterBlog().filter(data => data.status === 0).map((service, index) => {
                        return(
                          <tr key={service?.id}>
                            <td>{index + 1}</td>
                            <td>{service?.name}</td>
                            <td className='img'>
                                <img src={`${IMG_URL}${service?.thumbnail}`} alt="service" />
                            </td>
                            <td>{service?.price}</td>
                            {/* <td>{service?.quantityProduct}</td> */}
                            <td>{service?.expirationDate}</td>
                            {/* <td>{service?.status}</td> */}
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleUpdatePage(service?.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                              <button className='delete-btn' onClick={() => handleModalDelete(service?.id)} ><i className="fa-sharp fa-solid fa-trash"></i></button>
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

export default ServiceManagerPage