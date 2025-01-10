import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../Assets/Css/newsdetails.css'
import SothicAPI from '../common/SothicApi'
import moment from 'moment'

const NewsDetails = () => {
    const [newsDetails, setNewsDetails] = useState()
    const { title } = useParams()
    const navigate = useNavigate()

    async function getNews() {
        const newsDetails = await fetch(SothicAPI.news_details.url, {
            method: SothicAPI.news_details.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newsLink: title })
        })
        const responseData = await newsDetails.json()

        if(responseData.success) {
            setNewsDetails(responseData.data[0])
        }

        if(responseData.error) {
            console.log(responseData)
            navigate('/oops')
        }
    }

    useEffect(() => {
        getNews()
    }, [title])

    return (
        <div className='sothic__news-details flex justify-center'>
            { newsDetails && (
                <div className='sothic__news-details-container flex flex-col'>
                    <img
                        src={process.env.REACT_APP_BACKEND_URI + '/uploads/' + newsDetails?.newsImage}
                        alt={'Sothic Studio - ' + newsDetails?.newsTitle}
                    />
                    <h2>{ newsDetails?.newsTitle }</h2>
                    <p className='flex items-center'>
                        <span className='bold'>{ newsDetails?.author?.name }</span>
                        <span>-</span>
                        <span className='italic'>{ moment(newsDetails?.createdAt).format('lll') }</span>
                    </p>
                    <p className='sothic__news-details-content'>{ newsDetails.newsContent }</p>
                </div>
            )}
        </div>
    )
}

export default NewsDetails