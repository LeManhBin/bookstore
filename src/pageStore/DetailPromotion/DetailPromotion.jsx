import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { actFetchDetailPromotion } from '../../redux/features/bookSlice/bookSlice'
import AdminHeading from '../../components/AdminHeading/AdminHeading'
import { Table } from 'react-bootstrap'
import { IMG_URL } from '../../constants/config'

const DetailPromotion = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user)
    const {promotion} = useSelector((state) => state.book )
    const idStore = user.storeId
    const param = useParams()

    const idPromotion = Number(param.idPromotion)

    useEffect(() => {
        dispatch(actFetchDetailPromotion({idStore, idPromotion}))
    },[param])

  return (
    <div className='all-promotion-page'>
      <div className='heading'>
        <AdminHeading title={'Chi tiết khuyến mãi'}/>
      </div>
      <div className='manager-container'>
      <div className='table'>
                <Table striped bordered hover>
                  <thead style={{backgroundColor: '#F65D4E', color: '#fff'}}>
                    <tr>
                      <th>ID sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Hình ảnh</th>
                      <th>Tỉ lệ khuyến mãi</th>
                      <th>Giá gốc</th>
                      <th>Giá sau khuyễn mãi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      promotion.map((data, index) => {
                        
                        const priceAfterDiscount = data?.price - (data?.price * (data.discount/100)) 
                        const formatPrice = data.price.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                      });

                        const formattedPriceAfterDiscount = priceAfterDiscount.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                      });

                        return(
                          <>
                            <tr key={data?.id}>
                              <td>{data?.id}</td>
                              <td>{data.name}</td>
                              <td >
                                <img src={`${IMG_URL}${data.image}`} alt="" style={{width: '50px', height: '80px', objectFit: 'cover'}}/>
                              </td>
                              <td>{data.discount}%</td>
                              <td>{formatPrice}</td>
                              <td>{formattedPriceAfterDiscount}</td>
                            </tr>
                          </>
                        )
                      })
                    }
        
                    
                  </tbody>
                </Table>
                {/* <div className='pagination'>
                    <Pagination
                    currentPage={currentPage}
                    limit={limit}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    background={'#AEE2FF'}
                />
                </div> */}
              </div>
            {/* <div className='pagination'>
                <Pagination
                currentPage={currentPage}
                limit={limit}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
                background={'#AEE2FF'}
            />
            </div> */}

      </div>
    </div>
  )
}

export default DetailPromotion