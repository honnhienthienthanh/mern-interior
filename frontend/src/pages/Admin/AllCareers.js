import React, { useEffect, useState } from 'react'
import '../../Assets/Css/allnews.css'
import SothicAPI from '../../common/SothicApi'
import moment from 'moment'
import AdminUploadCareers from '../../components/AdminUploadCareers'
import AdminEditCareers from '../../components/AdminEditCareers'
import { useOutletContext } from 'react-router-dom'
import { notification } from '../../store/NotificationContext'
import AdminConfirmBox from '../../components/AdminConfirmBox'

const AllCareers = () => {
    const [careersData, setCareersData] = useState([])
    const [addCareers, setAddCareers] = useState(false)
    const [showEditCareers, setShowEditCareers] = useState(false)
    const [editCareers, setEditCareers] = useState({
        _id: '',
        careersTitle: '',
        careersSumary: '',
        careersImage: [],
        careersContent: ''
    })

    const token = useOutletContext()

    async function getAllCareers() {
        const allCareers = await fetch(SothicAPI.careers_get_all.url)
        const responseData = await allCareers.json()

        if(responseData.success) {
            setCareersData(responseData?.data)
        }

        if(responseData.error) {
            console.log('All News', responseData)
        }
    }

    useEffect(() => {
        getAllCareers()
    }, [])

    const [delStatus, setDelStatus] = useState(false)
    const [careerId, setCareerId] = useState({
        _id: ''
    })

    async function deleteCareer() {
        const delCareer = await fetch(SothicAPI.careers_delete.url, {
            method: SothicAPI.careers_delete.method,
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(careerId)
        }).then(res => res.json())

        if(delCareer.success) {
            notification.success(delCareer.message)
            getAllCareers()
        }

        if(delCareer.error) {
            notification.error(delCareer.message)
        }
    }
    return (
        <div className='sothic__all-news'>
            <div className='sothic__all-news-header flex items-center justify-between'>
                <h1>Quản lý tin tức</h1>
                <button
                    className='sothic__all-news-add flex items-center'
                    onClick={() => setAddCareers(true)}
                >
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    <h2>Thêm tin tuyển dụng</h2>
                </button>
            </div>
            <div className='sothic__all-news-list'>
                {careersData.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Ảnh</th>
                                <th>Tiêu đề</th>
                                <th>Ngày tạo</th>
                                <th>Tác giả</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            { careersData.map((careers, index) => {
                                return  (
                                    <tr key={careers?.careersTitle + index}>
                                        <td>
                                            <img
                                                src={careers?.careersImage[0].url}
                                                alt={`Sothic Studio - ${careers?.careersTitle}`}
                                            />
                                        </td>
                                        <td>
                                            <p>{careers?.careersTitle}</p>
                                        </td>
                                        <td>
                                            <p>{moment(careers?.createdAt).format('lll')}</p>
                                        </td>
                                        <td>
                                            <p>{careers?.author.name}</p>
                                        </td>
                                        <td>
                                            <div className='flex items-center justify-center'>
                                                <button
                                                    className='flex items-center justify-center'
                                                    onClick={() => {
                                                        setShowEditCareers(true)
                                                        setEditCareers(careers)
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        edit
                                                    </span>
                                                </button>
                                                <button
                                                    className='flex items-center justify-center'
                                                    onClick={() => {
                                                        setCareerId({ _id: careers?._id })
                                                        setDelStatus(true)
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined">
                                                        delete
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div
                        className='flex items-center justify-center'
                        style={{ padding: '30px 0'}}
                    >
                        Hiện không có tin tuyển dụng nào để hiển thị!
                    </div>
                )}
            </div>
            { addCareers &&
                <AdminUploadCareers
                token={token}
                    onClose={() => setAddCareers(false)}
                />
            }

            { showEditCareers &&
                <AdminEditCareers
                    token={token}
                    prevData={editCareers}
                    onClose={() => setShowEditCareers(false)}
                    refresh={getAllCareers}
                />
            }
            
            { delStatus &&
                <AdminConfirmBox
                    showStatus={delStatus}
                    message={'Bạn chắc chắn muốn xóa tin tức này chứ?'}
                    userAction={deleteCareer}
                    STClose={() => setDelStatus(false)}
                    refresh={getAllCareers}
                />
            }
        </div>
    )
}

export default AllCareers