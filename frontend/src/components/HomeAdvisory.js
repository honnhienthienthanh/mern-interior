import React, { useEffect, useState } from 'react'
import SothicAPI from '../common/SothicApi'
import { notification } from '../store/NotificationContext'

const HomeAdvisory = ({ showStatus, onClose}) => {
    const [visible, setVisible] = useState(true)
    
    const [reqData, setREQData] = useState({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        customerArea: '',
        customerFloor: '',
        customerAddress: '',
        customerAdvisory: '',
        customerRequest: ''
    })

    const inputREQData = (e) => {
        const { name, value } = e.target

        setREQData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function handleSendRequest(e) {
        e.preventDefault()
        const sendRequest = await fetch(SothicAPI.design_req.url, {
            method: SothicAPI.design_req.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqData)
        }).then(res => res.json())

        if(sendRequest.success) {
            notification.success(sendRequest.message)
            const toogleAdvisory = setTimeout(() => {
                setVisible(false)
            }, 500)
            return () => clearTimeout(toogleAdvisory)
        }

        if(sendRequest.error) {
            notification.error(sendRequest.message)
        }
    }

    useEffect(() => {
        if(!visible) {
            const hideAdvisory = setTimeout(() => {
                onClose()
            }, 800)

            return () => clearTimeout(hideAdvisory)
        }
    })
    return (
        <div className={visible ? 'sothic__popup showZoom' : 'sothic__popup hideZoom'}>
            <div className='sothic__background' onClick={() => setVisible(false)}></div>
            <form className='sothic__form' onSubmit={handleSendRequest}>
                <div className='sothic__form-title flex items-center justify-between'>
                    <h2>Yêu cầu thiết kế</h2>
                    <div className='sothic__exit' onClick={() => setVisible(false)}></div>
                </div>
                <input
                    type='text'
                    name='customerName'
                    id='customerName'
                    placeholder='Họ và tên (*)'
                    value={reqData.customerName}
                    onChange={inputREQData}
                />
                <input
                    type='text'
                    name='customerPhone'
                    id='customerPhone'
                    placeholder='Số điện thoại (*)'
                    value={reqData.customerPhone}
                    onChange={inputREQData}
                />
                <input
                    type='email'
                    name='customerEmail'
                    id='customerEmail'
                    placeholder='Email (*)'
                    value={reqData.customerEmail}
                    onChange={inputREQData}
                />
                <input
                    type='text'
                    name='customerArea'
                    id='customerArea'
                    placeholder='Diện tích thi công (*)'
                    value={reqData.customerArea}
                    onChange={inputREQData}
                />
                <input
                    type='text'
                    name='customerFloor'
                    id='customerFloor'
                    placeholder='Số tầng thi công (*)'
                    value={reqData.customerFloor}
                    onChange={inputREQData}
                />
                <input
                    type='text'
                    name='customerAddress'
                    id='customerAddress'
                    placeholder='Địa chỉ thi công (*)'
                    value={reqData.customerAddress}
                    onChange={inputREQData}
                />
                <select
                    name='customerAdvisory'
                    id='customerAdvisory'
                    value={reqData.customerAdvisory}
                    onChange={inputREQData}
                >
                    <option value={''}>Tư vấn thiết kế</option>
                    <option value={'Biệt thự hiện đại'}>Biệt thự hiện đại</option>
                    <option value={'Nhà phố hiện đại'}>Nhà phố hiện đại</option>
                    <option value={'Penthouse & Duplex'}>Penthouse & Duplex</option>
                </select>
                <textarea
                    name='customerRequest'
                    id='customerRequest'
                    placeholder='Yêu cầu chi tiết (Nếu có)'
                    value={reqData.customerRequest}
                    onChange={inputREQData}
                ></textarea>
                <button type='submit'>Gửi yêu cầu</button>
            </form>
        </div>
    )
}

export default HomeAdvisory