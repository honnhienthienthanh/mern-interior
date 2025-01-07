import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import '../Assets/Css/notification.css'
import Notification from './Notification'

const NotificationContext = createContext()

export const addNotificationRef = { current: () => {} }

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState([])

    const addNotification = useCallback((message, type = 'success') => {
        const newNotification = { id: Date.now(), message, type }
        setNotification(prev => [ ...prev, newNotification ])
    }, [])

    const addNotificationRefLocal = useRef(addNotification)

    useEffect(() => {
        addNotificationRef.current = addNotificationRefLocal.current
    }, [addNotification])

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            { children }
            <div className='notification-container'>
                { notification.map(noti => (
                    <Notification
                        key={noti.id}
                        type={noti.type}
                        message={noti.message}
                        onClose={() => setNotification(prev => prev.filter(notice => notice.id !== noti.id))}
                    />
                    // <div
                    //     key={ noti.id }
                    //     className={`notification ${noti.type}`}
                    //     style={{
                    //         animation: visible ? 'slideIn 0.5s forwards' : 'slideOut 0.5s forwards'
                    //     }}
                    // >
                    //     <span>{ noti.message }</span>
                    // </div>
                ))}
            </div>
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)

    if(!context) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }

    return context
}

export const notification = {
    success: message => addNotificationRef.current(message, 'success'),
    error: message => addNotificationRef.current(message, 'error'),
    warning: message => addNotificationRef.current(message, 'warning')
}