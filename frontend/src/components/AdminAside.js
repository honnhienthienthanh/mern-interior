import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SothicAPI from '../common/SothicApi'
import { setUserDetails } from '../store/userSlice'

const AdminAside = ({isAdmin, dispatch, navigate }) => {
    const [navActive, setNavActive] = useState(0)

    const setNavClass = (index) => {
        return navActive === index ? 'flex items-center active' : 'flex items-center'
    }

    const handleLogout = async(e) => {
        e.preventDefault()

        const fetchLogout = await fetch(SothicAPI.logout.url, {
            method: SothicAPI.logout.method,
            credentials: 'include'
        })

        const responseData = await fetchLogout.json()

        if(responseData.success) {
            console.log(responseData)
            dispatch(setUserDetails(null))
            navigate('/')
        }

        if(responseData.error) {
            console.log(responseData)
        }
    }
    return (
        <aside className='sothic__admin-aside flex flex-col justify-between'>
            <div className='sothic__admin-aside-top'>
                <div className='sothic__admin-aside-logo'>
                    <h1>Sothic</h1>
                </div>
                <div className='sothic__admin-aside-nav flex flex-col'>
                    <Link
                        to={''}
                        title='Sothic Admin Dashboard'
                        onClick={() => setNavActive(0)}
                        className={setNavClass(0)}
                    >
                        <span className="material-symbols-outlined">
                            grid_view
                        </span>
                        <h3>Dashboard</h3>
                    </Link>
                    <Link
                        to={'home-slider'}
                        title='Sothic Admin Dashboard'
                        onClick={() => setNavActive(1)}
                        className={setNavClass(1)}
                    >
                        <span className="material-symbols-outlined">
                            photo_library
                        </span>
                        <h3>Trang chủ</h3>
                    </Link>
                    { isAdmin &&
                        <Link
                            to={'all-users'}
                            title='Sothic User'
                            onClick={() => setNavActive(2)}
                            className={setNavClass(2)}
                        >
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <h3>Tài khoản</h3>
                        </Link>
                    }
                    <Link
                        to={'all-projects'}
                        title='Sothic User'
                        onClick={() => setNavActive(3)}
                        className={setNavClass(3)}
                    >
                        <span className="material-symbols-outlined">
                            inventory
                        </span>
                        <h3>Dự án</h3>
                    </Link>
                    <Link
                        to={'all-news'}
                        title='Sothic User'
                        onClick={() => setNavActive(4)}
                        className={setNavClass(4)}
                    >
                        <span className="material-symbols-outlined">
                            newsmode
                        </span>
                        <h3>Tin tức</h3>
                    </Link>
                </div>
            </div>
            <div className='sothic__admin-aside-bottom'>
                <button className='sothic__admin-logout flex items-center' onClick={handleLogout}>
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                    <h3>Logout</h3>
                </button>
            </div>
        </aside>
    )
}

export default AdminAside