import React, { useState } from 'react'
import projectCategory from '../helpers/projectCategory'
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import SothicAPI from '../common/SothicApi'
import createUrl from '../helpers/createUrl'
import { notification } from '../store/NotificationContext'

const AdminEditProject = ({ token, prevData, onClose, refresh }) => {
    const [projectData, setProjectData] = useState({
        ...prevData,
        projectName: prevData?.projectName,
        category: prevData?.category,
        customer: prevData?.customer,
        floorArea: prevData?.floorArea,
        numberOfFloors: prevData?.numberOfFloors,
        projectAddress: prevData?.projectAddress,
        projectImages: prevData?.projectImages || [],
        projectUri: prevData?.projectUri
    })

    const [showImage, setShowImage] = useState(false)
    const [fullScreen, setFullScreen] = useState('')

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setProjectData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
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

        setProjectData(prev => {
            return {
                ...prev,
                projectUri: createUrl(prev.projectName)
            }
        })

        const fetchProject = await fetch(SothicAPI.project_update.url, {
            method: SothicAPI.project_update.method,
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(projectData)
        })

        const responseData = await fetchProject.json()

        if(responseData.success) {
            notification.success('Sửa dự án thành công!')
            refresh()
            onClose()
        }

        if(responseData.error) {
            notification.error('Đã có lỗi xảy ra. Vui lòng kiểm tra lại!')
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
            <div className='sothic__upload-project-form sothic__upload-form flex flex-col'>
                <h2>Sửa dự án</h2>
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
                    
                    <label htmlFor='sothic__edit-customer'>Tên khách hàng:</label>
                    <input
                        id='sothic__edit-customer'
                        name='customer'
                        type='text'
                        placeholder='Nhập tên khách hàng'
                        value={projectData.customer}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    />
                    
                    <label htmlFor='sothic__edit-floorArea'>Diện tích sàn:</label>
                    <input
                        id='sothic__edit-floorArea'
                        name='floorArea'
                        type='number'
                        placeholder='Nhập diện tích sàn'
                        value={projectData.floorArea}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    />
                    
                    <label htmlFor='sothic__edit-numberOfFloors'>Số tầng:</label>
                    <input
                        id='sothic__edit-numberOfFloors'
                        name='numberOfFloors'
                        type='text'
                        placeholder='Nhập số tầng'
                        value={projectData.numberOfFloors}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    />
                    
                    <label htmlFor='sothic__edit-projectAddress'>Địa điểm:</label>
                    <input
                        id='sothic__edit-projectAddress'
                        name='projectAddress'
                        type='text'
                        placeholder='Nhập địa điểm thi công'
                        value={projectData.projectAddress}
                        onChange={handleOnChange}
                        className='bottom-10'
                        required
                    />

                    <label htmlFor='sothic__edit-projectImages'>Ảnh dự án:</label>
                    <label
                        htmlFor='sothic__edit-projectImages'
                        className='sothic__upload-image flex flex-col items-center justify-center'
                    >
                        <span className="material-symbols-outlined">
                            cloud_upload
                        </span>
                        <p>Upload Project Images</p>
                        <input
                            id='sothic__edit-projectImages'
                            name='projectImages'
                            type='file'
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
                    <button className='sothic__upload-submit'>Sửa dự án</button>
                </form>
            </div>
            { showImage &&
                <DisplayImage onClose={() => setShowImage(false)} imgUrl={fullScreen} />
            }
        </div>
    )
}

export default AdminEditProject