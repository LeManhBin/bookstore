import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TopProduct.scss'
import { useDispatch, useSelector } from 'react-redux'
import { IMG_URL } from '../../constants/config'
import { actFetchAllBook } from '../../redux/features/bookSlice/bookSlice'
const TopProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {allBook} = useSelector((state) => state.book)

    useEffect(() => {
        dispatch(actFetchAllBook())
    },[])
    
    const handleClickDetail = (id) => {
        navigate(`/product/${id}`)
    }

  return (
    <div className='top__product'>
        <div className='top__product--heading'>
            <h2>Top 10 This Week</h2>
        </div>
        <div className='top__product--container'>
            {
                allBook?.data?.slice(0,6).map((data, index) => {
                    return(
                        <div className='product-box'  key={data.id} onClick={() => handleClickDetail(data.id)}> 
                            <div className='product-img'>
                                <img src={`${IMG_URL}${data.images[0]}`} alt="" />
                                <span className='top'>{index + 1}</span>
                            </div>
                            <div className='product-desc'>
                                <p className='product-name'>{data.name}</p>
                                <span className='product-author'>{data.author}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TopProduct