import React from 'react'
import './SaleRegisterPage.scss'
const SaleRegisterPage = () => {
  return (
    <div className='sale-register-page'>
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
                <form action="">
                  <div className="form-input">
                    <label htmlFor="">Địa chỉ email</label>
                    <input type="email" placeholder='Nhập địa chỉ email'/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Họ và tên</label>
                    <input type="text" placeholder='Nhập họ và tên'/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" placeholder='Nhập số điện thoại'/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Địa chỉ cửa hàng</label>
                    <input type="text" placeholder='Nhập địa chỉ cửa hàng'/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Mật khẩu</label>
                    <input type="password" placeholder='Nhập mật khẩu'/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Nhập lại mật khẩu</label>
                    <input type="password" placeholder='Nhập lại mật khẩu'/>
                  </div>

                  <button>Đăng ký ngay</button>
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