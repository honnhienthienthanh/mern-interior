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
                                    <div className='buttons'>
                                        <button>SEE MORE</button>
                                        <button>SUBSCRIBE</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Arrows */}
                <div className='arrows'>
                    <button id='prev'>{'<'}</button>
                    <button id='next'>{'>'}</button>
                </div>

                <div className='time'></div>
            </div>
            { showAdvisory &&
                <HomeAdvisory
                    showStatus={showAdvisory}
                    onClose={() => setShowAdvisory(false)}
                />
            }
        </div>
    )
}

export default Home