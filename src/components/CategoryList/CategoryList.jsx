import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actFetchAllCategory } from '../../redux/features/categorySlice/categorySlide'
import './CategoryList.scss'
const CategoryList = () => {
  const {allCategory} = useSelector((state) => state.category)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(actFetchAllCategory())
  },[])

  const handleFilterBook = (id) => {
    navigate(`/books/${id}`)
  }


  return (
    <div className='category-list'>
        <ul>
            {
              allCategory?.map(data => {
                return(
                  <div key={data.id}>
                    <li onClick={() => handleFilterBook(data.id)}>{data.name}</li>
                  </div>
                )
              })
            }
        </ul>
    </div>
  )
}

export default CategoryList