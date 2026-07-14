import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import MovieComp from '../components/MovieComp';
import Unauthorized from './Unauthorized';
import { Navigate } from 'react-router-dom';

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('')

    const user = sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : '';
    const moviesStore = useSelector((state) => state.movies);

    useEffect(() => {
        const fetchData = () => {
            if (search !== '') {
                const filteredMovies = moviesStore.filter((movie) =>
                    movie.name.toLowerCase().includes(search.toLowerCase())
                );

                setMovies(filteredMovies);
            } else {
                setMovies(moviesStore);
            }
        }
        fetchData()
    }, [moviesStore, search])

    return (
        <div >
            Find Movie : <input type='text' onChange={(e) => setSearch(e.target.value)} />

            {
                user?.permissions.includes('View Movies') ?
                    movies.map((movie, index) =>
                        <MovieComp key={index} movie={movie} />
                    )
                    :
                    <Navigate to="/unauthorized" replace />
            }
        </div>
    )
}

export default AllMovies