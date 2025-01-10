import React, { useEffect, useState } from 'react'
import '../Assets/Css/news.css'
import { Link } from 'react-router-dom'
import SothicAPI from '../common/SothicApi'

const News = () => {
    const [newsData, setNewsData] = useState([])

    async function getAllNews() {
        const allNews = await fetch(SothicAPI.news_get_all.url)
        const responseData = await allNews.json()

        if(responseData.success) {
            setNewsData(responseData?.data)
        }

        if(responseData.error) {
            console.log(responseData)
        }
    }

    useEffect(() => {
        getAllNews()
    }, [])
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
                                    src={process.env.REACT_APP_BACKEND_URI + '/uploads/' + news.newsImage}
                                    alt={`Sothic Studio - ${ news.newsTitle }`}
                                />
                                <h3 className='uppercase'>{ news.newsTitle }</h3>
                                <p>{ news.newsSumary }</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default News