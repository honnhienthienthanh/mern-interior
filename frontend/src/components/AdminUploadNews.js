import React, { useState } from 'react'
import '../Assets/Css/uploadnews.css'
import SothicAPI from '../common/SothicApi'
import createUrl from '../helpers/createUrl'
import { notification } from '../store/NotificationContext'

const AdminUploadNews = ({ token, onClose }) => {
    const [newsData, setNewsData] = useState({
        newsTitle: '',
        newsSumary: '',
        newsImage: [],
        newsContent: ''
    })

    const inputNewsData = (e) => {
        const { name, value } = e.target

        setNewsData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function uploadNews(e) {
        e.preventDefault()
        const news = new FormData()
        news.set('newsTitle', newsData.newsTitle)
        news.set('newsSumary', newsData.newsSumary)
        news.set('newsContent', newsData.newsContent)
        news.set('newsImage', newsData.newsImage[0])
        news.set('newsLink', createUrl(newsData.newsTitle))

        const postNews = await fetch(SothicAPI.news_upload.url, {
            method: SothicAPI.news_upload.method,
            headers: { token },
            body: news
        })

        if(postNews.ok) {
            notification.success('Thêm tin tức mới thành công!')
            onClose()
        }

        if(!postNews.ok) {
            notification.error('Đã có lỗi. Vui lòng kiểm tra lại!')
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
                <h2>Thêm tin tức mới</h2>
                <form className='flex flex-col' onSubmit={uploadNews}>
                    <label htmlFor='newsTitle'>Tiêu đề:</label>
                    <input
                        id='newsTitle'
                        name='newsTitle'
                        type='text'
                        placeholder='Nhập tên dự án'
                        value={newsData.newsTitle}
                        onChange={inputNewsData}
                        className='bottom-10'
                        required
                    />

                    <label htmlFor='newsTitle'>Tóm tắt:</label>
                    <input
                        id='newsSumary'
                        name='newsSumary'
                        type='text'
                        placeholder='Nhập tên dự án'
                        value={newsData.newsSumary}
                        onChange={inputNewsData}
                        className='bottom-10'
                        required
                    />

                    <label htmlFor='newsTitle'>Ảnh:</label>
                    <input
                        id='newsImage'
                        name='newsImage'
                        type='file'
                        onChange={e => setNewsData(prev => {
                            return {
                                ...prev,
                                newsImage: e.target.files
                            }
                        })}
                        className='bottom-10'
                        required
                    />
                    
                    <label htmlFor='newsContent'>Nội dung:</label>
                    <textarea
                        id='newsContent'
                        name='newsContent'
                        placeholder='Nhập nội dung'
                        value={newsData.newsContent}
                        onChange={inputNewsData}
                        className='bottom-10'
                        required
                    ></textarea>
                    <button className='sothic__upload-submit'>Thêm dự án</button>
                </form>
            </div>
        </div>
    )
}

export default AdminUploadNews