import React, { useState } from 'react'
import STCategory from '../common/STCategory'
import SothicAPI from '../common/SothicApi'
import { notification } from '../store/NotificationContext'

const SlideUpload = ({ showStatus, STClose, STRefresh}) => {
    const [show, setShow] = useState(showStatus)
    const [slideData, setSlideData] = useState({
        slideAuthor: '',
        slideTitle: '',
        slideCategory: '',
        slideImage: [],
        slideDescription: ''
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

    async function handleAddSlide(e) {
        e.preventDefault()
        const newSlide = new FormData()

        newSlide.set('slideAuthor', slideData.slideAuthor)
        newSlide.set('slideTitle', slideData.slideTitle)
        newSlide.set('slideCategory', slideData.slideCategory)
        newSlide.set('slideImage', slideData.slideImage[0])
        newSlide.set('slideDescription', slideData.slideDescription)

        const addSlide = await fetch(SothicAPI.home_slide_upload.url, {
            method: SothicAPI.home_slide_upload.method,
            credentials: 'include',
            body: newSlide
        }).then(res => res.json())

        if(addSlide.success) {
            notification.success(addSlide.message)
            const timeOut = setTimeout(() => {
                onClose()
                STRefresh()
            }, 3000)

            return () => clearTimeout(timeOut)
        }

        if(addSlide.error) {
            notification.error(addSlide.message)
            const timeOut = setTimeout(() => {
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
                onSubmit={handleAddSlide}
            >
                <h1>Thêm Slide mới</h1>
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
                        required
                        onChange={e => setSlideData(prev => {
                            return {
                                ...prev,
                                slideImage: e.target.files
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
                <button className='admin-submit'>Thêm Slide</button>
            </form>
        </div>
    )
}

export default SlideUpload