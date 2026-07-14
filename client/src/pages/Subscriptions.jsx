import React from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'

const Subscriptions = () => {
    const { pathname } = useLocation()

    return (
        <div style={{ border: '2px solid black', padding: '5px' }}>
            <h2>Subscriptions</h2> <br />
            <button><Link to='/members/all-members'>All Members</Link></button>{' '}
            <button><Link to='/members/add-member'>Add Member</Link></button>{' '}
            <br />
            <br />
            {pathname === '/members' ? <Navigate to="/members/all-members" replace /> : <Outlet />}
        </div>
    )
}

export default Subscriptions