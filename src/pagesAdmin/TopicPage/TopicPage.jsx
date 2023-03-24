import React, { useEffect, useState } from 'react'
import './TopicPage.scss'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Table from 'react-bootstrap/Table';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { addTopicSchema } from '../../constants/addTopiSchema';
import { useDispatch, useSelector } from 'react-redux';
import { actCreateTopic, actDeleteTopic, actFetchAllTopic, actFetchTopicById, actUpdateTopic } from '../../redux/features/topicSlide/topicSlide';
import Pagination from '../../components/Pagination/Pagination';
import ModalAcces from '../../components/ModalAcces/ModalAcces';


const initialFormValue = {
  name: '',
}
const TopicPage = () => {
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [idTemp, setIdtemp] = useState('')
  const {allTopic} = useSelector((state) => state.topic)
  const {topic} = useSelector((state) => state.topic)
  const [formUpdate, setFormUpdate] = useState(topic)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(actFetchAllTopic())
  },[])

  useEffect(() => {
    dispatch(actFetchTopicById(idTemp))
  },[idTemp])

  useEffect(() => {
    setFormUpdate(topic)
  },[topic])

  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allTopic.slice(firstPageIndex, lastPageIndex);

  const totalPage = allTopic.length

  //validate
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(addTopicSchema)
  })

  const {control, handleSubmit, formState: {errors}} = methods

  const onValid = (values) => {
    const payload = {
      name: values.name,
      icon: values.icon,
    }
    dispatch(actCreateTopic(payload))
  }

  const handleModalDelete = (id) => {
    setIsDelete(true)
    setIdtemp(id)
  }

  const handleDelete = (id) => {
      dispatch(actDeleteTopic(id))
  }

  const handleIsEdit = (id) => {
    setIdtemp(id)
    setIsEdit(true)
  }

  const onUpdate = (e) => {
    e.preventDefault()
    dispatch(actUpdateTopic(idTemp,formUpdate))
    setIsEdit(false)
    setFormUpdate("")
  }
  return (
    <div className='manager'>
      <div className='heading'>
          <AdminHeading title={'Quản lý chủ đề'}/>
      </div>
      <div className='manager-container'>
            <div className='left'>
              <Table striped bordered hover>
                <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                  <tr>
                    <th>STT</th>
                    <th>Tên Chủ Đề</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      currentItems.map((tag, index) => {
                        return(
                          <tr key={tag.id}>
                            <td>{index + 1}</td>
                            <td>{tag.name}</td>
                            <td className='button'>
                              <button className='edit-btn' onClick={() => handleIsEdit(tag.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                              <button className='delete-btn' onClick={() => handleModalDelete(tag.id)}><i className="fa-sharp fa-solid fa-trash"></i></button>
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
            <div className='right'>
                <div className="title">
                    {
                      isEdit ?
                      <h3>Cập nhật</h3>
                      :
                      <h3>Thêm mới</h3>
                    }
                </div>
                <form onSubmit={isEdit ? onUpdate : handleSubmit(onValid)}>
                    <div className="form-input">
                      <label htmlFor="">Tên chủ đề <span className='tick'>*</span></label>
                      {
                        isEdit ?
                        <input type="text" value={formUpdate.name} onChange={(e) => setFormUpdate({...formUpdate, name: e.target.value}) } placeholder='Nhập tên chủ đề mới'/>
                        :
                        <>
                          <Controller
                            name='name'
                            control={control}
                            render={({field: {value, onChange}})  => (
                              <input value={value} onChange={onChange} type="text" placeholder='Nhập tên chủ đề'/>
                            )}
                          />
                          {!!errors.name && <span style={{color: 'red', textAlign:'center', fontSize: '12px'}}>{errors.name.message}</span>}
                        </>
                      }
                    </div>
                    <button type='submit'>{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
                      {
                        isEdit && <button onClick={() => setIsEdit(false)}>Huỷ</button>
                      }
                </form>
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

export default TopicPage