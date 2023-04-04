import React, { useEffect, useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './StoreAddProductPage.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchAllCategory } from '../../redux/features/categorySlice/categorySlide';
import { actFetchAllTopic } from '../../redux/features/topicSlide/topicSlide';
import FormData from 'form-data';
import { actCreateBook } from '../../redux/features/bookSlice/bookSlice';

const StoreAddProductPage = () => {
    const [avatar, setAvatar] = useState([])
    const [tag, setTag] = useState([])
    const {allCategory} = useSelector((state) => state.category)
    const {allTopic} = useSelector((state) => state.topic)
    const dispatch = useDispatch()
    const initialState = {
        name: '',
        author: '',
        categoryId: '',
        publishing: '',
        publishingYear: '',
        storeId: 2,
        pageNumber: '',
        length: '',
        width: '',
        height: '',
        quantity: '',
        price: '',
        description: '',
    }
    const [formState, setFormState] = useState(initialState)
    const [description, setDescription] = useState("")
    const handleOnChange = (e) => {
        const {name, value} = e.target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const HandleOnChangeCategory = (e) => {
        const {value} = e.target;
        const categoryId = Number(value)
        setFormState(prevFormState => ({
          ...prevFormState,
          categoryId: categoryId
        }))
    }

    useEffect(() => {
        dispatch(actFetchAllCategory())
        dispatch(actFetchAllTopic())
    },[])

    const handlePreviewAvatar = (e) => {
        const files =  Array.from(e.target.files)

        const newAvatars = files.map((file) => {
            file.preview = URL.createObjectURL(file);
            return file;
        });
        setAvatar((prevAvatars) => [...prevAvatars, ...newAvatars]);

        e.target.value = null
    }

    useEffect(() => {
        return () => {
            avatar.forEach((avatar) => URL.revokeObjectURL(avatar.preview));
    }
    },[avatar])

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setTag([...tag, Number(value)]);
        } else {
          setTag(tag.filter((item) => item != value));
        }
      };
        

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({...formState, description, tag});
        // const formData =  new FormData();
        // formData.append("object", JSON.stringify({...formState, description}));
        // formData.append("files", avatar[0]);
        // formData.append("files", avatar[1]);
        // formData.append("files", avatar[2]);
        // formData.append("files", avatar[3]);
        // dispatch(actCreateBook(formData))
    }

  return (
    <div className='add-new-product'>
        <div className="heading">
            <AdminHeading title={'Thêm mới sản phẩm'}/>
        </div>
        <form>
            <div className='add-new-container'>
                <div className='title'>
                    <h5>Thông tin cơ bản</h5>
                </div>

                <div className='form-input'>
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Hình ảnh sản phẩm</label>
                    <div className='add-image'>
                    
                        {
                            avatar.slice(0,4).map((url, index) => {
                                return(
                                    <div key={index}>
                                        <img src={`${avatar ? url.preview : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}`} />
                                    </div>
                                )
                            } )
                        }
                        <input type="file" id="file-input" name='avatar' onChange={(e) => handlePreviewAvatar(e) }/>
                        <label htmlFor="file-input" id="custom-button"></label>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Tên sản phẩm</label>
                    <input type="text" name='name' value={formState.name} onChange={handleOnChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Tác giả</label>
                    <input type="text" name='author' value={formState.author} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Thể loại</label>
                    <select name='categoryId' onChange={HandleOnChangeCategory}>
                        {
                            allCategory.map(category => {
                                return(
                                        <option value={`${category.id}`} key={category.id}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Nhà xuất bản</label>
                    <input type="text" name='publishing' value={formState.publishing} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Năm xuất bản</label>
                    <input type="number" name='publishingYear' value={formState.publishingYear} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Số trang</label>
                    <input type="number" min={0} name='pageNumber' value={formState.pageNumber} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Mô tả sản phẩm</label>
                    <ReactQuill theme="snow" className='quill' name='description' value={description} onChange={setDescription}/>
                </div>
            </div>

            <div className="add-new-container">
                <div className='title'>
                    <h5>Thông tin chi tiết</h5>
                </div>
                {/* <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Thương hiệu</label>
                    <input type="text" />
                </div> */}
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Chủ đề</label>
                    {
                        allTopic.map(topic => {
                            return(
                                <div key={topic.id} style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                    <input type="checkbox" value={Number(topic.id)} name={topic.id} checked={tag.includes(topic.id)} onChange={handleCheckboxChange}/> 
                                    <label htmlFor={topic.id}>{topic.name}</label>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
            <div className="add-new-container">
                <div className='title'>
                    <h5>Thông tin bán hàng</h5>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Giá</label>
                    <input type="text" name='price'value={formState.price} onChange={handleOnChange} />
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Kho hàng</label>
                    <input type="text" name='quantity' value={formState.quantity} onChange={handleOnChange}/>
                </div>
            </div>
            <div className="add-new-container">
                <div className='title'>
                    <h5>Thông tin vận chuyển</h5>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Chiều dài</label>
                    <input type="text" name='height' value={formState.height} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Chiều rộng</label>
                    <input type="text" name='width' value={formState.width} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Bề dày</label>
                    <input type="text" name='length' value={formState.length} onChange={handleOnChange}/>
                </div>
                {/* <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Trọng lượng</label>
                    <input type="text" />
                </div> */}
            </div>
            <div className='button-btn'>
                <button onClick={handleSubmit}>Thêm sản phẩm</button>
            </div>
        </form>
    </div>
  )
}

export default StoreAddProductPage