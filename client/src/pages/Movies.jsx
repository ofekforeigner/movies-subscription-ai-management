import React from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

const Movies = () => {
    const { pathname } = useLocation()

    return (
        <div style={{ border: '2px solid black', padding: '5px' }}>
            <h2>Movies</h2> <br />
            <button><Link to='/movies/all-movies'>All Movies</Link></button>{' '}
            <button><Link to='/movies/add-movie'>Add Movie</Link></button>{' '}
            <br />
            <br />
            {pathname === '/movies' ? <Navigate to="/movies/all-movies" replace /> : <Outlet />}
        </div>
    )
}

export default Movies