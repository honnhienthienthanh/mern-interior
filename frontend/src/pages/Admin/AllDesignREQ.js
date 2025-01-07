import React, { useEffect, useState } from 'react'
import '../../Assets/Css/homeslider.css'
import SothicAPI from '../../common/SothicApi'
import { notification } from '../../store/NotificationContext'
import SlideUpload from '../../components/SlideUpload'

const AllDesignREQ = () => {
    const [slideData, setSlideData] = useState([])
    const [showAddSlide, setShowAddSlide] = useState(false)

    async function getAllSlide() {
        const allSlide = await fetch(SothicAPI.home_get_slide.url, {
            method: SothicAPI.home_get_slide.method
        }).then(res => res.json())

        if(allSlide.success) {
            setSlideData(allSlide.data)
        }

        if(allSlide.error) {
            notification.error(allSlide.message)
        }
    }

    useEffect(() => {
        getAllSlide()
    }, [])
    return (
        <div className='sothic__all-news'>
            <div className='sothic__all-news-header flex items-center justify-between'>
                <h1>Quản lý slider trang chủ</h1>
            </div>
            { slideData.length > 0 && slideData.map((slide, index) => {
                return (
                    <div className='sothic__admin-home-item flex items-center' key={slide?.slideTitle + index}>
                        <div className='sothic__admin-home-item-content'>
                            <p>Họ và tên: { slide?.slideAuthor }</p>
                            <p>Số điện thoại: { slide?.slideTitle }</p>
                            <p>Email: { slide?.slideCategory }</p>
                            <p>Diện tích thi công: { slide?.slideCategory }</p>
                            <p>Số tầng thi công: { slide?.slideCategory }</p>
                            <p>Địa chỉ thi công: { slide?.slideCategory }</p>
                            <p>Phong cách thiết kế: { slide?.slideCategory }</p>
                            <p>Yêu cầu chi tiết:</p>
                            <p>{ slide?.slideDescription }</p>
                        </div>
                        <div className='sothic__admin-home-item-action flex flex-col justify-center'>
                            <button
                                type='button'
                                className='user-delete'
                            >
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </div>
                    </div>
                )
            })}
            
            { showAddSlide &&
                <SlideUpload
                    showStatus={showAddSlide}
                    STClose={() => setShowAddSlide(false)}
                    STRefresh={getAllSlide}
                />
            }
        </div>
    )
}

export default AllDesignREQ