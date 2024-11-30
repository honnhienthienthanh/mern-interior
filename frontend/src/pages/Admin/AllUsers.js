import React, { useEffect, useState } from 'react'
import '../../Assets/Css/allusers.css'
import SothicAPI from '../../common/SothicApi'
import moment from 'moment'
import ChangeUserRole from '../../components/ChangeUserRole'

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [userRolePopup, setUserRolePopup] = useState(false)
    const [updateUser, setUpdateUser] = useState({
        _id: '',
        name: '',
        email: '',
        role: ''
    })

    const fetchGetAllUsers = async() => {
        const fetchData = await fetch(SothicAPI.get_all_users.url, {
            method: SothicAPI.get_all_users.method,
            credentials: 'include'
        })

        const responseData = await fetchData.json()

        if(responseData.success) {
            setAllUsers(responseData.data)
        }

        if(responseData.error) {
            console.log('AllUsers', responseData)
        }
    }

    useEffect(() => {
        fetchGetAllUsers()
    }, [])
    
    console.log('AllUsers - Users Data', allUsers)
    return (
        <div className='sothic__admin-all-users'>
            <h2>All User</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { allUsers.map((user, index) => {
                        return (
                            <tr key={user + index}>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td>{moment(user?.createdAt).format('l')}</td>
                                <td>
                                    <div className='flex items-center justify-center'>
                                        <button
                                            className='flex items-center justify-center'
                                            onClick={() => {
                                                setUserRolePopup(true)
                                                setUpdateUser(user)
                                            }}
                                        >
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </button>
                                        <button className='flex items-center justify-center'>
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            { userRolePopup &&
                <ChangeUserRole
                    userId={updateUser._id}
                    name={updateUser.name}
                    email={updateUser.email}
                    role={updateUser.role}
                    refresh={fetchGetAllUsers}
                    onClose={() => setUserRolePopup(false)}
                />
            }
        </div>
    )
}

export default AllUsers