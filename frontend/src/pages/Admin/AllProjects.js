import React, { useEffect, useState } from 'react'
import '../../Assets/Css/allprojects.css'
import UploadProject from '../../components/AdminUploadProject'
import SothicAPI from '../../common/SothicApi'
import AdminEditProject from '../../components/AdminEditProject'
import AdminConfirmBox from '../../components/AdminConfirmBox'
import { notification } from '../../store/NotificationContext'
import { useOutletContext } from 'react-router-dom'

const AllProjects = () => {
    const [addProject, setAddProject] = useState(false)
    const [allProjects, setAllProjects] = useState([])
    const [editProject, setEditProject] = useState(false)
    const [editData, setEditData] = useState({
        _id: '',
        projectName: '',
        category: '',
        customer: '',
        floorArea: '',
        numberOfFloors: '',
        projectAddress: '',
        projectImages: []
    })

    const token = useOutletContext()

    const fetchAllProject = async() => {
        const fetchAllProject = await fetch(SothicAPI.all_project.url)
        const dataResponse = await fetchAllProject.json()

        if(dataResponse.success) {
            setAllProjects(dataResponse?.data || [])
        }

        if(dataResponse.error) {
            notification.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllProject()
    }, [])

    const [delStatus, setDelStatus] = useState(false)
    const [projId, setProjId] = useState({
        _id: ''
    })

    async function deleteProject() {
        const delProj = await fetch(SothicAPI.project_delete.url, {
            method: SothicAPI.project_delete.method,
            headers: { token },
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projId)
        }).then(res => res.json())

        if(delProj.success) {
            notification.success(delProj.message)
        }

        if(delProj.error) {
            notification.error(delProj.message)
        }
    }
    return (
        <div className='sothic__all-project'>
            <div className='sothic__all-project-header flex items-center justify-between'>
                <h1>Danh sách dự án</h1>
                <button
                    className='sothic__all-project-add flex items-center'
                    onClick={() => setAddProject(true)}
                >
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    <h2>Thêm dự án mới</h2>
                </button>
            </div>
            <div className='sothic__all-project-show flex items-start'>
                { allProjects.length > 0 ? (
                    allProjects.map((proj, index) => {
                        return (
                            <div className='sothic__all-project-item' key={proj.projectName + index}>
                                <img
                                    src={ proj?.projectImages[0] }
                                    alt={ proj.projectName }
                                />
                                <h2>{ proj.projectName }</h2>
                                <h3>{ proj.category }</h3>
                                <div className='sothic__all-project-action flex items-center'>
                                    <button
                                        className='flex items-center justify-center'
                                        onClick={() => {
                                            setEditProject(true)
                                            setEditData(proj)
                                        }}
                                    >
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </button>
                                    <button
                                        className='flex items-center justify-center'
                                        onClick={() => {
                                            setProjId({ _id: proj?._id })
                                            setDelStatus(true)
                                        }}
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
                        Hiện không có dự án nào để hiển thị!
                    </div>
                )}
            </div>
            { addProject &&
                <UploadProject
                    token={token}
                    onClose={() => setAddProject(false)}
                    refresh={fetchAllProject}
                />
            }
            { editProject &&
                <AdminEditProject
                    token={token}
                    prevData={editData}
                    onClose={() => setEditProject(false)}
                    refresh={fetchAllProject}
                />
            }
            { delStatus &&
                <AdminConfirmBox
                    showStatus={delStatus}
                    message={'Bạn chắc chắn muốn xóa dự án này chứ?'}
                    userAction={deleteProject}
                    STClose={() => setDelStatus(false)}
                    refresh={fetchAllProject}
                />
            }
        </div>
    )
}

export default AllProjects