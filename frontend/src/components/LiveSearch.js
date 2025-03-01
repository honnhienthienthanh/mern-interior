import React, { useEffect, useState } from 'react'
import SothicAPI from '../common/SothicApi'
import { notification } from '../store/NotificationContext'
import { Link } from 'react-router-dom'

const LiveSearch = () => {
    const [projects, setProjects] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredProjects, setFilteredProjects] = useState([])
    const [visibleCount, setVisibleCount] = useState(5)
    const [showSearch, setShowSearch] = useState(false)
    const [loading, setLoading] = useState(false)

    async function getProjects() {
        try {
            const projects = await fetch(SothicAPI.all_project.url).then(res => res.json())
            setProjects(projects.data)
        } catch(err) {
            notification.error(err.message)
        }
    }

    useEffect(() => {
        getProjects()

        document.addEventListener('click', (e) => {
            if(e.target.name === 'sothic-search') {
                setShowSearch(true)
            }  else {
                setShowSearch(false)
            }
        })
    }, [])

    function getSimilarityScore(name, keyword) {
        const normalizedName = name.toLowerCase()
        const normalizedKeyword = keyword.toLowerCase()

        if(normalizedName === normalizedKeyword) return 3
        if(normalizedName.startsWith(normalizedKeyword)) return 2
        if(normalizedName.includes(normalizedKeyword)) return 1

        return 0
    }

    const containsAnyCharacter = (name, keyword) => {
        const normalizedName = name.toLowerCase()
        const characters = keyword.toLowerCase().split("")
        return characters.some((char) => normalizedName.includes(char))
    }

    useEffect(() => {
        if(searchTerm.length > 0) {
            setLoading(false)
        }
        if(!searchTerm) {
            setFilteredProjects(projects.slice(0, 5))
            return
        }

        const results = projects.map((proj) => ({
            ...proj,
            score: getSimilarityScore(proj?.projectName, searchTerm),
        })).filter((proj) => proj.score > 0 || containsAnyCharacter(proj?.projectName, searchTerm))
        .sort((a, b) => b.score - a.score)

        setFilteredProjects(results)
        
        if(searchTerm.length === 0) {
            setLoading(false)
        }
    }, [searchTerm, projects])

    return (
        <div className='sothic__header-search flex items-center justify-center xs:hidden'>
            <input
                type='text'
                id='sothic-search'
                name='sothic-search'
                placeholder='Search here...'
                className='sothic__search-box'
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
            />
            {showSearch &&
                <div className='sothic__header-search-results flex flex-col'>
                    {loading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : ( filteredProjects.length > 0 ? (
                            <>
                                { filteredProjects.slice(0, visibleCount).map(project => (
                                    <Link
                                        to={'/project-details/' + project?.projectUri}
                                        key={project?._id}
                                        className='flex items-center'
                                    >
                                        <img
                                            src={project?.projectImages[0]?.url}
                                            alt={project?.projectName}
                                        />
                                        <p>
                                            {project.projectName}
                                        </p>
                                    </Link>
                                ))}
                                { visibleCount < filteredProjects.length && (
                                    <button onClick={() => setVisibleCount(visibleCount + 5)}>
                                        Xem thêm
                                    </button>
                                )}
                            </>
                        ) : (
                            searchTerm.length > 0 ? (
                                <p>Không có nội dung phù hợp...</p>
                            ) : (
                                <p>Nhập nội dung tìm kiếm...</p>
                            )
                        )
                    )}
                </div>
            }
        </div>
    )
}

export default LiveSearch