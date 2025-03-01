import React, { useState } from 'react'
import '../Assets/Css/uploadproject.css'
import projectCategory from '../helpers/projectCategory'
import DisplayImage from './DisplayImage'
import SothicAPI from '../common/SothicApi'
import createUrl from '../helpers/createUrl'
import { notification } from '../store/NotificationContext'
import imageTobase64 from '../helpers/imageTobase64'

const UploadProject = ({ token, onClose, refresh }) => {
    const [projectData, setProjectData] = useState({
        projectName: '',
        category: '',
        customer: '',
        floorArea: '',
        numberOfFloors: '',
        projectAddress: '',
        projectUri: ''
    })

    const [projectImages, setProjectImages] = useState([])
    const [images, setImages] = useState([])

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

    function handleUploadImage(e) {
        setProjectImages(prev => [...prev, ...e.target.files])
        const allImage = [...e.target.files]

        allImage.forEach(async(image) => {
            const newImage = await imageTobase64(image)
            setImages(prev => [...prev, newImage])
        })
    }

    const handleDeleteImage = async(index) => {
        const newProjectImage = [...projectImages]
        newProjectImage.splice(index, 1)

        setProjectImages([...newProjectImage])

        const newImages = [...images]
        newImages.splice(index, 1)

        setImages([...newImages])
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = new FormData()

        data.append('projectName', projectData?.projectName)
        data.append('category', projectData?.category)
        data.append('customer', projectData?.customer)
        data.append('floorArea', projectData?.floorArea)
        data.append('numberOfFloors', projectData?.numberOfFloors)
        data.append('projectAddress', projectData?.projectAddress)
        data.append('projectUri', projectData?.projectUri)

        projectImages.forEach(image => {
            data.append('projectImages', image)
        })

        const fetchProject = await fetch(SothicAPI.project_upload.url, {
            method: SothicAPI.project_upload.method,
            headers: { token },
            body: data
        }).then(res => res.json())

        if(fetchProject.success) {
            notification.success(fetchProject.message)
            setProjectImages([])
            setImages([])
            refresh()
            onClose()
        }

        if(fetchProject.error) {
            notification.error(fetchProject.message)
            onClose()
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
                        { images.length > 1 ? (
                            images.map((image, index) => {
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
                            images.length > 0 ? (
                                <div className='sothic__list-image-item'>
                                    <img
                                        src={images}
                                        width={80}
                                        height={80}
                                        alt=''
                                        onClick={() => {
                                            setFullScreen(images)
                                            setShowImage(true)
                                        }}
                                    />
                                    <span
                                        className="material-symbols-outlined"
                                        onClick={() => handleDeleteImage(0)}
                                    >
                                        delete
                                    </span>
                                </div>
                            ) : (
                                <p>* Vui lòng tải lên ảnh của dự án</p>
                            )
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