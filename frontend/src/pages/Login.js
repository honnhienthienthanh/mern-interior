import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SothicApi from '../common/SothicApi'
import Context from '../context/Context'
import '../Assets/Css/login.css'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../store/userSlice'
import { notification } from '../store/NotificationContext'

const Login = () => {
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { fetchUserDetails } = useContext(Context)

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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })

        const responseData = await fetchLogin.json()

        if(responseData.success) {
            notification.success(responseData.message)
            console.log('Login - Login success', responseData.data)
            dispatch(setUserDetails(responseData.data))
            const timeOut = setTimeout(() => {
                navigate('/admin')
                fetchUserDetails()
            }, 3000)
            return () => clearTimeout(timeOut)
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