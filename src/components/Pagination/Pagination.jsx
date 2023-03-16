import React from 'react'
import './Pagination.scss'

const Pagination = ({totalPage, limit, setCurrentPage, currentPage, background}) => {
    let pages = [];
    for(let i = 1; i <= Math.ceil(totalPage/limit); i++){
      pages.push(i)
    }
  return (
    <div className='pagination'>
        {
        pages.map((page, index) => {
            return(
            <button key={index} style={{backgroundColor: `${background}`}} className={page === currentPage ? "active" : ""} onClick={() => setCurrentPage(page)}>{page}</button>
            )
        })
        }
    </div>
  )
}

export default Pagination