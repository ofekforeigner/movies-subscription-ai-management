import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieFormComp from '../components/MovieFormComp'
import axios from 'axios'

const MOVIES_URL = 'http://localhost:3000/movies'

const EditMovie = () => {
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
            <h3>Edit Movie : {movie?.name}</h3>
            <MovieFormComp movie={movie} />
        </div>
    )
}

export default EditMovie