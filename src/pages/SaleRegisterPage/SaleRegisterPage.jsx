import FormData from 'form-data'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import PopupOtpStore from '../../components/PopupOtpStore/PopupOtpStore'
import { actCreateStore, actFetchCheckEmailStore, actFetchOtp } from '../../redux/features/storeSlice/storeSlice'
import './SaleRegisterPage.scss'


const SaleRegisterPage = () => {

  const {isOtp} = useSelector((state) => state.store)
  const {otp} = useSelector((state) => state.store)
  const [checkOtp, setCheckOtp] = useState(isOtp)
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    setCheckOtp(isOtp)
  },[isOtp])

  const [formState, setFormState] = useState({
    userId: user?.id,
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  // useEffect(() => {
  //   setFormState({
  //     ...formState,
  //   })
  // },[user])

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(actFetchCheckEmailStore(formState))
    if(isOtp) {
      dispatch(actFetchOtp(formState?.email))
    }else {
      toast.warning('Tài khoản email này đã tồn tại !!!')
    }
  }
  return (
    <div className='sale-register-page'>
      {
        checkOtp ? <PopupOtpStore formState={formState} otp={otp} setCheckOtp={setCheckOtp}/> : ""
      }
        <div className="top">
            <div className="left">
                <div className="heading">
                  <h2>Đăng ký bán hàng cùng</h2>
                  <img src="https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/logo-1.svg" alt="" />
                </div>
                <p className='content'>Tiếp cận hơn <span>8 tỷ lượt truy cập</span> mỗi tháng!</p>

                <img className='banner' src="https://salt.tikicdn.com/cache/w680/ts/user/dc/e6/b4/fa5101071b365ee2f385fd7d208b309f.jpg" alt="" />
            </div>
            <div className="right">
                <span className="title">Đăng ký ngay</span>
                <form action="" onSubmit={handleSubmit}>
                  <div className="form-input">
                    <label htmlFor="">Địa chỉ email</label>
                    <input type="email" name='email' placeholder='Nhập địa chỉ email' value={formState.email} onChange={handleOnChange}/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Tên cửa hàng</label>
                    <input type="text" name='name' placeholder='Nhập họ và tên' value={formState.name} onChange={handleOnChange}/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" name='phone' placeholder='Nhập số điện thoại' value={formState.phone} onChange={handleOnChange}/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Địa chỉ cửa hàng</label>
                    <input type="text" name='address' placeholder='Nhập địa chỉ cửa hàng' value={formState.address} onChange={handleOnChange}/>
                  </div>
                  <button type='submit'>Đăng ký ngay</button>
                </form>
            </div>
        </div>
        <div className="bot">
            <div className='item'>
              <img src="https://salt.tikicdn.com/ts/user/fa/31/98/4274d22438e2359f0ff7de1afe2fcf5a.png" alt="" />
              <span className='title'>Sàn thương mại điện tử được tin tưởng nhất Việt Nam</span>
              <p className='content'>Bookory luôn hoàn thiện mình để mang đến những trải nghiệm tốt nhất cho cả Khách Hàng và Nhà Bán. Với 100% hàng chính hãng và hơn 95% Khách Hàng hài lòng, Bookory xứng đáng là sàn TMĐT được tin tưởng nhất Việt Nam.</p>
            </div>
            <div className='item'>
              <img src="https://salt.tikicdn.com/ts/user/77/10/04/4c528effdbb6f98b15a1536f43a3cf27.png" alt="" />
              <span className='title'>Chi phí bán hàng cạnh tranh</span>
              <p className='content'>Bookory mang đến cơ hội kinh doanh online cho Nhà Bán với mức phí chiết khấu và phí thanh toán rẻ nhất thị trường. Đồng thời, phí vận chuyện cực kỳ cạnh tranh sẽ hỗ trợ tỷ lệ chuyển đổi đơn hàng hiệu quả hơn bao giờ hết.</p>
            </div>
            <div className='item'>
              <img src="https://salt.tikicdn.com/ts/user/b1/06/31/058c5bd5233f3c5558424ba3e371f558.png" alt="" />
              <span className='title'>Dịch vụ BookoryNOW 2h</span>
              <p className='content'>Duy nhất trên thị trường TMĐT, dịch vụ BookoryNOW 2h giúp Nhà Bán trong nước giao hàng trăm ngàn sản phẩm cho Khách Hàng chỉ trong 2 giờ.</p>
            </div>
        </div>
    </div>
  )
}

export default SaleRegisterPage