/* eslint-disable react/prop-types */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SubsWatchedComp from './SubsWatchedComp';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import '../App.css'

const MOVIES_URL = 'http://localhost:3000/movies'


const MovieComp = ({ movie }) => {
    const user = sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : '';

    const [response, setResponse] = useState('');
      const [loading, setLoading] = useState(false);


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = async () => {
        if (user?.permissions.includes('Delete Movies')) {
            dispatch({ type: 'DELETE_MOVIE', payload: movie });
            await axios.delete(`${MOVIES_URL}/${movie._id}`)
            alert('Movie deleted!');
        } else {
            navigate('/unauthorized')
        }
    }

    const handleClick = async (e) => {
         // 1. Start loading immediately on click
        setLoading(true); 
        e.preventDefault();

         try {
      // 2. Call your backend route that handles the OpenAI request
        const res = await fetch('http://localhost:3001/openai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({prompt: `Give me a short description about the series ${movie.name}`}),
        });

        const data = await res.json();
             setResponse(data.reply);  
         } catch (error) {
      console.error("Error fetching from OpenAI:", error);
    } finally {
      // 3. Stop loading whether the API request succeeds or fails
      setLoading(false); 
    }     
    }

    return (
        <div style={{ border: '2px solid black', width: '40%', padding: '5px', margin: '5px' }}>
            <strong><button style={{ cursor: "pointer", color: 'blue' }} onClick={(e) => handleClick(e)}>{movie?.name}</button> {' , ' + movie?.premiered.split('-')[0]}</strong> <br />
            Genres :  {movie?.genres.length > 1 ? movie?.genres.join(", ") : movie?.genres} <br />
            <div style={{ display: 'flex' }}>
                <img src={movie?.image} alt={movie?.name} width={'100'} height={'150'} />
                <SubsWatchedComp movieId={movie?._id} />
            </div>
            {loading && <div className="spinner"></div>}
            {response && <div><p className="result">{response}</p> <button onClick={() => setResponse("")}>Close</button></div>}
            <br />
            <button><Link to={user?.permissions.includes('Update Movie') ? `/movies/edit-movie/${movie?._id}` : '/unauthorized'}>Edit</Link></button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default MovieComp