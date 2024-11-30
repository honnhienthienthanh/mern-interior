import React from 'react'
import '../Assets/Css/displayimage.css'

const DisplayImage = ({ imgUrl, onClose }) => {
    return (
        <div className='sothic__full-screen-image flex items-center justify-center'>
            <button className='sothic__popup-exit' onClick={onClose}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
            <div className='sothic__popup-bg' onClick={onClose}></div>
            <img src={imgUrl} alt='' />
        </div>
    )
}

export default DisplayImage