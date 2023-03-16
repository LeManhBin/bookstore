import React, { useEffect, useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Table from 'react-bootstrap/Table';
import './CategoryManagerPage.scss'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { addCategorySchema } from '../../constants/addCategorySchema';
import { useDispatch, useSelector } from 'react-redux';
import { actCreateCategory, actFetchAllCategory } from '../../redux/features/categorySlice/categorySlide';

const initialFormValue = {
  name: '',
  icon: '',
}
const CategoryManagerPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const {allCategory} = useSelector((state) => state.category)
  const dispatch = useDispatch()
  console.log(allCategory);


  useEffect(() => {
    dispatch(actFetchAllCategory())
  },[])
  //validate
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(addCategorySchema)
  })

  const {control, handleSubmit, formState: {errors}} = methods

  const onValid = (values) => {
    const payload = {
      name: values.name,
      icon: values.icon,
    }
    console.log(payload);
    dispatch(actCreateCategory(payload))
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
                        allCategory.map((data, index) => {
                          return(
                            <tr key={data.id}>
                              <td>{index + 1}</td>
                              <td>{data.name}</td>
                              <td>{data.thumbnail}</td>
                              <td className='button'>
                                <button className='edit-btn'><i className="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i className="fa-sharp fa-solid fa-trash"></i></button>
                              </td>
                            </tr>
                          )
                        })
                      }
                  </tbody>
                </Table>
              </div>
              <div className='right'>
                  <div className="title">
                      <h3>Thêm mới</h3>
                  </div>
                  <form onSubmit={handleSubmit(onValid)}>
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
                          name='icon'
                          control={control}
                          render={({field: {value, onChange}})  => (
                            <input value={value} onChange={onChange} type="text" placeholder='Nhập Icon'/>
                          )}
                        />
                         {!!errors.icon && <span style={{color: 'red', textAlign:'center', fontSize: '12px'}}>{errors.icon.message}</span>}
                      </div>
                      <button type='submit'>Thêm mới</button>
                  </form>
              </div>
        </div>
    </div>
  )
}

export default CategoryManagerPage