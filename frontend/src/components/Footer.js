import React, { useState } from 'react'
import '../Assets/Css/footer.css'
import { Link } from 'react-router-dom'
import SothicAPI from '../common/SothicApi'
import { notification } from '../store/NotificationContext'

const Footer = () => {
    const [scEmail, setScEmail] = useState('')
    async function handleSubscribe(e) {
        e.preventDefault()

        const subscribe = await fetch(SothicAPI.subscribe_email.url, {
            method: SothicAPI.subscribe_email.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({scEmail: scEmail})
        }).then(res => res.json())

        if(subscribe.success) {
            notification.success(subscribe.message)
        }
        
        if(subscribe.error) {
            notification.error(subscribe.message)
        }
    }
    return (
        <footer className='sothic__footer flex items-center justify-between'>
            <div className='sothic__footer-copyright'>
                © 2025 Sothic Studio. All Rights Reserved. Privacy Policy
            </div>
            <div className='sothic__footer-social md:hidden flex items-center justify-center'>
                <Link id='footerTwetter' to={''} title='Sothic Studio Twetter'>&nbsp;</Link>
                <Link id='footerInstagram' to={''} title='Sothic Studio Instagram'>&nbsp;</Link>
            </div>
            <div className='sothic__footer-subscribe md:hidden'>
                <form className='flex items-center' onSubmit={handleSubscribe}>
                    <label htmlFor='subscribeEmail'>
                        Đăng ký để nhận tin tức mới:
                    </label>
                    <input
                        id='subscribeEmail'
                        type='email'
                        name='subscribeEmail'
                        placeholder='Email'
                        value={scEmail}
                        onChange={(e) => setScEmail(e.target.value)}
                    />
                    <button type='submit' className='uppercase'>Đăng ký</button>
                </form>
            </div>
            {/* <div className='sothic__footer-affiliates flex items-center'>
                <Link to={''} title=''>OKHA</Link>
                <Link to={''} title=''>ARRCC</Link>
            </div> */}
        </footer>
    )
}

export default Footer