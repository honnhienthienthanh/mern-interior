import React, { useEffect, useState } from 'react'
import '../Assets/Css/home.css'
import HomeAdvisory from '../components/HomeAdvisory'
import SothicAPI from '../common/SothicApi'
import { notification } from '../store/NotificationContext'

const Home = () => {
    const [showAdvisory, setShowAdvisory] = useState(false)

    useEffect(() => {
        const advisory = setTimeout(() => {
            setShowAdvisory(true)
        }, 7000)

        return () => clearTimeout(advisory)
    }, [])

    useEffect(() => {
        let nextDom = document.getElementById('next')
        let prevDom = document.getElementById('prev')
        let carouselDom = document.querySelector('.carousel')
        let listItemDom = document.querySelector('.carousel .list')
    
        let timeRunning = 3000
        let runTimeOut
        let interval
        interval = setInterval(() => {
            nextDom.onclick()
        }, 10000)
        function showSlider(type) {
            let itemSlider = document.querySelectorAll('.carousel .list .item')

            if(type === 'next') {
                listItemDom.appendChild(itemSlider[0])
                carouselDom.classList.add('next')
            } else {
                let positionLastItem = itemSlider.length - 1
                listItemDom.prepend(itemSlider[positionLastItem])
                carouselDom.classList.add('prev')
            }

            clearTimeout(runTimeOut)
            clearInterval(interval)
            runTimeOut = setTimeout(() => {
                carouselDom.classList.remove('next')
                carouselDom.classList.remove('prev')
            }, timeRunning)
        }
        
        nextDom.onclick = function() {
            showSlider('next')
            interval = setInterval(() => {
                nextDom.onclick()
            }, 10000)
        }

        prevDom.onclick = function() {
            showSlider('prev')
            interval = setInterval(() => {
                nextDom.onclick()
            }, 10000)
        }

        return () => clearInterval(interval)
    }, [])

    const [slideData, setSlideData] = useState([])

    async function getAllSlide() {
        const allSlide = await fetch(SothicAPI.home_get_slide.url, {
            method: SothicAPI.home_get_slide.method
        }).then(res => res.json())

        if(allSlide.success) {
            setSlideData(allSlide.data)
        }

        if(allSlide.error) {
            notification.error(allSlide.message)
        }
    }

    useEffect(() => {
        getAllSlide()
    }, [])
    
    return (
        <div className='sothic__home'>
            <div className='carousel'>
                {/* List items */}
                <div className='list'>
                    { slideData.map((slide, index) => {
                        return (
                            <div className='item' key={slide?.slideTitle + index}>
                                <img src={'http://localhost:8080/' + slide?.slideImage} alt='' />
                                <div className='content'>
                                    <p className='author'>{slide?.slideAuthor}</p>
                                    <p className='title'>{slide?.slideTitle}</p>
                                    <p className='topic'>{slide?.slideCategory}</p>
                                    <p className='des'>
                                        {slide?.slideDescription}
                                    </p>
                                    {/* <div className='buttons'>
                                        <button>SEE MORE</button>
                                        <button>SUBSCRIBE</button>
                                    </div> */}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Arrows */}
                <div className='arrows'>
                    <button id='prev'>&nbsp;</button>
                    <button id='next'>&nbsp;</button>
                </div>

                <div className='time'></div>
            </div>
            { showAdvisory &&
                <HomeAdvisory
                    showStatus={showAdvisory}
                    onClose={() => setShowAdvisory(false)}
                />
            }
            <button
                className={ showAdvisory ?
                    'design-request flex items-center justify-center design-hide' :
                    'design-request flex items-center justify-center design-show'
                }
                onClick={() => setShowAdvisory(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#5f6368"><path d="M200-200h360v-200h200v-360H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v400L600-120H200Zm80-280v-80h200v80H280Zm0-160v-80h400v80H280Zm-80 360v-560 560Z"/></svg>
            </button>
        </div>
    )
}

export default Home