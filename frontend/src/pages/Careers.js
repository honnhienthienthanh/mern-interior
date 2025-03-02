import React, { useEffect, useState } from 'react'
import '../Assets/Css/news.css'
import { Link } from 'react-router-dom'
import SothicAPI from '../common/SothicApi'
import getPageNumber from '../helpers/getPageNumber'

const Careers = () => {
    const [careersData, setCareersData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    async function getAllCareers() {
        const allCareers = await fetch(SothicAPI.careers_get_all.url, {
            method: SothicAPI.careers_get_all.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page })
        }).then(res => res.json())

        if(allCareers.success) {
            setCareersData(allCareers?.data)
            setTotalPages(allCareers.pages)
        }

        if(allCareers.error) {
            console.log(allCareers)
        }
    }

    useEffect(() => {
        getAllCareers()
    }, [page])
    return (
        <div className='sothic__news'>
            <div className='sothic__news-breadcrumb flex items-center'>
                <div className='sothic__news-title'>
                    <h2>Tuyển dụng</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,&nbsp;
                        luctus nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>
                </div>
            </div>
            <div className='sothic__news-content'>
                <div className='sothic__news-container'>
                    { careersData.length > 0 && careersData.map((careers, index) => {
                        return (
                            <Link
                                to={'/careers/' + careers.careersLink}
                                className='sothic__news-content-item'
                                key={careers.careersTitle + index}
                            >
                                <img
                                    src={careers.careersImage[0].url}
                                    alt={`Sothic Studio - ${ careers.careersTitle }`}
                                />
                                <h3 className='uppercase'>{ careers.careersTitle }</h3>
                                <p>{ careers.careersSumary }</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
            { totalPages > 1 &&
                <div className='pagination white flex items-center justify-center'>
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

export default Careers