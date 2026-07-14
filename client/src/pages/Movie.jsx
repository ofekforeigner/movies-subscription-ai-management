import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MovieComp from '../components/MovieComp';

const MOVIES_URL = 'http://localhost:3000/movies'

const Movie = () => {

    const [movie, setMovie] = useState()

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const { data: movieData } = await axios.get(`${MOVIES_URL}/${id}`)
            setMovie(movieData)
        }
        fetchData()
    }, [id])


    return (
        <div>
            <MovieComp movie={movie} />
        </div>
    )
}

export default Movie