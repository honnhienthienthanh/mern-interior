import React, { useEffect, useState } from 'react'
import '../Assets/Css/news.css'
import { Link } from 'react-router-dom'
import SothicAPI from '../common/SothicApi'

const Careers = () => {
    const [careersData, setCareersData] = useState([])

    async function getAllCareers() {
        const allCareers = await fetch(SothicAPI.careers_get_all.url)
        const responseData = await allCareers.json()

        if(responseData.success) {
            setCareersData(responseData?.data)
        }

        if(responseData.error) {
            console.log(responseData)
        }
    }

    useEffect(() => {
        getAllCareers()
    }, [])
    return (
        <div className='sothic__news'>
            <div className='sothic__news-breadcrumb flex items-center'>
                <div className='sothic__news-title'>
                    <h2>Tuyển dụng</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,&nbsp;
                        luctus nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>
                </div>
            </div>
            <div className='sothic__news-content'>
                <div className='sothic__news-container'>
                    { careersData.length > 0 && careersData.map((careers, index) => {
                        return (
                            <Link
                                to={'/careers/' + careers.careersLink}
                                className='sothic__news-content-item'
                                key={careers.careersTitle + index}
                            >
                                <img
                                    src={process.env.REACT_APP_BACKEND_URI + '/uploads/' + careers.careersImage}
                                    alt={`Sothic Studio - ${ careers.careersTitle }`}
                                />
                                <h3 className='uppercase'>{ careers.careersTitle }</h3>
                                <p>{ careers.careersSumary }</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Careers