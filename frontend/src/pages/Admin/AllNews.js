import React, { useEffect, useState } from 'react'
import '../../Assets/Css/allnews.css'
import AdminUploadNews from '../../components/AdminUploadNews'
import SothicAPI from '../../common/SothicApi'
import moment from 'moment'
import AdminEditNews from '../../components/AdminEditNews'
import AdminConfirmBox from '../../components/AdminConfirmBox'
import { notification } from '../../store/NotificationContext'
import { useOutletContext } from 'react-router-dom'

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

    const token = useOutletContext()

    async function getAllNews() {
        const allNews = await fetch(SothicAPI.news_get_all.url)
        const responseData = await allNews.json()

        if(responseData.success) {
            setNewsData(responseData?.data)
        }

        if(responseData.error) {
            notification.error(responseData.message)
        }
    }

    useEffect(() => {
        getAllNews()
    }, [])

    const [delNewsStatus, setDelNewsStatus] = useState(false)
    const [newsId, setNewsId] = useState({
        _id: ''
    })

    async function deleteNews() {
        const delNews = fetch(SothicAPI.news_delete.url, {
            method: SothicAPI.news_delete.method,
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(newsId)
        }).then(res => res.json())

        if(delNews.success) {
            notification.success(delNews.message)
            getAllNews()
        }

        if(delNews.error) {
            notification.error(delNews.message)
        }
    }
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
                { newsData.length > 0 ? (
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
                            { newsData.map((news, index) => {
                                return  (
                                    <tr key={news?.newsTitle + index}>
                                        <td>
                                            <img
                                                src={news?.newsImage[0]?.url}
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
                                                <button
                                                    className='flex items-center justify-center'
                                                    onClick={() => {
                                                        setNewsId({ _id: news?._id })
                                                        setDelNewsStatus(true)
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
                        Hiện không có tin tức nào để hiển thị!
                    </div>
                )}
                
            </div>
            { addNew &&
                <AdminUploadNews
                    token={token}
                    onClose={() => setAddNews(false)}
                    refresh={getAllNews}
                />
            }

            { showEditNews &&
                <AdminEditNews
                    token={token}
                    prevData={editNews}
                    refresh={getAllNews}
                    onClose={() => setShowEditNews(false)}
                />
            }
            { delNewsStatus &&
                <AdminConfirmBox
                    showStatus={delNewsStatus}
                    message={'Bạn chắc chắn muốn xóa tin tức này chứ?'}
                    userAction={deleteNews}
                    STClose={() => setDelNewsStatus(false)}
                    refresh={getAllNews}
                />
            }
        </div>
    )
}

export default AllNews