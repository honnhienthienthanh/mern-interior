import React, { useEffect, useState } from 'react'

const Notification = ({ type, message, onClose }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setVisible(false)
        }, 10000)

        return () => clearTimeout(timeOut)
    }, [])

    useEffect(() => {
        if(!visible) {
            const timeOut = setTimeout(() => {
                onClose()
            }, 500)

            return () => clearTimeout(timeOut)
        }
    }, [visible, onClose])

    return (
        <div
            className={`notification ${ type }`}
            style={{
                animation: visible ? 'slideIn 0.5s forwards' : 'slideOut 0.5s forwards'
            }}
            onAnimationEnd={ () => !visible && onClose }
        >
            <span>{ message }</span>
            <button onClick={() => setVisible(false)}>X</button>
        </div>
    )
}

export default Notification