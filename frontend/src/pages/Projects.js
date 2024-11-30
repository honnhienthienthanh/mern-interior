import React, { useEffect, useState } from 'react'
import '../Assets/Css/projects.css'
import ProjectItem from '../components/ProjectItem'
// import SothicPJImage1 from '../Assets/Projects/Sothic-project-image-1.jpg'
// import SothicPJImage2 from '../Assets/Projects/Sothic-project-image-2.jpg'
// import SothicPJImage3 from '../Assets/Projects/Sothic-project-image-3.jpg'
// import SothicPJImage4 from '../Assets/Projects/Sothic-project-image-4.jpg'
// import SothicPJImage5 from '../Assets/Projects/Sothic-project-image-5.jpg'
// import SothicPJImage6 from '../Assets/Projects/Sothic-project-image-6.jpg'
// import SothicPJImage7 from '../Assets/Projects/Sothic-project-image-7.jpg'
// import SothicPJImage8 from '../Assets/Projects/Sothic-project-image-8.jpg'
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
                {/* <ProjectItem image={SothicPJImage2} />
                <ProjectItem image={SothicPJImage3} />
                <ProjectItem image={SothicPJImage4} />
                <ProjectItem image={SothicPJImage5} />
                <ProjectItem image={SothicPJImage6} />
                <ProjectItem image={SothicPJImage7} />
                <ProjectItem image={SothicPJImage8} /> */}
            </div>
        </div>
    )
}

export default Projects