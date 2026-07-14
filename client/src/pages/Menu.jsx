import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const user = sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : '';

const Menu = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login')
    }

    return (
        <div>
            <button><Link to='/movies'>Movies</Link></button>{' '}
            <button><Link to='/members'>Subscriptions</Link></button>{' '}
            {
                user?.username === 'admin' &&
                <button><Link to='/user-management'>User Management</Link></button>
            }
            {' '}<button onClick={handleLogout}>Log Out</button>{' '}
            <span style={{ float: 'right' }}>{user && 'Hello: ' + user?.first_name + ' ' + user?.last_name}</span>
        </div>
    )
}

export default Menu