import React, { useEffect, useState } from 'react'
import '../Assets/Css/projects.css'
import ProjectItem from '../components/ProjectItem'
import SothicAPI from '../common/SothicApi'
import getPageNumber from '../helpers/getPageNumber'

const Projects = () => {
    const [project, setProject] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchAllProject = async() => {
        const fetchAllProject = await fetch(`${SothicAPI.all_project.url}`, {
            method: SothicAPI.all_project.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page })
        })
        const dataResponse = await fetchAllProject.json()

        if(dataResponse.success) {
            setProject(dataResponse?.data || [])
            setTotalPages(dataResponse.pages)
        }
        if(dataResponse.error) {
            console.log('All Project', dataResponse)
        }
    }

    useEffect(() => {
        fetchAllProject()
    }, [page])

    return (
        <div className='sothic__project'>
            <div className='flex items-start justify-start'>
                { project.map((proj, index) => {
                    return (
                        <ProjectItem
                            image={proj?.projectImages[0]?.url}
                            name={proj?.projectName}
                            category={proj?.category}
                            uri={proj?.projectUri}
                            key={proj?.projectName + index}
                        />
                    )
                })}
            </div>
            { totalPages > 1 &&
                <div className='pagination flex items-center justify-center'>
                    { totalPages > 5 &&
                        <>
                            <button disabled={page === 1} onClick={() => setPage(1)}>Trang đầu</button>
                            <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>
                                {'<'}
                            </button>
                        </>
                    }
                    { getPageNumber(page, totalPages).map((p, index) => (
                        p === '...' ? (
                            <span key={index} style={{ margin: '0 5px' }}>...</span>
                        ) : (
                            <button
                                key={index}
                                onClick={() => setPage(p)}
                                className={p === page ? 'page-active' : ''}
                            >{p}</button>
                        )
                    ))}
                    { totalPages > 5 &&
                        <>
                            <button disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)}>
                                {'>'}
                            </button>
                            <button disabled={page === totalPages} onClick={() => setPage(totalPages)}>Trang cuối</button>
                        </>
                    }
                    
                </div>
            }
        </div>
    )
}

export default Projects