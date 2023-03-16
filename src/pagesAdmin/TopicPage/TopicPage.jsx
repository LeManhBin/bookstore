import React from 'react'
import './TopicPage.scss'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Table from 'react-bootstrap/Table';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { addTopicSchema } from '../../constants/addTopiSchema';


const initialFormValue = {
  name: '',
  icon: '',
}
const TopicPage = () => {

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
    console.log(payload);
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
                  <tr>
                    <td>1</td>
                    <td>Kinh dị</td>
                    <td className='button'>
                      <button className='edit-btn'><i className="fa-regular fa-pen-to-square"></i></button>
                      <button className='delete-btn'><i className="fa-sharp fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className='right'>
                <div className="title">
                    <h3>Thêm mới</h3>
                </div>
                <form onSubmit={handleSubmit(onValid)}>
                    <div className="form-input">
                      <label htmlFor="">Tên chủ đề <span className='tick'>*</span></label>
                      <Controller
                        name='name'
                        control={control}
                        render={({field: {value, onChange}})  => (
                          <input value={value} onChange={onChange} type="text" placeholder='Nhập tên chủ đề'/>
                        )}
                      />
                      {!!errors.name && <span style={{color: 'red', textAlign:'center', fontSize: '12px'}}>{errors.name.message}</span>}
                    </div>
                    <button type='submit'>Thêm mới</button>
                </form>
            </div>
      </div>
  </div>
  )
}

export default TopicPage