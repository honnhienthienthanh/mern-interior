import React, { useEffect, useState } from 'react'
import '../../Assets/Css/allnews.css'
import AdminUploadNews from '../../components/AdminUploadNews'
import SothicAPI from '../../common/SothicApi'
import moment from 'moment'
import AdminEditNews from '../../components/AdminEditNews'

const AllNews = () => {
    const [newsData, setNewsData] = useState([])
    const [addNew, setAddNews] = useState(false)
    const [showEditNews, setShowEditNews] = useState(false)
    const [editNews, setEditNews] = useState({
        _id: '',
        newsTitle: '',
        newsSumary: '',
        newsImage: [],
        newsContent: ''
    })

    async function getAllNews() {
        const allNews = await fetch(SothicAPI.news_get_all.url)
        const responseData = await allNews.json()

        if(responseData.success) {
            setNewsData(responseData?.data)
        }

        if(responseData.error) {
            console.log('All News', responseData)
        }
    }

    useEffect(() => {
        getAllNews()
    }, [])
    return (
        <div className='sothic__all-news'>
            <div className='sothic__all-news-header flex items-center justify-between'>
                <h1>Quản lý tin tức</h1>
                <button
                    className='sothic__all-news-add flex items-center'
                    onClick={() => setAddNews(true)}
                >
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    <h2>Thêm tin tức mới</h2>
                </button>
            </div>
            <div className='sothic__all-news-list'>
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
                        { newsData.length > 0 && newsData.map((news, index) => {
                            return  (
                                <tr key={news?.newsTitle + index}>
                                    <td>
                                        <img
                                            src={'http://localhost:8080/' + news?.newsImage}
                                            alt={`Sothic Studio - ${news?.newsTitle}`}
                                        />
                                    </td>
                                    <td>
                                        <p>{news?.newsTitle}</p>
                                    </td>
                                    <td>
                                        <p>{moment(news?.createdAt).format('lll')}</p>
                                    </td>
                                    <td>
                                        <p>{news?.author.name}</p>
                                    </td>
                                    <td>
                                        <div className='flex items-center justify-center'>
                                            <button
                                                className='flex items-center justify-center'
                                                onClick={() => {
                                                    setShowEditNews(true)
                                                    setEditNews(news)
                                                }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>
                                            </button>
                                            <button className='flex items-center justify-center'>
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
            </div>
            { addNew &&
                <AdminUploadNews
                    onClose={() => setAddNews(false)}
                />
            }

            { showEditNews &&
                <AdminEditNews
                    prevData={editNews}
                    onClose={() => setShowEditNews(false)}
                    refresh={getAllNews}
                />
            }
        </div>
    )
}

export default AllNews