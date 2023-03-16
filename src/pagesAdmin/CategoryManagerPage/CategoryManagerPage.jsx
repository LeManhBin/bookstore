import React, { useEffect, useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Table from 'react-bootstrap/Table';
import './CategoryManagerPage.scss'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { addCategorySchema } from '../../constants/addCategorySchema';
import { useDispatch, useSelector } from 'react-redux';
import { actCreateCategory, actDeleteCategory, actFetchAllCategory, actFetchCategoryById, actUpdateCategory } from '../../redux/features/categorySlice/categorySlide';
import Modal from '../../components/ModalDelete/Modal';
import Pagination from '../../components/Pagination/Pagination';


const initialFormValue = {
  name: '',
  thumbnail: '',
}
const CategoryManagerPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [idTemp, setIdtemp] = useState("")

  const {allCategory} = useSelector((state) => state.category)
  const dispatch = useDispatch()

  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(7)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allCategory.slice(firstPageIndex, lastPageIndex);

  const totalPage = allCategory.length



  useEffect(() => {
    dispatch(actFetchAllCategory())
  },[])

 useEffect(() => {
    dispatch(actFetchCategoryById(idTemp))
 }, [idTemp])

  //validate
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(addCategorySchema)
  })

  const {control, handleSubmit, formState: {errors}, reset} = methods

  const onValid = (values) => {
    const payload = {
      name: values.name,
      thumbnail: values.thumbnail,
    }
    dispatch(actCreateCategory(payload))

    reset();
  }

  const handleModalDelete = (id) => {
    setIsDelete(true)
    setIdtemp(id)
  }

  const handleDelete = (id) => {
    dispatch(actDeleteCategory(id))
  }

  const handleIsEdit = (data) => {
    setIdtemp(data.id)
    setIsEdit(true)
  }

  const onUpdate = (values) => {
    dispatch(actUpdateCategory(idTemp,values))
    setIsEdit(false)
    reset()
  }


  return (
    <div className='manager'>
        <div className='heading'>
            <AdminHeading title={'Quản lý danh mục'}/>
        </div>
        <div className='manager-container'>
              <div className='left'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                      <th>STT</th>
                      <th>Tên Danh Mục</th>
                      <th>Icon</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        currentItems.map((data, index) => {
                          return(
                            <tr key={data.id}>
                              <td>{index + 1}</td>
                              <td>{data.name}</td>
                              <td>{data.thumbnail}</td>
                              <td className='button'>
                                <button className='edit-btn' onClick={() => handleIsEdit(data)}><i className="fa-regular fa-pen-to-square"></i></button>
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
              <div className='right'>
                  <div className="title">
                      <h3>{isEdit ? 'Cập nhật' : 'Thêm mới'}</h3>
                  </div>
                  <form onSubmit={isEdit ? handleSubmit(onUpdate) : handleSubmit(onValid)}>
                      <div className="form-input">
                        <label htmlFor="">Tên danh mục <span className='tick'>*</span></label>
                        <Controller
                          name='name'
                          control={control}
                          render={({field: {value, onChange}})  => (
                            <input value={value} onChange={onChange} type="text" placeholder='Nhập tên danh mục'/>
                          )}
                        />
                        {!!errors.name && <span style={{color: 'red', textAlign:'center', fontSize: '12px'}}>{errors.name.message}</span>}
                      </div>
                      <div className="form-input">
                        <label htmlFor="">Icon <span className='tick'>*</span></label>
                        <Controller
                          name='thumbnail'
                          control={control}
                          render={({field: {value, onChange}})  => (
                            <input value={value} onChange={onChange} type="text" placeholder='Nhập Icon'/>
                          )}
                        />
                         {!!errors.thumbnail && <span style={{color: 'red', textAlign:'center', fontSize: '12px'}}>{errors.thumbnail.message}</span>}
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

export default CategoryManagerPage