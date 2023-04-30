import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actFetchBookByIdStore } from '../../redux/features/bookSlice/bookSlice'
import './CardVendor.scss'
import { IMG_URL } from '../../constants/config'
const CardVendor = ({data}) => {
  const navigate = useNavigate()
  const {bookByStore} = useSelector((state) => state.book)
  const dispatch = useDispatch()
  const [quantityProduct, setQuantityProduct] = useState(0)

  useEffect(() => {
    dispatch(actFetchBookByIdStore(data.id))
  },[data.id])

  // useEffect(() => {
  //   if (bookByStore.length > 0) {
  //     setQuantityProduct(bookByStore.length)
  //   }
  // },[bookByStore])

  console.log(data);

  const handleClickVendorDetail = (id) => {
    navigate(`/vendor/${id}`)
  }

  return (
    <div className='vendor' onClick={() => handleClickVendorDetail(data?.id)}>
        <div className='cover-img'>
          <img src={`${IMG_URL}${data.coverImage}`} alt="store" />
        </div>
        <div className='avatar'>
          <img src={`${IMG_URL}${data.avatar}`} alt="store" />
        </div>
        <div className='content'>
            <div className="name">{data?.name}</div>
            {/* <div className="quantity">{quantityProduct} Product</div> */}
        </div>
    </div>
  )
}

export default CardVendor