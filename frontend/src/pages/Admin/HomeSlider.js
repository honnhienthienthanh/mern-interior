import React, { useEffect, useState } from 'react'
import '../../Assets/Css/homeslider.css'
import SothicAPI from '../../common/SothicApi'
import { notification } from '../../store/NotificationContext'
import SlideUpload from '../../components/SlideUpload'

const HomeSlider = () => {
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
                <button
                    className='sothic__all-news-add flex items-center'
                    onClick={() => setShowAddSlide(true)}
                >
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    <h2>Thêm slide mới</h2>
                </button>
            </div>
            { slideData.length > 0 ? (
                slideData.map((slide, index) => {
                    return (
                        <div className='sothic__admin-home-item flex items-center' key={slide?.slideTitle + index}>
                            <div className='sothic__admin-home-item-img'>
                                <img src={process.env.REACT_APP_BACKEND_URI + '/' + slide?.slideImage} width={250} alt='' />
                            </div>
                            <div className='sothic__admin-home-item-content'>
                                <h5>{ slide?.slideAuthor }</h5>
                                <h3>{ slide?.slideTitle }</h3>
                                <h4>{ slide?.slideCategory }</h4>
                                <p>{ slide?.slideDescription }</p>
                            </div>
                            <div className='sothic__admin-home-item-action flex flex-col justify-center'>
                                <button
                                    type='button'
                                    className='user-edit'
                                >
                                    <span className="material-symbols-outlined">
                                        edit
                                    </span>
                                </button>
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
                })
            ) : (
                <div
                    className='flex items-center justify-center'
                    style={{ padding: '30px 0'}}
                >
                    Hiện không có slide nào để hiển thị!
                </div>
            )}
            
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

export default HomeSlider