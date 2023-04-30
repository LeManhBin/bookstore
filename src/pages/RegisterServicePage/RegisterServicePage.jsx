import React, { useEffect, useState } from 'react'
import './RegisterServicePage.scss'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllService, actFetchRegisterService, actFetchServiceById} from '../../redux/features/serviceSlice/serviceSlide'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../../constants/config'
const RegisterServicePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const { allService, service, payCode } = useSelector((state) => state.service);
    
    const [formState, setFormState] = useState({
        amount: 0,
        bankCode:"",
        note:"Đăng ký gói dịch vụ 0001",
        orderInfor: "",
    });
  
    useEffect(() => {
      dispatch(actFetchAllService());
    }, []);
  
    const handleRegister = (service) => {
        setFormState({
            ...formState,
            amount: service.price,
            orderInfor: service.id
        })
        setIsRegister(!isRegister)
    };

    useEffect(() => {
        if (isRegister) {
            dispatch(actFetchRegisterService(formState))
            setIsRegister(false)
        }
    },[isRegister])

    useEffect(() => {
        if (payCode && Object.keys(payCode).length > 0) {
            window.open(payCode, '_blank');
        }
    },[payCode] )



    return (
        <div className='register-service'>
            <h2>Đăng ký gói dịch vụ</h2>
            <p>Chào mừng bạn.....</p>
            <div className='service-container'>
                {
                    allService.filter(data => data.status === 0).map(service => {
                        const price = service?.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        });
                        return(
                            <div className='service' key={service.id}>
                                <img className='service-img' src={`${IMG_URL}${service.thumbnail}`} alt="" />
                                <div className='service-desc'>
                                    <p className='name'>Tên gói: <span>{service?.name}</span></p>
                                    <p className='price'>Cước phí: <span>{price}</span></p>
                                    {/* <p className='quantity'>Số lượng: <span>{service?.quantityProduct}</span></p> */}
                                </div>
                                <ul className='service-act'>
                                    <li onClick={() => handleRegister(service)}>Đăng ký</li>
                                    <li>Xem chi tiết</li>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RegisterServicePage