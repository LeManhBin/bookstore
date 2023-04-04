import React, { useEffect, useState } from 'react'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import './AddPromotionPage.scss'
import { DatePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchBookByIdStore } from '../../redux/features/bookSlice/bookSlice'
const AddPromotionPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch()
  const {bookByStore} = useSelector((state) => state.book)

  const idStore = 2

  useEffect(() => {
    dispatch(actFetchBookByIdStore(idStore))
  },[idStore])

  const handleStartDate = (date) => {
    setStartDate(date);
    setEndDate(null);
  };


  const handleEndDate = (date) => {
    setEndDate(date);
  };
  return (
    <div className='add-new-promotion'>
    <div className="heading">
        <AdminHeading title={'Thêm mới khuyến mãi'}/>
    </div>
    <form >
        <div className='left'>
            <div className="form-input">
                <label htmlFor="">Nội dung</label>
                <input type="text" />
            </div>
            <div className="form-input">
                <label htmlFor="">Tỷ lệ KM</label>
                <input type="text" />
            </div>
            <div className="form-input">
                <label htmlFor="">Ngày bắt đầu</label>
                <DatePicker
                    selected={startDate}
                    minDate={new Date()}
                    onChange={handleStartDate}
                />
            </div>
            <div className="form-input">
                <label htmlFor="">Ngày kết thúc</label>
                <DatePicker
                    selected={endDate}
                    minDate={startDate}
                    onChange={handleEndDate}
                />
            </div>
            <div className="button-btn">
                <button>Thêm mới</button>
            </div>
        </div>
        <div className="right">
            <div className='title'>
                <h5>Danh sách sản phẩm</h5>
            </div>
            <div className='product-list'>
                {
                    bookByStore.map(book => {
                        return(
                            <div className="product" key={book?.object.id}>
                                <input type="checkbox" />
                                <label htmlFor="">{book?.object.name}</label>
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