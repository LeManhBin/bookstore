import React, { useEffect, useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import Table from 'react-bootstrap/Table';
import './CategoryManagerPage.scss'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { addCategorySchema } from '../../constants/addCategorySchema';
import { useDispatch, useSelector } from 'react-redux';
import { actCreateCategory, actDeleteCategory, actFetchAllCategory, actFetchCategoryById, actUpdateCategory } from '../../redux/features/categorySlice/categorySlide';
import Pagination from '../../components/Pagination/Pagination';
import ModalDelete from '../../components/Modal/ModalDelete';
import ModalAcces from '../../components/ModalAcces/ModalAcces';
import Loading from '../../components/Loading/Loading';
import { IMG_URL } from '../../constants/config';
import FormData from 'form-data';
import { toast } from 'react-toastify';



const initialFormValue = {
  name: '',
}
const CategoryManagerPage = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [idTemp, setIdtemp] = useState("")
  const {isLoading} = useSelector((state) => state.category)
  const {allCategory} = useSelector((state) => state.category)
  const {category} = useSelector((state) => state.category)
  const [thumbnail, setThumbnail] = useState(null)
  const [formUpdate, setFormUpdate] = useState(category)

  const dispatch = useDispatch()

  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(7)
  const lastPageIndex = currentPage * limit;
  const firstPageIndex = lastPageIndex - limit;
  const currentItems = allCategory.slice(firstPageIndex, lastPageIndex);

  const totalPage = allCategory.length

  const handlePreviewThumbnail = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setThumbnail(file)
    e.target.value = null
  }

  useEffect(() => {
      return () => {
        thumbnail && URL.revokeObjectURL(thumbnail.preview)
      }

  },[thumbnail])


  useEffect(() => {
    dispatch(actFetchAllCategory())
  },[])

  useEffect(() => {
    setFormUpdate(category)
  }, [category])

  //validate
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(addCategorySchema)
  })

  const {control, handleSubmit, formState: {errors}, reset} = methods

  const onValid = (values) => {

    const formData =  new FormData();
    formData.append("object", JSON.stringify(values));
    formData.append("file", thumbnail);

    if(!thumbnail) {
      toast.warning("Vui lòng chọn hình ảnh")
    }else {
      dispatch(actCreateCategory(formData))
      setThumbnail(null)
      reset();
    }
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
    dispatch(actFetchCategoryById(data.id))
  }

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setFormUpdate({
      ...formUpdate,
      [name]: value
    })
  }


  const onUpdate = (e) => {
    e.preventDefault()
    const data = {
      name: formUpdate.name,
      thumbnail: formUpdate.thumbnail,
      status: formUpdate.status,
    }


    const formData =  new FormData();
    formData.append("object", JSON.stringify(data));
    formData.append("file", thumbnail);
    dispatch(actUpdateCategory(idTemp,formData))
    setFormUpdate("")
    setIsEdit(false)
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
                      <th>Thumbnail</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        currentItems.map((data, index) => {
                          return(
                            <tr key={data.id}>
                              <td>{index + 1}</td>
                              <td>{data?.name}</td>
                              <td className='image'>
                                <img src={`${IMG_URL}${data?.thumbnail}`} alt=""  />
                              </td>
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
                  <form onSubmit={isEdit ? onUpdate : handleSubmit(onValid)}>
                      <div className="form-input">
                        <label htmlFor="">Tên danh mục <span className='tick'>*</span></label>
                        {
                          isEdit ?
                          <input name='name' value={formUpdate?.name} onChange={handleOnChange} type="text" placeholder='Nhập tên danh mục'/>
                          :
                          <>
                            <Controller
                            name='name'
                            control={control}
                            render={({field: {value, onChange}})  => (
                            <input name='name' value={isEdit ? formUpdate.name : value} onChange={isEdit ? handleOnChange : onChange} type="text" placeholder='Nhập tên danh mục'/>
                            )}
                            />
                            {!!errors.name && <span style={{color: 'red', textAlign:'center', fontSize: '12px'}}>{errors.name.message}</span>}
                          </>
                          
                        }
                      </div>
                      <div className="form-input">
                        <label htmlFor="">Hình ảnh <span className='tick'>*</span></label>
                         {
                          isEdit ?
                          <div className='image-input'>
                              <img src={`${thumbnail ?  thumbnail.preview : `${IMG_URL}${formUpdate?.thumbnail}`}  `} />
                              <input type="file" id="file-input" name='thumbnail' onChange={(e) => handlePreviewThumbnail(e) }/>
                              <label htmlFor="file-input" id="custom-button">Chọn ảnh</label>
                          </div>
                          :
                          <>
                            <div className='image-input'>
                                <img src={`${thumbnail ?  thumbnail.preview : 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png'}`} />
                                <input type="file" id="file-input" name='thumbnail' onChange={(e) => handlePreviewThumbnail(e) }/>
                                <label htmlFor="file-input" id="custom-button">Chọn ảnh</label>
                            </div>
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

export default CategoryManagerPage