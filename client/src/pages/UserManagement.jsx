import React from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'

const UserManagement = () => {

    const { pathname } = useLocation()

    return (
        <div style={{ border: '2px solid black', padding: '5px' }}>
            <h2>Users</h2> <br />
            <button><Link to='/user-management/users'>All Users</Link></button>{' '}
            <button><Link to='/user-management/add-user'>Add User</Link></button>{' '}
            <br />
            <br />
            {pathname === '/user-management' ? <Navigate to="/user-management/users" replace /> : <Outlet />}

        </div>
    )
}

export default UserManagement