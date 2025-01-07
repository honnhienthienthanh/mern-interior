import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SothicApi from './common/SothicApi'
import { useEffect } from 'react'
import Context from './context/Context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import { NotificationProvider } from './store/NotificationContext'

function App() {
    const dispatch = useDispatch()

    const fetchUserDetails = async() => {
        const fetchData = await fetch(SothicApi.current_user.url, {
            method: SothicApi.current_user.method,
            credentials: 'include'
        })

        const responseData = await fetchData.json()

        if(responseData.success) {
            console.log(responseData)
            dispatch(setUserDetails(responseData.data))
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])
    return (
        <>
            <Context.Provider value={{
                fetchUserDetails //fetch user details
            }}>
                <NotificationProvider></NotificationProvider>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </Context.Provider>
        </>
    )
}

export default App
