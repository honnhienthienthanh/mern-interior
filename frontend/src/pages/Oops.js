import React from 'react'
import '../Assets/Css/oops.css'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Oops = () => {
    return (
        <>
            <Header />
            <main>
                <div className='sothic__oops flex items-center justify-center'>
                    <div className='sothic__oops-content'>
                        <h1>Oops!</h1>
                        <p>
                            Rất tiếc! Trang bạn đang tìm kiếm không tồn tại!
                        </p>
                        <Link to={'/'} title='Sothic Studio - Home page'>
                            Home page
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Oops