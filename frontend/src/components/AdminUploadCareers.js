import React, { useState } from 'react'
import '../Assets/Css/uploadnews.css'
import SothicAPI from '../common/SothicApi'
import createUrl from '../helpers/createUrl'
import { notification } from '../store/NotificationContext'

const AdminUploadCareers = ({ onClose }) => {
    const [careersData, setCareersData] = useState({
        careersTitle: '',
        careersSumary: '',
        careersImage: [],
        careersContent: ''
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
        careers.set('careersTitle', careersData.careersTitle)
        careers.set('careersSumary', careersData.careersSumary)
        careers.set('careersContent', careersData.careersContent)
        careers.set('careersImage', careersData.careersImage[0])
        careers.set('careersLink', createUrl(careersData.careersTitle))

        const postCareers = await fetch(SothicAPI.careers_upload.url, {
            method: SothicAPI.careers_upload.method,
            credentials: 'include',
            body: careers
        })

        if(postCareers.ok) {
            notification.success('Thêm tin tức mới thành công!')
            onClose()
        }

        if(!postCareers.ok) {
            notification.error('Đã có lỗi. Vui lòng kiểm tra lại!')
        }
    }

    console.log(careersData)
    return (
        <div className='sothic__upload flex items-center justify-center'>
            <button className='sothic__popup-exit' onClick={onClose}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
            <div className='sothic__popup-bg' onClick={onClose}></div>
            <div className='sothic__upload-news sothic__upload-form flex flex-col'>
                <h2>Thêm tin tuyển dụng</h2>
                <form className='flex flex-col' onSubmit={uploadCareers}>
                    <label htmlFor='careersTitle'>Tiêu đề:</label>
                    <input
                        id='careersTitle'
                        name='careersTitle'
                        type='text'
                        placeholder='Nhập tiêu đề'
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
                        placeholder='Nhập tóm tắt'
                        value={careersData.careersSumary}
                        onChange={inputCareersData}
                        className='bottom-10'
                        required
                    />

                    <label htmlFor='newsTitle'>Ảnh:</label>
                    <input
                        id='careersImage'
                        name='careersImage'
                        type='file'
                        onChange={e => setCareersData(prev => {
                            return {
                                ...prev,
                                careersImage: e.target.files
                            }
                        })}
                        className='bottom-10'
                        required
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
                    <button className='sothic__upload-submit'>Thêm</button>
                </form>
            </div>
        </div>
    )
}

export default AdminUploadCareers