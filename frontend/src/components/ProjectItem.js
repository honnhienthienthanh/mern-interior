import React from 'react'
import '../Assets/Css/projectitem.css'
import { Link } from 'react-router-dom'

const ProjectItem = ({ image, name, category, uri }) => {
    return (
        <div className='sothic__project-item'>
            <Link to={`/project-details/${uri}`} title=''>
                <img src={image} alt='' />
                <div className='sothic__project-item-title'>
                    <h3>{name}</h3>
                    <span>{category}</span>
                </div>
            </Link>
        </div>
    )
}

export default ProjectItem