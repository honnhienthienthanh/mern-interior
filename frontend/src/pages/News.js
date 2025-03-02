import React, { useEffect, useState } from 'react'
import '../Assets/Css/news.css'
import { Link } from 'react-router-dom'
import SothicAPI from '../common/SothicApi'
import getPageNumber from '../helpers/getPageNumber'

const News = () => {
    const [newsData, setNewsData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    async function getAllNews() {
        const allNews = await fetch(SothicAPI.news_get_all.url, {
            method: SothicAPI.news_get_all.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page })
        }).then(res => res.json())

        if(allNews.success) {
            setNewsData(allNews?.data)
            setTotalPages(allNews.pages)
        }

        if(allNews.error) {
            console.log(allNews)
        }
    }

    useEffect(() => {
        getAllNews()
    }, [page])
    return (
        <div className='sothic__news'>
            <div className='sothic__news-breadcrumb flex items-center'>
                <div className='sothic__news-title'>
                    <h2>Tin tức</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,&nbsp;
                        luctus nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>
                </div>
            </div>
            <div className='sothic__news-content'>
                <div className='sothic__news-container'>
                    { newsData.length > 0 && newsData.map((news, index) => {
                        return (
                            <Link
                                to={'/news/' + news.newsLink}
                                className='sothic__news-content-item'
                                key={news.newsTitle + index}
                            >
                                <img
                                    src={news.newsImage[0].url}
                                    alt={`Sothic Studio - ${ news.newsTitle }`}
                                />
                                <h3 className='uppercase'>{ news.newsTitle }</h3>
                                <p>{ news.newsSumary }</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
            { totalPages > 1 &&
                <div className='pagination white flex items-center justify-center'>
                    { totalPages > 5 &&
                        <>
                            <button disabled={page === 1} onClick={() => setPage(1)}>Trang đầu</button>
                            <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>
                                {'<'}
                            </button>
                        </>
                    }
                    { getPageNumber(page, totalPages).map((p, index) => (
                        p === '...' ? (
                            <span key={index} style={{ margin: '0 5px' }}>...</span>
                        ) : (
                            <button
                                key={index}
                                onClick={() => setPage(p)}
                                className={p === page ? 'page-active' : ''}
                            >{p}</button>
                        )
                    ))}
                    { totalPages > 5 &&
                        <>
                            <button disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)}>
                                {'>'}
                            </button>
                            <button disabled={page === totalPages} onClick={() => setPage(totalPages)}>Trang cuối</button>
                        </>
                    }
                    
                </div>
            }
        </div>
    )
}

export default News