import React, { useEffect, useState } from 'react'
import '../../Assets/Css/admin.css'
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import SothicApi from '../../common/SothicApi'
import AdminAside from '../../components/AdminAside'
import { notification, NotificationProvider } from '../../store/NotificationContext'
import Login from '../Login'
import Dashboard from './Dashboard'
import HomeSlider from './HomeSlider'
import AllUsers from './AllUsers'
import AllDesignREQ from './AllDesignREQ'
import AllProjects from './AllProjects'
import AllNews from './AllNews'
import AllCareers from './AllCareers'
import AllContact from './AllContact'

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [token, setToken] = useState(
        localStorage.getItem('token') ? localStorage.getItem('token') : ''
    )
    const navigate = useNavigate()

    const fetchIsAdmin = async() => {
        const fetchData = await fetch(SothicApi.is_admin.url, {
            method: SothicApi.is_admin.method,
            headers: { token }
        }).then(res => res.json())

        if(fetchData.success) {
            setIsAdmin(true)
        }

        if(fetchData.error) {
            notification.error(fetchData.message)
            localStorage.setItem('token', '')
            setToken('')
        }
    }

    useEffect(() => {
        fetchIsAdmin()
    }, [])
    
    return (
        !token ? (
            <Login setToken={setToken} />
        ) : (
            <div className='sothic__admin'>
                <NotificationProvider></NotificationProvider>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
                <AdminAside token={token} isAdmin={isAdmin} navigate={navigate} />
                <main className='sothic__admin-main'>
                    <Outlet context={token} />
                </main>
            </div>
        )
    )
}

export default Admin