import React, { useState } from 'react'
import SothicAPI from '../common/SothicApi'
import createUrl from '../helpers/createUrl'
import { notification } from '../store/NotificationContext'

const AdminEditCareers = ({ token, prevData, onClose, refresh }) => {
    const [careersData, setCareersData] = useState({
        ...prevData,
        _id: prevData?._id,
        careersTitle: prevData?.careersTitle,
        careersSumary: prevData?.careersSumary,
        careersImage: prevData?.careersImage || [],
        careersContent: prevData?.careersContent,
        replaceImage: []
    })

    const inputCareersData = (e) => {
        const { name, value } = e.target

        setCareersData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function uploadCareers(e) {
        e.preventDefault()
        const careers = new FormData()
        careers.set('_id', careersData._id)
        careers.set('careersTitle', careersData.careersTitle)
        careers.set('careersSumary', careersData.careersSumary)
        careers.set('careersContent', careersData.careersContent)
        careers.set('careersImage', JSON.stringify(careersData.careersImage))

        if(typeof careersData.careersImage === 'object') {
            careers.set('replaceImage', careersData.replaceImage[0])
        } else {
            careers.set('replaceImage', careersData.replaceImage)
        }
        
        careers.set('careersLink', createUrl(careersData.careersTitle))

        const postCareers = await fetch(SothicAPI.careers_edit.url, {
            method: SothicAPI.careers_edit.method,
            headers: { token },
            body: careers
        }).then(res => res.json())

        if(postCareers.success) {
            notification.success(postCareers.message)
            refresh()
            onClose()
        }

        if(postCareers.error) {
            notification.error(postCareers.message)
            onClose()
        }
    }
    return (
        <div className='sothic__upload flex items-center justify-center'>
            <button className='sothic__popup-exit' onClick={onClose}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
            <div className='sothic__popup-bg' onClick={onClose}></div>
            <div className='sothic__upload-news sothic__upload-form flex flex-col'>
                <h2>Sửa tin tuyển dụng</h2>
                <form className='flex flex-col' onSubmit={uploadCareers}>
                    <label htmlFor='careersTitle'>Tiêu đề:</label>
                    <input
                        id='careersTitle'
                        name='careersTitle'
                        type='text'
                        placeholder='Nhập tên dự án'
                        value={careersData.careersTitle}
                        onChange={inputCareersData}
                        className='bottom-10'
                        required
                    />

                    <label htmlFor='careersSumary'>Tóm tắt:</label>
                    <input
                        id='careersSumary'
                        name='careersSumary'
                        type='text'
                        placeholder='Nhập tên dự án'
                        value={careersData.careersSumary}
                        onChange={inputCareersData}
                        className='bottom-10'
                        required
                    />

                    <label htmlFor='careersImage'>Ảnh:</label>
                    <input
                        id='careersImage'
                        name='careersImage'
                        type='file'
                        onChange={e => setCareersData(prev => {
                            return {
                                ...prev,
                                replaceImage: e.target.files
                            }
                        })}
                        className='bottom-10'
                    />
                    
                    <label htmlFor='careersContent'>Nội dung:</label>
                    <textarea
                        id='careersContent'
                        name='careersContent'
                        placeholder='Nhập nội dung'
                        value={careersData.careersContent}
                        onChange={inputCareersData}
                        className='bottom-10'
                        required
                    ></textarea>
                    <button className='sothic__upload-submit'>Sửa tin</button>
                </form>
            </div>
        </div>
    )
}

export default AdminEditCareers