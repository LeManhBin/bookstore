import React, { useEffect, useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Table from 'react-bootstrap/Table';
import { NavLink, useNavigate } from 'react-router-dom';
import './ContactManagerPage.scss'
import ViewContact from '../../components/ViewContact/ViewContact';
import { useDispatch, useSelector } from 'react-redux';
import { actDeleteContact, actFetchAllContact, actFetchContactById, actUpdateContact } from '../../redux/features/contactSlice/contactSlice';
import Pagination from '../../components/Pagination/Pagination';
import ModalAcces from '../../components/ModalAcces/ModalAcces';


const ContactManagerPage = () => {
    const [isWatchContact, setIsWatchContact] = useState(false)
    const dispatch = useDispatch()
    const {allContact} = useSelector((state) => state.contact)
    const {contact} = useSelector((state) => state.contact)
    const [idTemp, setIdtemp] = useState("")
    const [contactData, setContactData] = useState(contact)
    const [isDelete, setIsDelete] = useState(false)
    useEffect(() => {
      dispatch(actFetchAllContact())
    },[])

    useEffect(() => {
      dispatch(actFetchContactById(idTemp))
    },[idTemp])

    useEffect(() => {
      setContactData(contact)
    },[contact])

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8)
    const lastPageIndex = currentPage * limit;
    const firstPageIndex = lastPageIndex - limit;
    const currentItems = allContact.slice(firstPageIndex, lastPageIndex);

    const totalPage = allContact.length
    
    const styleActive = ({isActive}) => {
        return {
            backgroundColor: isActive ? '#F65D4E' : '#5a5a5a'
        }
    }

    const fetchUpdateContactStatus =  (id) => {
      dispatch(actFetchContactById(id))
    }
    const handleViewContact = (id) => {
        fetchUpdateContactStatus(id)
        setIsWatchContact(true)
        setIdtemp(id)
        const newContact = {
          ...contact,
          status: 1,
        }
        dispatch(actUpdateContact(contact?.id, newContact))
        
    }

    const handleModalDelete = (id) => {
      setIsDelete(true)
      setIdtemp(id)
    }
  
    const handleDelete = (id) => {
      dispatch(actDeleteContact(id))
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
                    {
                      currentItems.map((data, index) => {
                        let status;
                        if(data?.status === 0) {
                          status = "Chưa xem"
                        }else{
                          status = "Đã xem"
                        }
                        const timestamp = data?.createDate;
                        const date = new Date(timestamp);

                        const day = date.getDate().toString().padStart(2, "0");
                        const month = (date.getMonth() + 1).toString().padStart(2, "0");
                        const year = date.getFullYear();

                        const formattedDate = `${day}-${month}-${year}`;
                        return(
                          <tr key={data?.id}>
                            <td>{index + 1}</td>
                            <td>{data?.name}</td>
                            <td>{data?.gmail}</td>
                            <td>{data?.subject}</td>
                            <td>{formattedDate}</td>
                            <td>{status}</td>
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleViewContact(data?.id)}>Xem</button>
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
            isWatchContact && <ViewContact contactData={contactData} setIsWatchContact={setIsWatchContact}/>
        }
          {
            isDelete && <ModalAcces
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

export default ContactManagerPage