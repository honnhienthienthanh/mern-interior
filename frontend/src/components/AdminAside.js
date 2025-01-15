import React from 'react'
import { NavLink } from 'react-router-dom'
import SothicAPI from '../common/SothicApi'
import { notification } from '../store/NotificationContext'

const AdminAside = ({ token, isAdmin, navigate }) => {
    const handleLogout = async(e) => {
        e.preventDefault()

        const fetchLogout = await fetch(SothicAPI.logout.url, {
            method: SothicAPI.logout.method,
            headers: { token }
        })

        const responseData = await fetchLogout.json()

        if(responseData.success) {
            notification.success(responseData.message)
            localStorage.setItem('token', '')
            navigate('/')
        }

        if(responseData.error) {
            notification.error(responseData.message)
        }
    }
    return (
        <aside className='sothic__admin-aside flex flex-col justify-between'>
            <div className='sothic__admin-aside-top'>
                <div className='sothic__admin-aside-logo'>
                    <h1>Sothic</h1>
                </div>
                <div className='sothic__admin-aside-nav flex flex-col'>
                    <NavLink
                        to={''}
                        end
                        title='Sothic Admin Dashboard'
                        className='flex items-center'
                    >
                        <span className="material-symbols-outlined">
                            grid_view
                        </span>
                        <h3>Dashboard</h3>
                    </NavLink>
                    <NavLink
                        to={'home-slider'}
                        title='Sothic Home Slider'
                        className='flex items-center'
                    >
                        <span className="material-symbols-outlined">
                            photo_library
                        </span>
                        <h3>Trang chủ</h3>
                    </NavLink>
                    { isAdmin &&
                        <NavLink
                            to={'all-users'}
                            title='Sothic User'
                            className='flex items-center'
                        >
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            <h3>Tài khoản</h3>
                        </NavLink>
                    }
                    <NavLink
                        to={'all-design-req'}
                        title='Sothic User'
                        className='flex items-center'
                    >
                        <span className="material-symbols-outlined">
                            request_page
                        </span>
                        <h3>Yêu cầu thiết kế</h3>
                    </NavLink>
                    <NavLink
                        to={'all-projects'}
                        title='Sothic Projects'
                        className='flex items-center'
                    >
                        <span className="material-symbols-outlined">
                            inventory
                        </span>
                        <h3>Dự án</h3>
                    </NavLink>
                    <NavLink
                        to={'all-news'}
                        title='Sothic News'
                        className='flex items-center'
                    >
                        <span className="material-symbols-outlined">
                            newsmode
                        </span>
                        <h3>Tin tức</h3>
                    </NavLink>
                    <NavLink
                        to={'all-careers'}
                        title='Sothic User'
                        className='flex items-center'
                    >
                        <span className="material-symbols-outlined">
                            work
                        </span>
                        <h3>Tuyển dụng</h3>
                    </NavLink>
                    <NavLink
                        to={'all-contact'}
                        title='Sothic User'
                        className='flex items-center'
                    >
                        <span className="material-symbols-outlined">
                            contact_page
                        </span>
                        <h3>Liên hệ</h3>
                    </NavLink>
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