import React, { useState } from 'react'
import SothicAPI from '../common/SothicApi'
import createUrl from '../helpers/createUrl'
import { notification } from '../store/NotificationContext'

const AdminEditNews = ({ token, prevData, onClose, refresh }) => {
    const [newsData, setNewsData] = useState({
        ...prevData,
        _id: prevData?._id,
        newsTitle: prevData?.newsTitle,
        newsSumary: prevData?.newsSumary,
        newsImage: prevData?.newsImage || [],
        newsContent: prevData?.newsContent,
        replaceImage: []
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
        news.set('_id', newsData._id)
        news.set('newsTitle', newsData.newsTitle)
        news.set('newsSumary', newsData.newsSumary)
        news.set('newsContent', newsData.newsContent)
        news.set('newsImage', JSON.stringify(newsData.newsImage))

        if(typeof newsData.replaceImage === 'object') {
            news.set('replaceImage', newsData.replaceImage[0])
        } else {
            news.set('replaceImage', newsData.replaceImage)
        }
        
        news.set('newsLink', createUrl(newsData.newsTitle))

        const postNews = await fetch(SothicAPI.news_update.url, {
            method: SothicAPI.news_update.method,
            headers: { token },
            body: news
        }).then(res => res.json())

        if(postNews.success) {
            notification.success(postNews.message)
            refresh()
            onClose()
        }

        if(postNews.error) {
            notification.error(postNews.message)
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
                <h2>Sửa tin tức</h2>
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
                                replaceImage: e.target.files
                            }
                        })}
                        className='bottom-10'
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
                    <button className='sothic__upload-submit'>Sửa tin tức</button>
                </form>
            </div>
        </div>
    )
}

export default AdminEditNews