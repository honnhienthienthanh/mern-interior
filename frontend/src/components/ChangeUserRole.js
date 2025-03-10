import React, { useState } from 'react'
import '../Assets/Css/changeuserrole.css'
import ROLE from '../common/Role'
import SothicAPI from '../common/SothicApi'
import { notification } from '../store/NotificationContext'

const ChangeUserRole = ({ token, userId, name, email, role, refresh, onClose }) => {
    const [userRole, setUserRole] = useState(role)

    const selectOnChange = (e) => {
        setUserRole(e.target.value)
    }

    const updateUserRole = async(e) => {
        const fetchUpdate = await fetch(SothicAPI.update_user_role.url, {
            method: SothicAPI.update_user_role.method,
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const responseData = await fetchUpdate.json()

        if(responseData.success) {
            notification.success('Đã thay đổi phân quyền thành công!')
            refresh()
            onClose()
        }

        if(responseData.error) {
            notification.error('Đã có lỗi. Vui lòng kiểm tra lại!')
        }
    }
    return (
        <div className='sothic__admin-change-role flex items-center justify-center'>
            <button className='sothic__popup-exit' onClick={onClose}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
            <div className='sothic__popup-bg' onClick={onClose}></div>
            <div className='sothic__change-role-popup'>
                <h2>Sửa phân quyền tài khoản</h2>
                <p>Họ tên: {name}</p>
                <p>Email: {email}</p>
                <div className='sothic__change-role-select'>
                    <p>Quyền hạn:</p>
                    <select value={userRole} onChange={selectOnChange}>
                        { Object.values(ROLE).map((role, index) => {
                            return (
                                <option key={role + index} value={role}>{role}</option>
                            )
                        })}
                    </select>
                </div>
                <button className='uppercase' onClick={updateUserRole}>Xác nhận</button>
            </div>
        </div>
    )
}

export default ChangeUserRole