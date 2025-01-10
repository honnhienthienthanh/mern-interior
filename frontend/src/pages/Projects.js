import React, { useEffect, useState } from 'react'
import '../Assets/Css/projects.css'
import ProjectItem from '../components/ProjectItem'
import SothicAPI from '../common/SothicApi'

const Projects = () => {
    const [project, setProject] = useState([])
    const fetchAllProject = async() => {
        const fetchAllProject = await fetch(SothicAPI.all_project.url)
        const dataResponse = await fetchAllProject.json()

        setProject(dataResponse?.data || [])
        if(dataResponse.error) {
            console.log('All Project', dataResponse)
        }
    }

    useEffect(() => {
        fetchAllProject()
    }, [])
    return (
        <div className='sothic__project'>
            <div className='flex items-start justify-start'>
                { project.map((proj, index) => {
                    return (
                        <ProjectItem
                            image={proj?.projectImages[0]}
                            name={proj?.projectName}
                            category={proj?.category}
                            uri={proj?.projectUri}
                            key={proj?.projectName + index}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Projects