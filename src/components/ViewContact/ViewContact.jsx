import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actReplyContact } from '../../redux/features/contactSlice/contactSlice'
import './ViewContact.scss'
const ViewContact = ({setIsWatchContact, contactData}) => {
    const initialContact = {
        name: contactData?.name,
        gmail: contactData?.gmail,
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
            <h3>{reply ? "Phản hồi" : "Chi tiết liên hệ"}</h3>
        </div>
        {
            reply
            ?
            <form onSubmit={handleSubmit}>
                <div className='input-form'>
                    <input required type="text" placeholder='Full Name' name='name' value={formContact?.name} onChange={handleOnChange} disabled={true}/>
                    <input   type="email" placeholder='Your Email' name='gmail' value={formContact?.gmail} />
                </div>
                <input required type="text" placeholder='Subject' name='subject' value={formContact?.subject} onChange={handleOnChange}/>
                <textarea required name="content" id="" cols="30" rows="10" placeholder='Your Massage' value={formContact?.content} onChange={handleOnChange}></textarea>
                <button type='submit'>Phản hồi</button>
            </form>
            :
            <form>
                <div className='input-form'>
                    <input required type="text" placeholder='Full Name' name='name' value={contactData?.name} disabled={true} />
                    <input   type="email" placeholder='Your Email' name='gmail' value={contactData?.name} disabled={true}/>
                </div>
                <input required type="text" placeholder='Subject' name='subject' value={contactData?.subject}  disabled={true}/>
                <textarea required name="content" id="" cols="30" rows="10"  value={contactData?.content} disabled={true} ></textarea>
                <button onClick={() => setReply(true)}>Trả lời</button>
            </form>
        }

    </div>
  )
}

export default ViewContact