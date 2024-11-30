import React, { useEffect, useState } from 'react'
import '../Assets/Css/projectdetails.css'
import { Link, useParams } from 'react-router-dom'
import SothicPJImage1 from '../Assets/Projects/Sothic-project-image-1.jpg'
import SothicAPI from '../common/SothicApi'

const ProjectDetails = () => {
    const [detailsData, setDetailsData] = useState({
        projectName: '',
        category: '',
        customer: '',
        floorArea: '',
        numberOfFloors: '',
        projectAddress: '',
        projectImages: []
    })

    const params = useParams()

    const getProjectDetails = async() => {
        const getData = await fetch(SothicAPI.project_details.url, {
            method: SothicAPI.project_details.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectUri: params.url
            })
        })

        const responseData = await getData.json()

        setDetailsData(responseData?.data[0])

        if(responseData.error) {
            console.log('Project Details - ', responseData)
        }
    }

    useEffect(() => {
        getProjectDetails()
    }, [params])
    return (
        <div className='sothic__prj-details'>
            <div
                className='sothic__prj-details-intro flex items-center justify-center'
                style={{ backgroundImage: `url(${SothicPJImage1})` }}
            >
                <h2 className='text-center'>
                    {detailsData?.projectName}
                </h2>
            </div>
            <div className='sothic__prj-details-info'>
                <div className='sothic__prj-details-container flex items-start justify-between'>
                    <div className='sothic__prj-details-info-item flex flex-col items-start'>
                        <p className='flex items-start justify-between'>
                            <span className='bold'>Dự án:</span>
                            <span className='text-right'>{detailsData?.projectName}</span>
                        </p>
                        <p className='flex items-start justify-between'>
                            <span className='bold'>Khách hàng:</span>
                            <span className='text-right'>{detailsData?.customer}</span>
                        </p>
                        <p className='flex items-start justify-between'>
                            <span className='bold'>Loại hình thiết kế:</span>
                            <span className='text-left capitalize'>{detailsData?.category}</span>
                        </p>
                        <p className='flex items-start justify-between'>
                            <span className='bold'>Diện tích sàn:</span>
                            <span className='text-left'>{detailsData?.floorArea}m2</span>
                        </p>
                    </div>
                    <div className='sothic__prj-details-info-item flex flex-col items-start'>
                        <p className='flex items-start justify-between'>
                            <span className='bold'>Số tầng:</span>
                            <span className='text-left'>{detailsData?.numberOfFloors}</span>
                        </p>
                        <p className='flex items-start justify-between'>
                            <span className='bold'>Địa điểm:</span>
                            <span className='text-left'>{detailsData?.projectAddress}</span>
                        </p>
                    </div>
                    </div>
            </div>
            <div className='sothic__prj-details-image'>
                <div className='sothic__prj-details-container'>
                    <h3 className='text-center uppercase'>
                        Hình ảnh dự án
                    </h3>
                    <div className='flex items-center justify-start'>
                        {
                            detailsData?.projectImages.map((image, index) => {
                                return (
                                    <img
                                        src={image}
                                        alt={`Sothic Studio - ${detailsData.projectName} ${index}`}
                                        key={detailsData.projectName + index}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='sothic__prj-details-related'>
                <h3 className='text-center uppercase'>Những dự án liên quan</h3>
                <div className='sothic__carousel'>
                    <div className='sothic__carousel-container'>
                        <div className='sothic__carousel-wrap flex'>
                            <Link className='sothic__carousel-item'>
                                <img src={SothicPJImage1} alt='' />
                                <h4>Tên dự án 1</h4>
                            </Link>
                            <Link className='sothic__carousel-item'>
                                <img src={SothicPJImage1} alt='' />
                                <h4>Tên dự án 1</h4>
                            </Link>
                            <Link className='sothic__carousel-item'>
                                <img src={SothicPJImage1} alt='' />
                                <h4>Tên dự án 1</h4>
                            </Link>
                            <Link className='sothic__carousel-item'>
                                <img src={SothicPJImage1} alt='' />
                                <h4>Tên dự án 1</h4>
                            </Link>
                            <Link className='sothic__carousel-item'>
                                <img src={SothicPJImage1} alt='' />
                                <h4>Tên dự án 1</h4>
                            </Link>
                            <Link className='sothic__carousel-item'>
                                <img src={SothicPJImage1} alt='' />
                                <h4>Tên dự án 1</h4>
                            </Link>
                            <Link className='sothic__carousel-item'>
                                <img src={SothicPJImage1} alt='' />
                                <h4>Tên dự án 1</h4>
                            </Link>
                            <Link className='sothic__carousel-item'>
                                <img src={SothicPJImage1} alt='' />
                                <h4>Tên dự án 1</h4>
                            </Link>
                        </div>
                    </div>
                    <button className='sothic__carousel-prev'>&nbsp;</button>
                    <button className='sothic__carousel-next'>&nbsp;</button>
                </div>
            </div>
            <div className='sothic__prj-details-tags'>
                <div className='sothic__prj-details-container'>
                    <h3 className='uppercase'>Tags</h3>
                    <div className='sothic__prj-details-tags-list flex items-center'>
                        <Link to={''} title=''>căn hộ</Link>
                        <Link to={''} title=''>thiết kế hiện đại</Link>
                        <Link to={''} title=''>cải tạo nội thất</Link>
                        <Link to={''} title=''>không gian mở</Link>
                        <Link to={''} title=''>căn hộ</Link>
                        <Link to={''} title=''>thiết kế hiện đại</Link>
                        <Link to={''} title=''>cải tạo nội thất</Link>
                        <Link to={''} title=''>không gian mở</Link>
                        <Link to={''} title=''>căn hộ</Link>
                        <Link to={''} title=''>thiết kế hiện đại</Link>
                        <Link to={''} title=''>cải tạo nội thất</Link>
                        <Link to={''} title=''>không gian mở</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails