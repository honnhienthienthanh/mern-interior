import React, { useState } from 'react'
import STCategory from '../common/STCategory'
import SothicAPI from '../common/SothicApi'
import { notification } from '../store/NotificationContext'

const SlideEdit = ({ token, showStatus, prevData, STClose, STRefresh }) => {
    const [show, setShow] = useState(showStatus)
    const [slideData, setSlideData] = useState({
        _id: prevData?._id,
        slideAuthor: prevData?.slideAuthor,
        slideTitle: prevData?.slideTitle,
        slideCategory: prevData?.slideCategory,
        slideImage: prevData?.slideImage || [],
        slideDescription: prevData?.slideDescription,
        replaceImage: []
    })

    function inputData(e) {
        const { name, value } = e.target
        setSlideData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function onClose() {
        setShow(false)

        const timeOut = setTimeout(() => {
            STClose()
        }, 500)

        return () => clearTimeout(timeOut)
    }

    async function handleEditSlide(e) {
        e.preventDefault()
        const newSlide = new FormData()

        newSlide.set('_id', slideData._id)
        newSlide.set('slideAuthor', slideData.slideAuthor)
        newSlide.set('slideTitle', slideData.slideTitle)
        newSlide.set('slideCategory', slideData.slideCategory)
        newSlide.set('slideDescription', slideData.slideDescription)
        newSlide.set('slideImage', JSON.stringify(slideData.slideImage))

        if(typeof slideData.slideImage === 'object') {
            newSlide.set('replaceImage', slideData.replaceImage[0])
        } else {
            newSlide.set('replaceImage', slideData.replaceImage)
        }

        const addSlide = await fetch(SothicAPI.home_update.url, {
            method: SothicAPI.home_update.method,
            headers: { token },
            body: newSlide
        }).then(res => res.json())

        if(addSlide.success) {
            const timeOut = setTimeout(() => {
                notification.success(addSlide.message)
                onClose()
                STRefresh()
            }, 3000)

            return () => clearTimeout(timeOut)
        }

        if(addSlide.error) {
            const timeOut = setTimeout(() => {
                notification.error(addSlide.message)
                onClose()
                STRefresh()
            }, 3000)

            return () => clearTimeout(timeOut)
        }
    }
    return (
        <div
            className={`sothic__admin-new-slide sothic__popup sothic__popup-admin zoom 
                flex items-center justify-center ${show ? 'show' : ''}`
            }
        >
            <div className='sothic__background' onClick={onClose}></div>
            <form
                className='sothic__admin-form sothic__popup-admin-box flex flex-col'
                onSubmit={handleEditSlide}
            >
                <h1>Cập nhật Slide</h1>
                <label htmlFor='slideAuthor'>Tác giả</label>
                <input
                    type='text'
                    name='slideAuthor'
                    id='slideAuthor'
                    placeholder='Vui lòng nhập tên tác giả'
                    required
                    value={slideData.slideAuthor}
                    onChange={inputData}
                />

                <label htmlFor='slideTitle'>Tiêu đề</label>
                <input
                    type='text'
                    name='slideTitle'
                    id='slideTitle'
                    placeholder='Vui lòng nhập tiêu đề'
                    required
                    value={slideData.slideTitle}
                    onChange={inputData}
                />

                <label htmlFor='slideCategory'>Phong cách</label>
                <div className='select-box'>
                    <select
                        name='slideCategory'
                        id='slideCategory'
                        required
                        value={slideData.slideCategory}
                        onChange={inputData}
                    >
                        <option value={''}>CHỌN PHONG CÁCH</option>
                        { STCategory.map((cate, index) => {
                            return (
                                <option key={cate.name + index} value={cate.value}>
                                    {cate.name}
                                </option>
                            )
                        })}
                    </select>
                    <span></span>
                </div>

                <label htmlFor='slideImage'>Ảnh</label>
                <label
                    htmlFor='slideImage'
                    className='sothic__admin-form-image flex flex-col items-center justify-center'
                >
                    <span className="material-symbols-outlined">
                        cloud_upload
                    </span>
                    <p className='text-center'>Tải ảnh Slide</p>
                    <input
                        type='file'
                        name='slideImage'
                        id='slideImage'
                        onChange={e => setSlideData(prev => {
                            return {
                                ...prev,
                                replaceImage: e.target.files
                            }
                        })}
                    />
                </label>

                <label htmlFor='slideDescription'>Mô tả</label>
                <textarea
                    name='slideDescription'
                    id='slideDescription'
                    required
                    value={slideData.slideDescription}
                    onChange={inputData}
                ></textarea>
                <button className='admin-submit'>Cập nhật</button>
            </form>
        </div>
    )
}

export default SlideEdit