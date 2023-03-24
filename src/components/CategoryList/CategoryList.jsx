import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllCategory } from '../../redux/features/categorySlice/categorySlide'
import './CategoryList.scss'
const CategoryList = () => {
  const {allCategory} = useSelector((state) => state.category)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actFetchAllCategory())
  },[])
  return (
    <div className='category-list'>
        <ul>
            {
              allCategory.map(data => {
                return(
                  <div key={data.id}>
                    <li>{data.name}</li>
                  </div>
                )
              })
            }
        </ul>
    </div>
  )
}

export default CategoryList