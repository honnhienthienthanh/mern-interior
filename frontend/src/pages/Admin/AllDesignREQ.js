import React, { useEffect, useState } from 'react'
import '../../Assets/Css/homeslider.css'
import SothicAPI from '../../common/SothicApi'
import { notification } from '../../store/NotificationContext'
import '../../Assets/Css/designreq.css'
import AdminConfirmBox from '../../components/AdminConfirmBox'

const AllDesignREQ = () => {
    const [reqData, setREQData] = useState([])
    const [delREQ, setDelREQ] = useState(false)
    const [reqId, setREQId] = useState({
        _id: ''
    })

    async function getAllREQ() {
        const allREQ = await fetch(SothicAPI.design_req_get.url, {
            method: SothicAPI.design_req_get.method,
            credentials: 'include'
        }).then(res => res.json())

        if(allREQ.success) {
            setREQData(allREQ.data)
        }

        if(allREQ.error) {
            notification.error(allREQ.message)
        }
    }

    useEffect(() => {
        getAllREQ()
    }, [])

    async function deleteDesignREQ() {
        const deleteREQ = await fetch(SothicAPI.design_req_delete.url, {
            method: SothicAPI.design_req_delete.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqId)
        }).then(res => res.json())

        if(deleteREQ.success) {
            notification.success(deleteREQ.message)
        }

        if(deleteREQ.error) {
            notification.error(deleteREQ.message)
        }
    }
    return (
        <div className='sothic__all-news sothic__all-design-req'>
            <div className='sothic__all-news-header flex items-center justify-between'>
                <h1>Quản lý yêu cầu thiết kế</h1>
            </div>
            { reqData.length > 0 ? (reqData.map((req, index) => {
                return (
                    <div className='sothic__admin-home-item flex items-center' key={req?.customerName + index}>
                        <div className='sothic__admin-home-item-content flex flex-col'>
                            <p className='flex items-center justify-between'>
                                <span>Họ và tên:</span>
                                <strong>{ req?.customerName }</strong>
                            </p>
                            <p className='flex items-center'>
                                <span>Số điện thoại:</span>
                                <strong>{ req?.customerPhone }</strong>
                            </p>
                            <p className='flex items-center'>
                                <span>Email:</span>
                                <strong>{ req?.customerEmail }</strong>
                            </p>
                            <p className='flex items-center'>
                                <span>Diện tích thi công:</span>
                                <strong>{ req?.customerArea }</strong>
                            </p>
                            <p className='flex items-center'>
                                <span>Số tầng thi công:</span>
                                <strong>{ req?.customerFloor }</strong>
                            </p>
                            <p className='flex items-center'>
                                <span>Địa chỉ thi công:</span>
                                <strong>{ req?.customerAddress }</strong>
                            </p>
                            <p className='flex items-center'>
                                <span>Phong cách thiết kế:</span>
                                <strong>{ req?.customerAdvisory }</strong>
                            </p>
                            <p className='flex items-center'>
                                <span>Yêu cầu chi tiết:</span>
                                <strong>{ req?.customerRequest }</strong>
                            </p>
                        </div>
                        <div className='sothic__admin-home-item-action flex flex-col justify-center'>
                            <button
                                type='button'
                                className='user-delete'
                                onClick={() => {
                                    setREQId({ _id: req?._id})
                                    setDelREQ(true)
                                }}
                            >
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </div>
                    </div>
                )
            })) : (
                <div
                    className='flex items-center justify-center'
                    style={{ padding: '30px 0'}}
                >
                    Hiện không có yêu cầu thiết kế nào để hiển thị!
                </div>
            )}

            {delREQ &&
                <AdminConfirmBox
                    showStatus={delREQ}
                    message={'Bạn chắc chắn muốn xóa yêu cầu thiết kế này chứ?'}
                    userAction={deleteDesignREQ}
                    STClose={() => setDelREQ(false)}
                    refresh={getAllREQ}
                />
            }
        </div>
    )
}

export default AllDesignREQ