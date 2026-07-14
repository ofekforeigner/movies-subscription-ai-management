import React from 'react'
import MovieFormComp from '../components/MovieFormComp'
import { Navigate } from 'react-router-dom';

const AddMovie = () => {

    const user = sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : '';

    return (
        <div>
            <h3>Add Movie</h3>
            {user?.permissions.includes('Create Movies') ?
                <MovieFormComp />
                :
                <Navigate to="/unauthorized" replace />
            }
        </div>
    )
}

export default AddMovie