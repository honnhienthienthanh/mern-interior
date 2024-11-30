import React, { useEffect } from 'react'
import '../Assets/Css/home.css'
import SothicPJImage1 from '../Assets/Projects/Sothic-project-image-1.jpg'
import SothicPJImage2 from '../Assets/Projects/Sothic-project-image-2.jpg'
import SothicPJImage3 from '../Assets/Projects/Sothic-project-image-3.jpg'

const Home = () => {
    useEffect(() => {
        let nextDom = document.getElementById('next')
        let prevDom = document.getElementById('prev')
        let carouselDom = document.querySelector('.carousel')
        let listItemDom = document.querySelector('.carousel .list')
        let thumbnailDom = document.querySelector('.carousel .thumbnail')
    
        let timeRunning = 3000
        let runTimeOut
        function showSlider(type) {
            let itemSlider = document.querySelectorAll('.carousel .list .item')
            let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item')

            if(type === 'next') {
                listItemDom.appendChild(itemSlider[0])
                thumbnailDom.appendChild(itemThumbnail[0])
                carouselDom.classList.add('next')
            } else {
                let positionLastItem = itemSlider.length - 1
                listItemDom.prepend(itemSlider[positionLastItem])
                thumbnailDom.prepend(itemThumbnail[positionLastItem])
                carouselDom.classList.add('prev')
            }

            clearTimeout(runTimeOut)
            runTimeOut = setTimeout(() => {
                carouselDom.classList.remove('next')
                carouselDom.classList.remove('prev')
            }, timeRunning)
        }
        
        nextDom.onclick = function() {
            showSlider('next')
        }

        prevDom.onclick = function() {
            showSlider('prev')
        }

        const interval = setInterval(() => {
            nextDom.onclick()
        }, 10000)

        return () => clearInterval(interval)
    }, [])
    
    return (
        <div className='sothic__home'>
            <div className='carousel'>
                {/* List items */}
                <div className='list'>
                    <div className='item'>
                        <img src={SothicPJImage1} alt='' />
                        <div className='content'>
                            <p className='author'>LUNDEV</p>
                            <p className='title'>DESIGN SLIDER</p>
                            <p className='topic'>ANIMAL</p>
                            <p className='des'>
                                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
                            </p>
                            <div className='buttons'>
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <img src={SothicPJImage2} alt='' />
                        <div className='content'>
                            <p className='author'>LUNDEV</p>
                            <p className='title'>DESIGN SLIDER</p>
                            <p className='topic'>ANIMAL</p>
                            <p className='des'>
                                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <div className='buttons'>
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                    <div className='item'>
                        <img src={SothicPJImage3} alt='' />
                        <div className='content'>
                            <p className='author'>LUNDEV</p>
                            <p className='title'>DESIGN SLIDER</p>
                            <p className='topic'>ANIMAL</p>
                            <p className='des'>
                                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <div className='buttons'>
                                <button>SEE MORE</button>
                                <button>SUBSCRIBE</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail */}
                <div className='thumbnail sm:hidden'>
                    <div className='item'>
                        <img src={SothicPJImage1} alt='' />
                        <div className='content'>
                            <p className='title'>
                                Name Slider
                            </p>
                            <p className='des'>
                                Description
                            </p>
                        </div>
                    </div>
                    <div className='item'>
                        <img src={SothicPJImage2} alt='' />
                        <div className='content'>
                            <p className='title'>
                                Name Slider
                            </p>
                            <p className='des'>
                                Description
                            </p>
                        </div>
                    </div>
                    <div className='item'>
                        <img src={SothicPJImage3} alt='' />
                        <div className='content'>
                            <p className='title'>
                                Name Slider
                            </p>
                            <p className='des'>
                                Description
                            </p>
                        </div>
                    </div>
                </div>

                {/* Arrows */}
                <div className='arrows'>
                    <button id='prev'>{'<'}</button>
                    <button id='next'>{'>'}</button>
                </div>

                <div className='time'></div>
            </div>
        </div>
    )
}

export default Home