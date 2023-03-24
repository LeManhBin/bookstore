import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actReplyContact } from '../../redux/features/contactSlice/contactSlice'
import './ViewContact.scss'
const ViewContact = ({setIsWatchContact, contactData}) => {
    const initialContact = {
        name: "",
        gmail: contactData.gmail,
        subject: "",
        content: "",
    }
    const [reply, setReply] = useState(false)
    const dispatch = useDispatch()
    const [formContact, setFormContact] = useState(initialContact)

    useEffect(() => {
        setFormContact(initialContact)
    },[contactData])
    const handleOnChange = (e) => {
        const {name, value} = e.target
        setFormContact({
            ...formContact,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(actReplyContact(formContact))
    }
  return (
    <div className='view-contact'>
        <span className='close-btn' onClick={() => setIsWatchContact(false)}><i className="fa-solid fa-xmark"></i></span>
        <div className="heading">
            <h3>Chi tiết liên hệ</h3>
        </div>
        {
            reply
            ?
            <form onSubmit={handleSubmit}>
                <div className='input-form'>
                    <input required type="text" placeholder='Full Name' name='name' value={formContact.name} onChange={handleOnChange}/>
                    <input   type="email" placeholder='Your Email' name='gmail' value={formContact.gmail} />
                </div>
                <input required type="text" placeholder='Subject' name='subject' value={formContact.subject} onChange={handleOnChange}/>
                <textarea required name="content" id="" cols="30" rows="10" placeholder='Your Massage' value={formContact.content} onChange={handleOnChange}></textarea>
                <button type='submit'>Phản hồi</button>
            </form>
            :
            <div className="contact-container">
            <div className='contact-detail'>
                <div className='contact'>
                    <span className='title'>Tiêu đề: </span>
                    <span className='detail'>{contactData.subject}</span>
                </div>
                <div className='contact'>
                    <span className='title'>Họ Tên: </span>
                    <span className='detail'>{contactData.name}</span>
                </div>
                <div className='contact'>
                    <span className='title'>Email: </span>
                    <span className='detail'>{contactData.gmail}</span>
                </div>
                <div className='content'>
                    <p>{contactData.content}</p>
                </div>
            </div>
            <button onClick={() => setReply(true)}>Trả lời</button>
        </div>
        }

    </div>
  )
}

export default ViewContact