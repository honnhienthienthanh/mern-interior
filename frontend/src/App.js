import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { NotificationProvider } from './store/NotificationContext'

function App() {
    return (
        <>
            <NotificationProvider></NotificationProvider>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default App
