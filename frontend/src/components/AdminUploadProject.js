import React, { useState } from 'react'
import '../Assets/Css/uploadproject.css'
import projectCategory from '../helpers/projectCategory'
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import SothicAPI from '../common/SothicApi'
import createUrl from '../helpers/createUrl'
import { notification } from '../store/NotificationContext'

const UploadProject = ({ onClose, refresh }) => {
    const [projectData, setProjectData] = useState({
        projectName: '',
        category: '',
        customer: '',
        floorArea: '',
        numberOfFloors: '',
        projectAddress: '',
        projectImages: [],
        projectUri: ''
    })

    const [showImage, setShowImage] = useState(false)
    const [fullScreen, setFullScreen] = useState('')

    const handleOnChange = (e) => {
        const { name, value } = e.target
        if(name === 'projectName') {
            setProjectData(prev => {
                return {
                    ...prev,
                    [name]: value,
                    projectUri: createUrl(value)
                }
            })
        } else {
            setProjectData(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }

    const handleUploadImage = async(e) => {
        const file = e.target.files[0]
        console.log('File', file)

        const uploadImageCloudinary = await uploadImage(file)

        setProjectData(prev => {
            return {
                ...prev,
                projectImages: [ ...prev.projectImages, uploadImageCloudinary.url ]
            }
        })

        console.log('Upload Image', uploadImageCloudinary)
    }

    const handleDeleteImage = async(index) => {
        const newProjectImage = [...projectData.projectImages]
        newProjectImage.splice(index, 1)

        setProjectData(prev => {
            return {
                ...prev,
                projectImages: [...newProjectImage]
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        console.log('Uri - ', projectData.projectUri)

        const fetchProject = await fetch(SothicAPI.project_upload.url, {
            method: SothicAPI.project_upload.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        })

        const responseData = await fetchProject.json()

        if(responseData.success) {
            notification.success('Thêm mới dự án thành công!')
            refresh()
            onClose()
        }

        if(responseData.error) {
            notification.error('Đã có lỗi. Vui lòng kiểm tra lại!')
        }
    }
    return (
        <div className='sothic__upload flex items-center justify-center'>
            <button className='sothic__popup-exit' onClick={onClose}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
            <div className='sothic__popup-bg' onClick={onClose}></div>
            <div className='sothic__upload-project sothic__upload-form flex flex-col'>
                <h2>Thêm dự án mới</h2>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='sothic__projectName'>Tên dự án:</label>
                    <input
                        id='sothic__projectName'
                        name='projectName'
                        type='text'
                        placeholder='Nhập tên dự án'
                        value={projectData.projectName}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    />
                    
                    <label htmlFor='sothic__category'>Loại hình thiết kế:</label>
                    <select
                        id='sothic__category'
                        name='category'
                        value={projectData.category}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    >
                        <option value=''>Chọn loại hình thiết kế</option>
                        { projectCategory.map((cate, index) => {
                            return (
                                <option value={cate.value} key={cate.value + index}>
                                    { cate.label }
                                </option>
                            )
                        })}
                    </select>
                    
                    <label htmlFor='sothic__customer'>Tên khách hàng:</label>
                    <input
                        id='sothic__customer'
                        name='customer'
                        type='text'
                        placeholder='Nhập tên khách hàng'
                        value={projectData.customer}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    />
                    
                    <label htmlFor='sothic__floorArea'>Diện tích sàn:</label>
                    <input
                        id='sothic__floorArea'
                        name='floorArea'
                        type='number'
                        placeholder='Nhập diện tích sàn'
                        value={projectData.floorArea}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    />
                    
                    <label htmlFor='sothic__numberOfFloors'>Số tầng:</label>
                    <input
                        id='sothic__numberOfFloors'
                        name='numberOfFloors'
                        type='text'
                        placeholder='Nhập số tầng'
                        value={projectData.numberOfFloors}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    />
                    
                    <label htmlFor='sothic__projectAddress'>Địa điểm:</label>
                    <input
                        id='sothic__projectAddress'
                        name='projectAddress'
                        type='text'
                        placeholder='Nhập địa điểm thi công'
                        value={projectData.projectAddress}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    />

                    <label htmlFor='projectImages'>Ảnh dự án:</label>
                    <label
                        htmlFor='sothic__projectImages'
                        className='sothic__upload-image flex flex-col items-center justify-center'
                    >
                        <span className="material-symbols-outlined">
                            cloud_upload
                        </span>
                        <p>Upload Project Images</p>
                        <input
                            id='sothic__projectImages'
                            name='projectImages'
                            type='file'
                            multiple
                            onChange={handleUploadImage}
                        />
                    </label>
                    <div className='sothic__list-image flex items-center'>
                        { projectData?.projectImages[0] ? (
                            projectData.projectImages.map((image, index) => {
                                return (
                                    <div className='sothic__list-image-item' key={index + 5}>
                                        <img
                                            src={image}
                                            width={80}
                                            height={80}
                                            alt=''
                                            onClick={() => {
                                                setFullScreen(image)
                                                setShowImage(true)
                                            }}
                                        />
                                        <span
                                            className="material-symbols-outlined"
                                            onClick={() => handleDeleteImage(index)}
                                        >
                                            delete
                                        </span>
                                    </div>
                                )
                            })
                        ) : (
                            <p>* Vui lòng tải lên ảnh của dự án</p>
                        )}
                    </div>
                    <button className='sothic__upload-submit'>Thêm dự án</button>
                </form>
            </div>
            { showImage &&
                <DisplayImage onClose={() => setShowImage(false)} imgUrl={fullScreen} />
            }
        </div>
    )
}

export default UploadProject