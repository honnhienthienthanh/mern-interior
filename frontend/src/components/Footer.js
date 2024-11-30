import React from 'react'
import '../Assets/Css/footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='sothic__footer flex items-center justify-between'>
            <div className='sothic__footer-copyright'>
                © 2024 SAOTA. All Rights Reserved. Privacy Policy
            </div>
            <div className='sothic__footer-social md:hidden flex items-center justify-center'>
                <Link id='footerTwetter' to={''} title='Sothic Studio Twetter'>&nbsp;</Link>
                <Link id='footerInstagram' to={''} title='Sothic Studio Instagram'>&nbsp;</Link>
            </div>
            <div className='sothic__footer-subscribe md:hidden'>
                <form className='flex items-center'>
                    <label htmlFor='subscribeEmail'>
                        Sign up for our newsletter:
                    </label>
                    <input
                        id='subscribeEmail'
                        type='email'
                        name='subscribeEmail'
                        placeholder='Email'
                    />
                    <button type='submit' className='uppercase'>Subscribe</button>
                </form>
            </div>
            <div className='sothic__footer-affiliates flex items-center'>
                <Link to={''} title=''>OKHA</Link>
                <Link to={''} title=''>ARRCC</Link>
            </div>
        </footer>
    )
}

export default Footer