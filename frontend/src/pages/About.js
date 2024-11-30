import React from 'react'
import '../Assets/Css/about.css'
import SothicPJImage1 from '../Assets/Projects/Sothic-project-image-1.jpg'
import iconTick from '../Assets/Icons/icon-tick.png'
import { Link } from 'react-router-dom'
import SothicPJImage2 from '../Assets/Projects/Sothic-project-image-2.jpg'
import SothicPJImage3 from '../Assets/Projects/Sothic-project-image-3.jpg'
// import iconCall from '../../Assets/Icons/icon-call.png'
import Video from '../Assets/Video/video.png'

const About = () => {
    return (
        <div className='sothic__about'>
            <div className='sothic__about-review'>
                <div className='sothic__about-review-image'>
                    <img src={SothicPJImage1} alt='Sothic Studio Review' />
                </div>
                <div className='sothic__about-review-content'>
                    <h3 className='sothic__about-subtitle uppercase'>
                        WHO WE ARE
                    </h3>
                    <h2 className='sothic__about-title uppercase'>
                        WE ARE PERFECT TEAM FOR HOME INTERIOR DECORATION
                    </h2>
                    <p className='sothic__about-description'>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium&nbsp;
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo&nbsp;
                        inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        <br />
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut&nbsp;
                        odit aut fugit, sed quia consequuntur magni dolores eos&nbsp;
                        qui ratione voluptatemsequi nesciunt.
                    </p>
                    <ul className='sothic__about-list'>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 1' width={20} />
                            Flexible Time
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 2' width={20} />
                            Flexible Time
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 3' width={20} />
                            Perfect Work
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 4' width={20} />
                            Perfect Work
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 5' width={20} />
                            Client Priority
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 6' width={20} />
                            Client Priority
                        </li>
                    </ul>
                </div>
            </div>

            <div className='sothic__about-partner'>
                <div className='sothic__about-partner-content'>
                    <h3 className='sothic__about-subtitle uppercase'>
                        WHO WE ARE
                    </h3>
                    <h2 className='sothic__about-title uppercase'>
                        WE HAVE PRIORITY FOR CAN CREATE DREAM HOME DESIGN
                    </h2>
                    <p className='sothic__about-description'>
                        Sed ut perspiciatis unde omnis iste natus error sit&nbsp;
                        voluptatem accusantium doloremque laudantium, totam rem&nbsp;
                        aperiam, eaque ipsa quae ab illo inventore veritatis et&nbsp;
                        quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                    <Link to={''} title='' className='uppercase text-center'>Portfolio</Link>
                </div>
                <div className='sothic__about-partner-image'>
                    <img src={SothicPJImage1} alt='Sothic Studio Partner 1' />
                    <img src={SothicPJImage2} alt='Sothic Studio Partner 2' />
                    <img src={SothicPJImage3} alt='Sothic Studio Partner 3' />
                </div>
            </div>

            {/* <div className='sothic__about-slogan'>
                <div className='sothic__about-slogan-left'>
                    <div className='sothic__about-slogan-image'>
                        <img src={SothicPJImage3} alt='Sothic Studio Slogan' className='' />
                    </div>
                    <div className='sothic__about-slogan-call'>
                        <img src={iconCall} width={45} alt='Sothic Studio Slogan icon' />
                        <h4 className='uppercase bold'>Call Us Now</h4>
                        <h3 className='light'>{'( +84 )'} 123 456 789</h3>
                    </div>
                </div>
                <div className='sothic__about-slogan-right'>
                    <h2 className='uppercase'>
                        "WORK HARD & GREAT QUALITY IS MY PRIORITY"
                    </h2>
                </div>
            </div> */}

            <div className='sothic__about-why'>
                <div className='sothic__about-why-video'>
                    <img src={Video} alt='Sothic Studio about video' />
                </div>
                <div className='sothic__about-why-content'>
                    <h3 className='sothic__about-subtitle uppercase'>
                        WHO WE ARE
                    </h3>
                    <h2 className='sothic__about-title uppercase'>
                        WE ARE PERFECT TEAM FOR HOME INTERIOR DECORATION
                    </h2>
                    <p className='sothic__about-description'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit&nbsp;
                        tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>
                    <ul className='sothic__about-list'>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 1' width={20} />
                            Flexible Time
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 2' width={20} />
                            Flexible Time
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 3' width={20} />
                            Perfect Work
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 4' width={20} />
                            Perfect Work
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 5' width={20} />
                            Client Priority
                        </li>
                        <li className='flex items-center justify-start'>
                            <img src={iconTick} alt='Sothic Studio icon 6' width={20} />
                            Client Priority
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default About