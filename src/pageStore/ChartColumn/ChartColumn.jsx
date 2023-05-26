import React, { useEffect, useMemo, useState } from 'react'
import { Column } from '@ant-design/plots';
import { actFetchOrderByIdStore } from '../../redux/features/orderSlice/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
const ChartColumn = () => {
  const dispatch = useDispatch()
  const {orderByIdStore} = useSelector((state) => state.order)
  const [toTalMoney, setToTalMoney] = useState(0)
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [data, setData] = useState([])
  const {user} = useSelector((state) => state.user)
  const idStore = user.storeId

  useEffect(() => {
    dispatch(actFetchOrderByIdStore(idStore))
  },[])


  const orderCompleted = orderByIdStore?.filter(order => order.status === 3 || order.status === 5)

  
  const computedOrderTypeYear = useMemo(() => {
    return orderCompleted.reduce((prevObj, order)=>{
      const Month = new Date(order.createDate).getMonth()
      const nowYear = new Date().getFullYear()
      const Year = new Date(order.createDate).getFullYear()
      if(Month + 1 === 1 && nowYear == Year) {
        return {
          ...prevObj,
          Thang1: (prevObj?.Thang1 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 2 && nowYear === Year) {
        return {
          ...prevObj,
          Thang2: (prevObj?.Thang2 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 3 && nowYear === Year) {
        return {
          ...prevObj,
          Thang3: (prevObj?.Thang3 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 4 && nowYear === Year) {
        return {
          ...prevObj,
          Thang4: (prevObj?.Thang4 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 5 && nowYear === Year) {
        return {
          ...prevObj,
          Thang5: (prevObj?.Thang5 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 6 && nowYear === Year) {
        return {
          ...prevObj,
          Thang6: (prevObj?.Thang6 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 7 && nowYear === Year) {
        return {
          ...prevObj,
          Thang7: (prevObj?.Thang7 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 8 && nowYear === Year) {
        return {
          ...prevObj,
          Thang8: (prevObj?.Thang8 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 9 && nowYear === Year) {
        return {
          ...prevObj,
          Thang9: (prevObj?.Thang9 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 10 && nowYear === Year) {
        return {
          ...prevObj,
          Thang10: (prevObj?.Thang10 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 11 && nowYear === Year) {
        return {
          ...prevObj,
          Thang11: (prevObj?.Thang11 || 0) + order.totalMoney
        }
      }
      if(Month + 1 === 12 && nowYear === Year) {
        return {
          ...prevObj,
          Thang12: (prevObj?.Thang12 || 0) + order.totalMoney
        }
      }
    }, {})
  }, [orderCompleted]) 

  const computedOrderTypeToDay = useMemo(() => {
    return orderCompleted.reduce((prevObj, order) => {
      const now = new Date().getDate()
      const date = new Date(order.createDate).getDate()
      const nowMonth = new Date().getMonth()
      const nowYear = new Date().getFullYear()
      const year = new Date(order.createDate).getFullYear()
      const month = new Date(order.createDate).getMonth()
      if(date === now && month === nowMonth && year === nowYear) {
        return {
          ...prevObj,
          homNay: (prevObj?.homNay || 0) + order.totalMoney
        }
      }
      return prevObj
    },{})
  }, [orderCompleted])
  
  const computedOrderTypeMonth = useMemo(() => {
    const nowMonth = new Date().getMonth()
    const nowYear = new Date().getFullYear()
    const dailySales = {}
    orderCompleted.forEach(sale => {
      const year = new Date(sale.createDate).getFullYear()
      const month = new Date(sale.createDate).getMonth()
      const date = sale.createDate
      
      if(month === nowMonth && year === nowYear) {
        if (dailySales[date]) {
          dailySales[date] += sale.totalMoney;
        } 
        else {
          dailySales[date] = sale.totalMoney;
        }
      }
    });
    return dailySales
  }, [orderCompleted])

  const filterRevenueByDate = () => {
    const result = {}
    orderCompleted.filter(data => {
      const orderDate = moment(data.createDate);
      return orderDate.isBetween(dateFrom, dateTo, null, []);
    }).forEach(sale => {
      const date = sale.createDate
      if (result[date]) {
        result[date] += sale.totalMoney;
      }
      else {
        result[date] = sale.totalMoney;
      }
    })
    const _data = []
    for(let key in result) {
      _data.push({type: key, sales: result[key]})
    }   
   setData(_data)
  }

  useEffect(() => {
    filterRevenueByDate()
   },[dateTo])

   const handleFilterByDate = (filter) =>{
    let result = []
    switch (filter) {
      case 'homnay':
        result = [{
          type: 'hÔM nAY',
          sales: computedOrderTypeToDay?.homNay
        }]
        
        break;
      case 'thangnay':
        for(let key in computedOrderTypeMonth) {
          result.push({type: key, sales: computedOrderTypeMonth[key]})
        }   
        break;
      case 'namnay':
        result = [
          {
            type: 'January',
            sales: computedOrderTypeYear?.Thang1,
          },
          {
            type: 'February',
            sales: computedOrderTypeYear?.Thang2,
          },
          {
            type: 'March',
            sales: computedOrderTypeYear?.Thang3,
          },
          {
            type: 'April',
            sales: computedOrderTypeYear?.Thang4,
          },
          {
            type: 'May',
            sales: computedOrderTypeYear?.Thang5,
          },
          {
            type: 'June',
            sales: computedOrderTypeYear?.Thang6,
          },
          {
            type: 'July',
            sales: computedOrderTypeYear?.Thang7,
          },
          {
            type: 'August',
            sales: computedOrderTypeYear?.Thang8,
          },
          {
            type: 'September',
            sales: computedOrderTypeYear?.Thang9,
          },
          {
            type: 'October',
            sales: computedOrderTypeYear?.Thang10,
          },
          {
            type: 'November',
            sales: computedOrderTypeYear?.Thang11,
          },
          {
            type: 'December',
            sales: computedOrderTypeYear?.Thang12,
          },
        ];
        break;
      default:
        break;
    }
    setData(result)
  }


    const config = {
    data,
    xField: 'type',
    yField: 'sales',
    xAxis: {
        label: {
        autoHide: true,
        autoRotate: false,
        },
    },
    meta: {
        type: {
        alias: 'Phân loại',
        },
        sales: {
        alias: 'Giá trị',
        },
    },
    minColumnWidth: 20,
    maxColumnWidth: 20,
    };
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div className='filter-statistical' style={{display: 'flex', alignItems: 'flex-end', gap: '20px'}}>
            <form style={{display: 'flex', alignItems: 'flex-end', gap: '10px'}}>
              <div className='input-form' style={{display:'flex', flexDirection: 'column'}}>
                <label htmlFor="" style={{fontSize: '12px'}}>From</label>
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={{outline: 'none', padding: '5px 10px', border: 'none', borderRadius: '5px'}}/>
              </div>
              <div className='input-form' style={{display:'flex', flexDirection: 'column'}}>
              <label htmlFor="" style={{fontSize: '12px'}}>To</label>
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}  style={{outline: 'none', padding: '5px 10px', border: 'none', borderRadius: '5px'}}/>
              </div>
              {/* <button  style={{border: 'none', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#fff', borderRadius: '5px'}}>Filter</button> */}
            </form>
            <select name="" id="" onChange={(e) => handleFilterByDate(e.target.value)} style={{outline: 'none', padding: '5px 10px', border: '1px solid #eee', borderRadius: '5px'}}>
              <option value="homnay">Hôm Nay</option>
              <option value="thangnay">Tháng Này</option>
              <option value="namnay">Năm Nay</option>
            </select>
        </div>

        <Column {...config} />
      </div>
    );

}

export default ChartColumn