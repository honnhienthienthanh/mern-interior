import React, { useState } from 'react'
import '../Assets/Css/contact.css'
import iconPhone from '../Assets/Icons/icon-phone.png'
import iconEmail from '../Assets/Icons/icon-email.png'
import iconLocation from '../Assets/Icons/icon-location.png'
import { Link } from 'react-router-dom'
import SothicAPI from '../common/SothicApi'
import { notification } from '../store/NotificationContext'

const Contact = () => {
    const [contactData, setContactData] = useState({
        contactfullName: '',
        contactEmail: '',
        contactPhone: '',
        // contactIssue: '',
        contactMessage: ''
    })

    function inputData(e) {
        const {name, value} = e.target

        setContactData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function handleContactSubmit(e) {
        e.preventDefault()

        const submit = await fetch(SothicAPI.contact_add.url, {
            method: SothicAPI.contact_add.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        }).then(res => res.json())

        if(submit.success) {
            notification.success(submit.message)
        }

        if(submit.error) {
            notification.error(submit.message)
        }
    }

    console.log(contactData)
    return (
        <div className='sothic__contact flex flex-col items-center justify-center'>
            <div className='sothic__contact-title'>
                <h2 className='text-center'>
                    Liên hệ với Sothic Studio
                </h2>
                <p className='text-center'>
                    Bất kì câu hỏi hay thắc mắc nào! Hãy liên hệ với chúng tôi để được giải đáp.
                </p>
            </div>
            <div className='sothic__contact-container flex items-start'>
                <div className='sothic__contact-info flex flex-col justify-between'>
                    <div className='sothic__contact-sub-title'>
                        <h3>
                            Thông tin liên hệ
                        </h3>
                        <p>
                            Ngoài gửi tin nhắn, bạn có thể liên hệ với chúng tôi theo các phương thức và thông tin dưới đây!
                        </p>
                    </div>
                    <ul className='flex flex-col'>
                        <li className='flex items-center'>
                            <img
                                src={iconPhone}
                                width={24}
                                height={24}
                                alt='Sothic Studio Phone Icon'
                            />
                            <span>
                                082 624 2299
                            </span>
                        </li>
                        <li className='flex items-center'>
                            <img
                                src={iconEmail}
                                width={24}
                                height={24}
                                alt='Sothic Studio Email Icon'
                            />
                            <span>
                                sothicjsc.vn@gmail.com
                            </span>
                        </li>
                        <li className='flex items-start'>
                            <img
                                src={iconLocation}
                                width={24}
                                height={24}
                                alt='Sothic Studio Location Icon'
                            />
                            <span>
                                The Terra An Hưng, La Khê, Hà Đông, Hanoi, Vietnam
                            </span>
                        </li>
                    </ul>
                    <div className='sothic__contact-social flex'>
                        {/* <Link id='twetter' to={''} title=''>&nbsp;</Link>
                        <Link id='instagram' to={''} title=''>&nbsp;</Link> */}
                        <Link
                            id='facebook'
                            to={'https://www.facebook.com/Sothicstudiojsc'}
                            title='Sothic Studio Facebook'
                        >
                            &nbsp;
                        </Link>
                    </div>
                </div>
                <form className='sothic__contact-form flex' onSubmit={handleContactSubmit}>
                    <div className='sothic__contact-textbox flex flex-col'>
                        <input
                            id='contactfullName'
                            type='text'
                            name='contactfullName'
                            placeholder='Jonh'
                            required
                            value={contactData.contactfullName}
                            onChange={inputData}
                        />
                        <label htmlFor='contactfullName'>
                            Họ tên
                        </label>
                    </div>
                    {/* <div className='sothic__contact-textbox flex flex-col'>
                        <input
                            id='lastName'
                            type='text'
                            name='lastName'
                            placeholder='Doe'
                            required
                        />
                        <label htmlFor='lastName'>
                            Tên
                        </label>
                    </div> */}
                    <div className='sothic__contact-textbox flex flex-col'>
                        <input
                            id='contactEmail'
                            type='contactEmail'
                            name='contactEmail'
                            placeholder='exmaple@example.com'
                            required
                            value={contactData.contactEmail}
                            onChange={inputData}
                        />
                        <label htmlFor='contactEmail'>
                            Email
                        </label>
                    </div>
                    <div className='sothic__contact-textbox flex flex-col'>
                        <input
                            id='contactPhone'
                            type='contactPhone'
                            name='contactPhone'
                            placeholder='+1 012 3456 789'
                            required
                            value={contactData.contactPhone}
                            onChange={inputData}
                        />
                        <label htmlFor='contactPhone'>
                            Số điện thoại
                        </label>
                    </div>
                    {/* <div className='sothic__contact-subject'>
                        <label className='sothic__contact-subject-title'>Vấn đề</label>
                        <div className='sothic__contact-radio-box flex items-center'>
                            <label className='sothic__radio'>
                                General Inquiry
                                <input type='radio' name='contactIssue' />
                                <span className='checkmark'></span>
                            </label>
                            <label className='sothic__radio'>
                                General Inquiry
                                <input type='radio' name='contactIssue' />
                                <span className='checkmark'></span>
                            </label>
                            <label className='sothic__radio'>
                                General Inquiry
                                <input type='radio' name='contactIssue' />
                                <span className='checkmark'></span>
                            </label>
                            <label className='sothic__radio'>
                                General Inquiry
                                <input type='radio' name='contactIssue' />
                                <span className='checkmark'></span>
                            </label>
                        </div>
                    </div> */}
                    <div className='sothic__contact-textbox message flex flex-col'>
                        <input
                            id='contactMessage'
                            type='text'
                            name='contactMessage'
                            placeholder='Vui lòng nhập lời nhắn của bạn..'
                            required
                            value={contactData.contactMessage}
                            onChange={inputData}
                        />
                        <label htmlFor='contactMessage'>
                            Lời nhắn
                        </label>
                    </div>
                    <button className='sothic__contact-submit'>
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Contact