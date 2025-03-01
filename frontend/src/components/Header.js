import React, { useState } from 'react'
import '../Assets/Css/header.css'
import { Link, NavLink } from 'react-router-dom'
import LiveSearch from './LiveSearch'

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false)

    return (
        <header>
            <div className='sothic__header flex items-center justify-between'>
                <Link
                    to={'/'}
                    tittle='Sothic Studio'
                    className='sothic__header-logo flex items-center justify-center'
                >
                    <span className='text-center uppercase'>Sothic</span>
                </Link>
                <nav
                    className='sothic__header-navigation flex items-center
                    justify-center uppercase md:hidden'
                >
                    <NavLink
                        to={'/projects'}
                        title='Sothic Studio - Projects'
                        className='uppercase'
                    >
                        DỰ ÁN
                    </NavLink>
                    <NavLink
                        to={'/about'}
                        title='About Sothic Studio'
                        className='uppercase'
                    >
                        GIỚI THIỆU
                    </NavLink>
                    <NavLink
                        to={'/news'}
                        title='Sothic Studio - News'
                        className='uppercase'
                    >
                        TIN TỨC
                    </NavLink>
                    <NavLink
                        to={'/careers'}
                        title='Sothic Studio - Careers'
                        className='uppercase'
                    >
                        TUYỂN DỤNG
                    </NavLink>
                    <NavLink
                        to={'/contact'}
                        title='Contact to Sothic Studio'
                        className='uppercase'
                    >
                        LIÊN HỆ
                    </NavLink>
                </nav>
                <LiveSearch />
                {/* <div className='sothic__header-search flex items-center justify-center xs:hidden'>
                    <input
                        type='text'
                        name='sothic-search'
                        placeholder='Search here...'
                        className='sothic__search-box'
                    />
                </div> */}
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