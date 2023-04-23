import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { actFetchDetailPromotion, actFetchPromotionByIdPromotion, actUpdatePromotion } from '../../redux/features/bookSlice/bookSlice'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import { toast } from 'react-toastify'

const UpdatePromotionPage = () => {
    const dispatch = useDispatch()
    const param = useParams()
    const {user} = useSelector((state) => state.user)
    const idStore = user.storeId
    const {promotion} = useSelector((state) => state.book )
    const {promotionByPromotion} = useSelector((state) => state.book )
    const [productChecked, setProductChecked] = useState([])
    const idPromotion = Number(param.idPromotion)
    const [formState, setFormState] = useState(promotionByPromotion)

    useEffect(() => {
        setFormState(promotionByPromotion)
    },[promotion])

    useEffect(() => {
        dispatch(actFetchDetailPromotion({idStore, idPromotion}))
    },[param])

    useEffect(() => {
        dispatch(actFetchPromotionByIdPromotion(idPromotion))
    },[idPromotion])

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setProductChecked([...productChecked, Number(value)]);
        } else {
          setProductChecked(productChecked.filter((item) => item != value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            storeId: idStore,
            name: formState.name,
            discount: formState.discount,
            startDate: formState.startDate,
            endDate: formState.endDate,
            bookIds: productChecked,
            createDate: new Date()
        }

        if(!formState.name || !formState.discount || !formState.endDate || productChecked.length < 1) {
            toast.warning("Vui lòng nhập đủ thông tin !!")
        }else {
            dispatch(actUpdatePromotion(idPromotion, data))
        }
    }
    
  return (
    <div className='add-new-promotion'>
        <div className="heading">
            <AdminHeading title={'Cập nhật khuyến mãi'}/>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='left'>
                <div className="form-input">
                    <label htmlFor="">Tên Khuyến mãi</label>
                    <input type="text" name='name' value={formState.name} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Tỷ lệ KM</label>
                    <input type="number" min={0} max={100} name='discount' value={formState.discount} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Ngày bắt đầu</label>
                    {/* <DatePicker
                        selected={startDate}
                        minDate={new Date()}
                        onChange={handleStartDate}
                        disabled={true}
                    /> */}
                    <input type="date" disabled={true} name='startDate' value={formState.startDate} onChange={handleOnChange}/>
                </div>
                <div className="form-input">
                    <label htmlFor="">Ngày kết thúc</label>
                    {/* <DatePicker
                        selected={endDate}
                        minDate={new Date()}
                        onChange={(date) => handleEndDate(date)}
                    /> */}
                    <input type="date" name='endDate' value={formState.endDate} onChange={handleOnChange}/>
                </div>
                <div className="button-btn">
                    <button type='submit'>Cập nhật</button>
                </div>
            </div>
            <div className="right">
                <div className='title'>
                    <h5>Danh sách sản phẩm</h5>
                </div>
                <div className='product-list'>
                    {
                        promotion.map(book => {
                            return(
                                <div className="product" key={book?.id}>
                                    <input type="checkbox" value={Number(book.id)} name={book.id} checked={productChecked.includes(book.id)} onChange={handleCheckboxChange}/>
                                    <label htmlFor="">{book?.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </form>
    </div>
  )
}

export default UpdatePromotionPage