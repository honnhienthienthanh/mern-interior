import React, { useEffect, useState } from 'react'
import '../../Assets/Css/admin.css'
import { Outlet, useNavigate } from 'react-router-dom'
import SothicApi from '../../common/SothicApi'
import { useDispatch, } from 'react-redux'
import { setUserDetails } from '../../store/userSlice'
import Context from '../../context/Context'
import AdminAside from '../../components/AdminAside'

const Admin = () => {
    const dispatch = useDispatch()
    const [isAdmin, setIsAdmin] = useState(true)
    const navigate = useNavigate()

    const fetchUserDetails = async() => {
        const fetchData = await fetch(SothicApi.current_user.url, {
            method: SothicApi.current_user.method,
            credentials: 'include'
        })

        const responseData = await fetchData.json()

        if(responseData.success) {
            dispatch(setUserDetails(responseData.data))
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [isAdmin])

    // const user = useSelector(state => state?.user?.user)

    // console.log('Admin - ', user)

    // useEffect(() => {
    //     if(user?.role !== ROLE.ADMIN) {
    //         navigate('/')
    //     } else {
    //         setIsAdmin(true)
    //     }
    // }, [])
    
    return (
        <Context.Provider value={{
            fetchUserDetails
        }}>
            <div className='sothic__admin'>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
                <AdminAside isAdmin={isAdmin} dispatch={dispatch} navigate={navigate} />
                <main className='sothic__admin-main'>
                    <Outlet />
                </main>
            </div>
        </Context.Provider>
    )
}

export default Admin