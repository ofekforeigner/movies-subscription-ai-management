import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const USERS_URL = 'http://localhost:3001/users'

const UserComp = ({ user }) => {
    const dispatch = useDispatch()

    const handleDelete = async () => {
        if (user.username === 'admin') {
            alert('Admin cannot be deleted')
        } else {
            dispatch({ type: 'DELETE_USER', payload: user });
            await axios.delete(`${USERS_URL}/${user.id}`)
            alert('User deleted!');
        }
    }

    return (
        <div style={{ border: '2px solid black', width: '40%', padding: '5px', margin: '10px' }}>
            <strong>Name :</strong> {user.first_name + ' ' + user.last_name} <br />
            <strong>User Name :</strong> {user.username} <br />
            <strong>Session Timeout (Minutes) :</strong> {user.session_timeout} <br />
            <strong>Created date :</strong> {user.created_date} <br />
            <strong>Permissions :</strong> {user.permissions.join(", ")} <br />
            <br />
            <button><Link to='/user-management/edit-user' state={{ user: user }}>Edit</Link></button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default UserComp