import React, { useEffect } from 'react'
import './DashboardPage.scss'
import Widget from '../../components/Widget/Widget'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllUser } from '../../redux/features/userSlice/userSlice'
import { actFetchAllStore } from '../../redux/features/storeSlice/storeSlice'
const DashboardPage = () => {
  const dispatch = useDispatch()
  const {allUser} = useSelector((state) => state.user)
  const {allStore} = useSelector((state) => state.store)
  useEffect(() => {
    dispatch(actFetchAllUser())
    dispatch(actFetchAllStore())
  },[])

  const storeQuantity = allStore.length

  const userQuantity = allUser.filter(user => user.role === 0).length
  const employeeQuantity = allUser.filter(user => user.role === 1).length

  console.log(userQuantity);
  return (
    <div className='dashboard-container'>
      <div className="wrapper-container">
        <Widget type="user" quantity={userQuantity}/>
        <Widget type="employee" quantity={employeeQuantity}/>
        <Widget type="store" quantity={storeQuantity}/>
        <Widget type="revenue"/>
      </div>
    </div>
  )
}

export default DashboardPage