import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SothicApi from '../common/SothicApi'
import '../Assets/Css/login.css'
import { notification } from '../store/NotificationContext'

const Login = ({ setToken }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setLoginData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const fetchLogin = await fetch(SothicApi.login.url, {
            method: SothicApi.login.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })

        const responseData = await fetchLogin.json()

        if(responseData.success) {
            setToken(responseData.data)
            localStorage.setItem('token', responseData.data)
            notification.success(responseData.message)
        }

        if(responseData.error) {
            notification.error(responseData.message)
        }
    }
    return (
        <div className='sothic__login flex'>
            <div className='sothic__login-box'>
                <h1>Sothic Studio</h1>
                <h2>Let's start the mission</h2>
                <form id='sothicLogin' className='flex flex-col' onSubmit={handleSubmit}>
                    <div className='sothic__input-box flex flex-col'>
                        <input
                            id='sothicUser'
                            type='text'
                            name='email'
                            value={loginData.email}
                            onChange={handleOnChange}
                            required
                        />
                        <label htmlFor='sothicUser'>Email</label>
                    </div>
                    <div className='sothic__input-box flex flex-col'>
                        <input
                            id='sothicPass'
                            type='password'
                            name='password'
                            value={loginData.password}
                            onChange={handleOnChange}
                            required
                        />
                        <label htmlFor='sothicPass'>Password</label>
                    </div>
                    <button type='submit'>Login</button>
                    <p>
                        Already have account?&nbsp;
                        <Link to={'/register'} title='Sothic Register'>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login