import React, { useEffect, useState } from 'react'
import './UpdateProductPage.scss'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchBookById, actUpdateBook } from '../../redux/features/bookSlice/bookSlice'
import { actFetchAllCategory } from '../../redux/features/categorySlice/categorySlide';
import { actFetchAllTopic } from '../../redux/features/topicSlide/topicSlide';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IMG_URL } from '../../constants/config'
import { toast } from 'react-toastify'
const UpdateProductPage = () => {
    const param = useParams()
    const {allCategory} = useSelector((state) => state.category)
    const {allTopic} = useSelector((state) => state.topic)
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const {book} = useSelector((state) => state.book)
    const [formState, setFormState] = useState(book)

    useEffect(() => {
        dispatch(actFetchBookById(Number(param.idBook)))
    },[param])

    const tag = formState?.tags?.map(t => {
        return t?.id
    })

    const image = formState?.images?.map(image => {
        return image
    })

    const [avatar, setAvatar] = useState(image)
    const [tagId, setTagId] = useState(tag)


    useEffect(() => {
        setFormState(book)
    },[book])

    useEffect(() => {
        setAvatar(image)
    },[formState.images])

    useEffect(() => {
        setTagId(tag)
    },[formState?.tags])

    const [description, setDescription] = useState(formState.description)

    useEffect(() => {
        setDescription(formState.description)
    },[formState.description])


    const handleDescriptionChange = (value) => {
        setDescription(value)
    }
      



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

        if(avatar.length > 4) {
            toast.warning("Tối đa 4 hình")
        }else {
            const newAvatars = files.map((file) => {
                file.preview = URL.createObjectURL(file);
                return file;
            });
            setAvatar((prevAvatars) => [...prevAvatars, ...newAvatars]);
        }

        e.target.value = null
    }

    useEffect(() => {
        return () => {
            avatar?.forEach((avatar) => URL.revokeObjectURL(avatar.preview));
    }
    },[avatar])

    
    const handleRemoveImage = (index) => {
        const newAvatar = [...avatar];
        newAvatar.splice(index, 1);
        setAvatar(newAvatar);
    }

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setTagId([...tagId, Number(value)]);
        } else {
          setTagId(tagId.filter((item) => item != value));
        }
    };  

      
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: formState.name,
            author: formState.author,
            categoryId: formState.categoryId,
            publishing: formState.publishing,
            publishingYear: Number(formState.publishingYear),
            storeId: user.storeId,
            quantitySold: Number(formState.quantitySold),
            createDate: new Date(),
            pageNumber: Number(formState.pageNumber),
            promotionId: Number(formState.promotionId),
            length: Number(formState.length),
            width: Number(formState.width),
            height: Number(formState.height),
            quantity: Number(formState.quantity),
            price: Number(formState.price),
            description: description,
            tagId: tagId,
        }
        const formData =  new FormData();
        formData.append("object", JSON.stringify(data));
        formData.append("files", avatar[0]);
        formData.append("files", avatar[1]);
        formData.append("files", avatar[2]);
        formData.append("files", avatar[3]);
        dispatch(actUpdateBook(book.id,formData))
    }


  return (
    <div className='update-product'>
        <div className="heading">
            <AdminHeading title={'Cập nhật sản phẩm'}/>
        </div>
        <form>
            <div className='update-container'>
                <div className='title'>
                    <h5>Thông tin cơ bản</h5>
                </div>

                <div className='form-input'>
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Hình ảnh sản phẩm</label>
                    <div className='add-image'>
                        {
                            avatar?.map((url, index) => {
                                return(
                                    <div key={index} className='image'>
                                        <span className='delete-img' onClick={() => handleRemoveImage(index)}><i className="fa-solid fa-circle-xmark"></i></span>
                                        {url instanceof File ?
                                            <img src={URL.createObjectURL(url)} /> :
                                            <img src={`${IMG_URL}${url}`} />
                                        }
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
                    <ReactQuill theme="snow"  className='quill' name='description' value={description} onChange={handleDescriptionChange}/>
                </div>
            </div>

            <div className="update-container">
                <div className='title'>
                    <h5>Thông tin chi tiết</h5>
                </div>
                <div className="form-input">
                    <label htmlFor="" className='label'><span className='tick'>(*)</span>Chủ đề</label>
                    {
                        allTopic.map(topic => {
                            return(
                                <div key={topic.id} style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                    <input type="checkbox" value={Number(topic.id)} name={topic.id} checked={tagId?.includes(topic.id)} onChange={handleCheckboxChange}/> 
                                    <label htmlFor={topic.id}>{topic.name}</label>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
            <div className="update-container">
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
            <div className="update-container">
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
            </div>
            <div className='button-btn'>
                <button onClick={handleSubmit}>Cập nhật sản phẩm</button>
            </div>
        </form>
        
    </div>
  )
}

export default UpdateProductPage