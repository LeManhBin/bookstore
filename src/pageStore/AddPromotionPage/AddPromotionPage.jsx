import React, { useEffect, useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './AddPromotionPage.scss'
import { DatePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actCreatePromotion, actFetchBookByIdStore,actFetchBookPromotionsByTime } from '../../redux/features/bookSlice/bookSlice'
const AddPromotionPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const dispatch = useDispatch()
    const {bookByStore} = useSelector((state) => state.book)
    const [isChangeDate, setIsChangeDate] = useState(false)
    const {user} = useSelector((state) => state.user)
    const idStore = user.storeId
    const {bookPromotionByTime} = useSelector((state) => state.book)
    const [productChecked, setProductChecked] = useState([])
    //---------- format date -> yyyy - mm - dd
    const date = new Date(startDate); 
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0"); 
    const formattedDate = `${year}-${month}-${day}`;
    //---------

    const initialForm = {
        storeId: idStore,
        name: "",
        discount: 0,
        startDate: formattedDate,
        endDate: "",
        bookIds: [],
    }

    const [formState, setFormState] = useState(initialForm);

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

    useEffect(() => {
        dispatch(actFetchBookByIdStore(idStore))
    },[idStore])

    const handleStartDate = ({date}) => {
        setStartDate(date);
    };


    const handleEndDate = (e) => {
        setEndDate(e.target.value);
        setIsChangeDate(!isChangeDate)
        setFormState({
            ...formState,
            endDate: e.target.value,
        })
    };

    useEffect(() => {
        dispatch(actFetchBookPromotionsByTime({idStore: idStore, start: formattedDate, end: endDate}))
    },[isChangeDate])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(actCreatePromotion({...formState, bookIds: productChecked}))
    }
  return (
    <div className='add-new-promotion'>
    <div className="heading">
        <AdminHeading title={'Thêm mới khuyến mãi'}/>
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
                <input type="date" value={startDate} disabled={true}/>
            </div>
            <div className="form-input">
                <label htmlFor="">Ngày kết thúc</label>
                {/* <DatePicker
                    selected={endDate}
                    minDate={new Date()}
                    onChange={(date) => handleEndDate(date)}
                /> */}
                <input type="date" name='endDate' value={endDate} onChange={handleEndDate}/>
            </div>
            <div className="button-btn">
                <button type='submit'>Thêm mới</button>
            </div>
        </div>
        <div className="right">
            <div className='title'>
                <h5>Danh sách sản phẩm</h5>
            </div>
            <div className='product-list'>
                {
                    bookPromotionByTime.map(book => {
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

export default AddPromotionPage