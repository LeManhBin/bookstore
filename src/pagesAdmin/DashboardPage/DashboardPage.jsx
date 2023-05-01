import React, { useEffect, useState } from 'react'
import './DashboardPage.scss'
import Widget from '../../components/Widget/Widget'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllUser } from '../../redux/features/userSlice/userSlice'
import { actFetchAllStore } from '../../redux/features/storeSlice/storeSlice'
import { actFetchAdminReport } from '../../redux/features/paymentSlice/paymentSlice'
import { toast } from 'react-toastify'
const DashboardPage = () => {
  const dispatch = useDispatch()
  const {allUser} = useSelector((state) => state.user)
  const {allStore} = useSelector((state) => state.store)
  const {reportAdmin} = useSelector((state) => state.payment)
  const [dateState, setDateState] = useState({
    startDate: "",
    endDate: ""
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setDateState({
      ...dateState,
      [name]: value
    })
  }
  useEffect(() => {
    dispatch(actFetchAllUser())
    dispatch(actFetchAllStore())
  },[])

  const storeQuantity = allStore.length

  const userQuantity = allUser.filter(user => user.role === 0).length
  const employeeQuantity = allUser.filter(user => user.role === 1).length

  console.log(reportAdmin);
  const formatRevenue = reportAdmin?.sumRevunue?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
  const handleSubmit = (e) => {
    e.preventDefault()
    const startDateObj = new Date(dateState.startDate);
    const endDateObj = new Date(dateState.endDate);
    if(endDateObj < startDateObj) {
      toast.warning("Lỗi chọn ngày!")
    }else {
      dispatch(actFetchAdminReport(dateState))
    }
  }

  return (
    <div className='dashboard-container'>
      <div className="wrapper-container">
        <Widget type="user" quantity={userQuantity}/>
        <Widget type="employee" quantity={employeeQuantity}/>
        <Widget type="store" quantity={storeQuantity}/>
      </div>
      <div className='select-date'>
          <div className='input-date'>
              <label htmlFor="">Từ ngày</label>
              <input type="date" name='startDate' value={dateState?.startDate} onChange={handleOnChange}/>
          </div>
          <div className='input-date'>
              <label htmlFor="">Đến ngày</label>
              <input type="date" name='endDate' value={dateState?.endDate} onChange={handleOnChange}/>
          </div>
          <button onClick={handleSubmit}>Lọc</button>
      </div>
      <div className='wrapper-container'>

        <Widget type="user" quantity={userQuantity}/>
        <Widget type="employee" quantity={employeeQuantity}/>
        <Widget type="store" quantity={storeQuantity}/>
        <Widget type="revenue" quantity={formatRevenue}/>
      </div>
    </div>
  )
}

export default DashboardPage