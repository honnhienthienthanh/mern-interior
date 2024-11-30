import React, { useEffect, useState } from 'react'
import '../../Assets/Css/allprojects.css'
import UploadProject from '../../components/AdminUploadProject'
import SothicAPI from '../../common/SothicApi'
import AdminEditProject from '../../components/AdminEditProject'

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

    const fetchAllProject = async() => {
        const fetchAllProject = await fetch(SothicAPI.all_project.url)
        const dataResponse = await fetchAllProject.json()

        setAllProjects(dataResponse?.data || [])

        if(dataResponse.success) {
            console.log('All Project', dataResponse)
        }

        if(dataResponse.error) {
            console.log('All Project', dataResponse)
        }
    }

    useEffect(() => {
        fetchAllProject()
    }, [])
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
                { allProjects.map((proj, index) => {
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
                                <button className='flex items-center justify-center'>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            { addProject &&
                <UploadProject onClose={() => setAddProject(false)} refresh={fetchAllProject} />
            }
            { editProject &&
                <AdminEditProject
                    prevData={editData}
                    onClose={() => setEditProject(false)}
                    refresh={fetchAllProject}
                />
            }
        </div>
    )
}

export default AllProjects