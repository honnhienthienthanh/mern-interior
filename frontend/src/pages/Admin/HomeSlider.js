import React from 'react'

const HomeSlider = () => {
    return (
        <div className='sothic__home-slider'>
            <div className='sothic__home-slider-header flex items-center justify-between'>
                <h1>Quản lý slide ảnh trên Trang chủ</h1>
                <button
                    className='sothic__all-news-add flex items-center'
                    // onClick={() => setAddProject(true)}
                >
                    <span className="material-symbols-outlined">
                        add
                    </span>
                    <h2>Thêm ảnh mới</h2>
                </button>
            </div>
            <div className='sothic__home-slider-list'></div>
        </div>
    )
}

export default HomeSlider