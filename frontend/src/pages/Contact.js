import React from 'react'
import '../Assets/Css/contact.css'
import iconPhone from '../Assets/Icons/icon-phone.png'
import iconEmail from '../Assets/Icons/icon-email.png'
import iconLocation from '../Assets/Icons/icon-location.png'
import { Link } from 'react-router-dom'

const Contact = () => {
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
                                +1012 3456 789
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
                                demo@gmail.com
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
                                132 Dartmouth Street Boston, Massachusetts 02156 United States
                            </span>
                        </li>
                    </ul>
                    <div className='sothic__contact-social flex'>
                        <Link id='twetter' to={''} title=''>&nbsp;</Link>
                        <Link id='instagram' to={''} title=''>&nbsp;</Link>
                    </div>
                </div>
                <form className='sothic__contact-form flex'>
                    <div className='sothic__contact-textbox flex flex-col'>
                        <input
                            id='firstName'
                            type='text'
                            name='firstName'
                            placeholder='Jonh'
                            required
                        />
                        <label htmlFor='firstName'>
                            Họ và đệm
                        </label>
                    </div>
                    <div className='sothic__contact-textbox flex flex-col'>
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
                    </div>
                    <div className='sothic__contact-textbox flex flex-col'>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='exmaple@example.com'
                            required
                        />
                        <label htmlFor='email'>
                            Email
                        </label>
                    </div>
                    <div className='sothic__contact-textbox flex flex-col'>
                        <input
                            id='phoneNumber'
                            type='number'
                            name='phoneNumber'
                            placeholder='+1 012 3456 789'
                            required
                        />
                        <label htmlFor='phoneNumber'>
                            Số điện thoại
                        </label>
                    </div>
                    <div className='sothic__contact-subject'>
                        <label className='sothic__contact-subject-title'>Vấn đề</label>
                        <div className='sothic__contact-radio-box flex items-center'>
                            <label className='sothic__radio'>
                                General Inquiry
                                <input type='radio' name='radio' />
                                <span className='checkmark'></span>
                            </label>
                            <label className='sothic__radio'>
                                General Inquiry
                                <input type='radio' name='radio' />
                                <span className='checkmark'></span>
                            </label>
                            <label className='sothic__radio'>
                                General Inquiry
                                <input type='radio' name='radio' />
                                <span className='checkmark'></span>
                            </label>
                            <label className='sothic__radio'>
                                General Inquiry
                                <input type='radio' name='radio' />
                                <span className='checkmark'></span>
                            </label>
                        </div>
                    </div>
                    <div className='sothic__contact-textbox message flex flex-col'>
                        <input
                            id='message'
                            type='text'
                            name='message'
                            placeholder='Vui lòng nhập lời nhắn của bạn..'
                            required
                        />
                        <label htmlFor='message'>
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