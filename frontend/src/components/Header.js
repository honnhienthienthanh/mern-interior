import React, { useState } from 'react'
import '../Assets/Css/header.css'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false)
    const [menuActive, setMenuActive] = useState(0)

    // const user = useSelector(state => state?.user?.user)

    function setMenuClass(index) {
        return menuActive === index ? 'uppercase nav-active' : 'uppercase'
    }

    return (
        <header>
            <div className='sothic__header flex items-center justify-between'>
                <Link
                    to={'/'}
                    tittle='Sothic Studio'
                    className='sothic__header-logo flex items-center justify-center'
                    onClick={() => setMenuActive(0)}
                >
                    <span className='text-center uppercase'>Sothic</span>
                </Link>
                <nav
                    className='sothic__header-navigation flex items-center
                    justify-center uppercase md:hidden'
                >
                    <Link
                        to={'/projects'}
                        title='Sothic Studio - Projects'
                        onClick={() => setMenuActive(1)}
                        className={setMenuClass(1)}
                    >
                        DỰ ÁN
                    </Link>
                    <Link
                        to={'/about'}
                        title='About Sothic Studio'
                        onClick={() => setMenuActive(2)}
                        className={setMenuClass(2)}
                    >
                        GIỚI THIỆU
                    </Link>
                    <Link
                        to={'/news'}
                        title='Sothic Studio - News'
                        onClick={() => setMenuActive(4)}
                        className={setMenuClass(4)}
                    >
                        TIN TỨC
                    </Link>
                    <Link
                        to={'/careers'}
                        title='Sothic Studio - Careers'
                        onClick={() => setMenuActive(5)}
                        className={setMenuClass(5)}
                    >
                        TUYỂN DỤNG
                    </Link>
                    <Link
                        to={'/contact'}
                        title='Contact to Sothic Studio'
                        onClick={() => setMenuActive(6)}
                        className={setMenuClass(6)}
                    >
                        LIÊN HỆ
                    </Link>
                    <Link
                        to={'/media'}
                        title='Sothic Studio - Media'
                        onClick={() => setMenuActive(3)}
                        className={setMenuClass(3)}
                    >
                        MEDIA
                    </Link>
                </nav>
                <div className='sothic__header-search flex items-center justify-center xs:hidden'>
                    <input
                        type='text'
                        name='sothic-search'
                        placeholder='Search here...'
                        className='sothic__search-box'
                    />
                </div>
                <div
                    className={ mobileMenu
                        ? 'sothic__header-mobile-nav hidden md:block menu-active'
                        : 'sothic__header-mobile-nav hidden md:block'
                    }
                    onClick={() => setMobileMenu(prev => !prev)}
                >
                    &nbsp;
                </div>
            </div>
            { mobileMenu &&
                <div
                    className={ mobileMenu ? 'sothic__mobile-navigation show'
                        : 'sothic__mobile-navigation'
                    }
                >
                    <div className='sothic__mobile-navigation-container flex flex-col'>
                        <div className='sothic__mobile-logo flex items-center justify-between'>
                            <Link to={'/'} className='uppercase'>Sothic</Link>
                            <button
                                className='sothic__exit'
                                onClick={() => setMobileMenu(prev => !prev)}
                            >
                                &nbsp;
                            </button>
                        </div>
                        <div className='sothic__mobile-search hidden xs:block'>
                            <input
                                type='text'
                                name='sothic-search'
                                placeholder='Search here...'
                                className='sothic__mobile-search-box'
                            />
                        </div>
                        <Link to={'/projects'} title='' onClick={() => setMobileMenu(prev => !prev)}>
                            PROJECTS
                        </Link>
                        <Link to={'/about'} title='' onClick={() => setMobileMenu(prev => !prev)}>
                            ABOUT
                        </Link>
                        <Link to={'/media'} title='' onClick={() => setMobileMenu(prev => !prev)}>
                            MEDIA
                        </Link>
                        <Link to={'/news'} title='' onClick={() => setMobileMenu(prev => !prev)}>
                            NEWS
                        </Link>
                        <Link to={'/careers'} title='' onClick={() => setMobileMenu(prev => !prev)}>
                            CAREERS
                        </Link>
                        <Link to={'/lsl-book'} title='' onClick={() => setMobileMenu(prev => !prev)}>
                            LSL BOOK
                        </Link>
                        <Link to={'/contact'} title='' onClick={() => setMobileMenu(prev => !prev)}>
                            CONTACT
                        </Link>
                    </div>
                    <div
                        className='sothic__background'
                        onClick={() => setMobileMenu(prev => !prev)}
                    ></div>
                </div>
            }
        </header>
    )
}

export default Header