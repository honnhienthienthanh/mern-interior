import React, { useState } from 'react'
import '../Assets/Css/register.css'
import { Link, useNavigate } from 'react-router-dom'
import SothicAPI from '../common/SothicApi'

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(userData.password === userData.confirmPassword) {
            const fetchRegister = await fetch(SothicAPI.register.url, {
                method: SothicAPI.register.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
    
            const responseData = await fetchRegister.json()
            
            if(responseData.success) {
                console.log(responseData)
                navigate('/login')
            }

            if(responseData.error) {
                console.log(responseData)
            }
        } else {
            console.log('Please check password and confirm password!')
        }
    }
    return (
        <div className='sothic__register flex'>
            <div className='sothic__register-box'>
                <h1>Sothic Studio</h1>
                <h2>Take the first step</h2>
                <form id='sothicRegister' className='flex flex-col' onSubmit={handleSubmit}>
                    <div className='sothic__input-box flex flex-col'>
                        <input
                            id='sothicName'
                            type='text'
                            name='name'
                            value={userData.name}
                            onChange={handleOnChange}
                            required
                        />
                        <label htmlFor='sothicName'>Full Name</label>
                    </div>
                    <div className='sothic__input-box flex flex-col'>
                        <input
                            id='sothicEmail'
                            type='email'
                            name='email'
                            value={userData.email}
                            onChange={handleOnChange}
                            required
                        />
                        <label htmlFor='sothicEmail'>Email</label>
                    </div>
                    <div className='sothic__input-box flex flex-col'>
                        <input
                            id='sothicPassword'
                            type='password'
                            name='password'
                            value={userData.password}
                            onChange={handleOnChange}
                            required
                        />
                        <label htmlFor='sothicPassword'>Password</label>
                    </div>
                    <div className='sothic__input-box flex flex-col'>
                        <input
                            id='sothicConfirmPassword'
                            type='password'
                            name='confirmPassword'
                            value={userData.confirmPassword}
                            onChange={handleOnChange}
                            required
                        />
                        <label htmlFor='sothicConfirmPassword'>Confirm Password</label>
                    </div>
                    <button type='submit'>Register</button>
                    <p>
                        Already have account?&nbsp;
                        <Link to={'/login'} title='Sothic Login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register