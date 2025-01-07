import React, { useEffect, useState } from 'react'
import '../../Assets/Css/admin.css'
import { Outlet, useNavigate } from 'react-router-dom'
import SothicApi from '../../common/SothicApi'
import AdminAside from '../../components/AdminAside'
import { notification, NotificationProvider } from '../../store/NotificationContext'

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()

    const fetchUserDetails = async() => {
        const fetchData = await fetch(SothicApi.is_admin.url, {
            method: SothicApi.is_admin.method,
            credentials: 'include'
        }).then(res => res.json())

        if(fetchData.success) {
            setIsAdmin(true)
        }

        if(fetchData.error) {
            notification.error(fetchData.message)
            navigate('/')
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [isAdmin])
    
    return (
        <div className='sothic__admin'>
            <NotificationProvider></NotificationProvider>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
            <AdminAside isAdmin={isAdmin} navigate={navigate} />
            <main className='sothic__admin-main'>
                <Outlet />
            </main>
        </div>
    )
}

export default Admin