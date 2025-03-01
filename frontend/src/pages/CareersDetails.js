import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../Assets/Css/newsdetails.css'
import SothicAPI from '../common/SothicApi'
import moment from 'moment'

const CareersDetails = () => {
    const [careersDetails, setCareersDetails] = useState()
    const { title } = useParams()
    const navigate = useNavigate()

    async function getCareers() {
        const getDetails = await fetch(SothicAPI.careers_details.url, {
            method: SothicAPI.careers_details.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ careersLink: title })
        })
        const responseData = await getDetails.json()

        if(responseData.success) {
            setCareersDetails(responseData.data[0])
        }

        if(responseData.error) {
            console.log(responseData)
            navigate('/oops')
        }
    }

    useEffect(() => {
        getCareers()
    }, [title])

    return (
        <div className='sothic__news-details flex justify-center'>
            { careersDetails && (
                <div className='sothic__news-details-container flex flex-col'>
                    <img
                        src={careersDetails?.careersImage[0].url}
                        alt={'Sothic Studio - ' + careersDetails?.careersTitle}
                    />
                    <h2>{ careersDetails?.careersTitle }</h2>
                    <p className='flex items-center'>
                        <span className='bold'>{ careersDetails?.author?.name }</span>
                        <span>-</span>
                        <span className='italic'>{ moment(careersDetails?.createdAt).format('lll') }</span>
                    </p>
                    <p className='sothic__news-details-content'>{ careersDetails?.careersContent }</p>
                </div>
            )}
        </div>
    )
}

export default CareersDetails