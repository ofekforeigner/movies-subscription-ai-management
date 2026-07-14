import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const MOVIES_URL = 'http://localhost:3000/movies'

const MovieFormComp = (props) => {
    const [mode, setMode] = useState('');

    const [name, setName] = useState('')
    const [genres, setGenres] = useState([])
    const [image, setImage] = useState('')
    const [premiered, setPremiered] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = () => {
            setName(props.movie.name)
            setGenres(props.movie.genres)
            setImage(props.movie.image)
            setPremiered(props.movie.premiered.split("T")[0])
        }
        if (props.movie) {
            fetchData()
            setMode('edit')
        }

    }, [props.movie])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mode === 'edit') {
            const movieObj = {
                ...props.movie,
                name,
                genres,
                image,
                premiered
            }
            await axios.put(`${MOVIES_URL}/${props.movie._id}`, movieObj)
            dispatch({ type: 'EDIT_MOVIE', payload: movieObj })
        } else {
            const movieObj = { name, genres, image, premiered }
            const { data: movieData } = await axios.post(MOVIES_URL, movieObj)
            movieObj._id = movieData._id
            dispatch({ type: 'ADD_MOVIE', payload: movieObj })

        }
        navigate("/movies/all-movies")
    }

    return (
        <div style={{ border: '2px solid black', width: '50%', padding: '5px' }}>
            <form onSubmit={handleSubmit}>
                <strong><label>Name : {' '}
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label></strong><br />
                <strong><label>Genres : {' '}
                    <input type="text" value={genres} onChange={(e) => setGenres(e.target.value.includes(',') ? e.target.value.split(',') : [e.target.value])} />
                </label></strong><br />
                <strong><label>Image URL : {' '}
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                </label></strong><br />
                <strong><label>Premiered : {' '}
                    <input type="date" value={premiered} onChange={(e) => setPremiered(e.target.value)} />
                </label></strong><br />
                <br /><br />
                <button type='submit'>{mode === 'edit' ? 'Update' : 'Save'}</button>
                <button><Link to='/movies/all-movies'>Cancel</Link></button>
            </form>
        </div >
    )
}

export default MovieFormComp