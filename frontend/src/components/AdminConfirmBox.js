import React, { useState } from 'react'
import '../Assets/Css/confirmbox.css'

const AdminConfirmBox = ({ showStatus, userAction, message, STClose, refresh }) => {
    const [show, setShow] = useState(showStatus)
    
    function onClose() {
        setShow(false)

        const timeOut = setTimeout(() => {
            STClose()
            refresh()
        }, 600)
        
        return () => clearTimeout(timeOut)
    }
    return (
        <div
            className={`sothic__popup confirm-popup 
                flex items-center justify-center ${show ? 'show' : ''}`
            }
        >
            <div className='sothic__background' onClick={onClose}></div>
            <div className='confirm-box relative'>
                <p>{message}</p>
                <div className='flex items-center justify-center'>
                    <button
                        type='button'
                        className='medium confirm-btn'
                        onClick={() => {
                            userAction()
                            onClose()
                        }}
                    >
                        Xác nhận
                    </button>
                    <button
                        type='button'
                        className='medium reject-btn'
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminConfirmBox