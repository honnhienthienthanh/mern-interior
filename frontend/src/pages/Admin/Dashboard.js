import React from 'react'

const Dashboard = () => {
    return (
        <div className='sothic__dashboard flex items-center justify-center'>
            <div
                className='sothic__dashboard-header flex items-center justify-center'
                style={{minHeight: '100vh', maxHeight: '100vh', width: '100%', paddingBottom: '100px'}}
            >
                <h1 style={{color: '#000'}}>
                    Chào mừng đến với Sothic Studio Admin 1.0
                </h1>
            </div>
        </div>
    )
}

export default Dashboard