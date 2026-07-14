import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const SUBSCRIPTIONS_URL = 'http://localhost:3000/subscriptions'


const MoviesWatchedComp = ({ memberId }) => {

    // const [member, setMember] = useState()

    const [open, setOpen] = useState(false)
    const [userMovies, setUserMovies] = useState([])
    const [newMovies, setNewMovies] = useState([])
    const [sub, setSub] = useState('')
    const [date, setDate] = useState('')

    const subsStore = useSelector((state) => state.subscriptions);
    const moviesStore = useSelector((state) => state.movies);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const subMovies = subsStore.find(sub => sub.memberId === memberId)?.movies

            const movies = subMovies?.map(x => {
                const item = moviesStore.find(item => item._id === x.movieId);
                if (item) {
                    return { id: item._id, name: item.name, date: x.date };
                }
            }).filter(item => item);

            setUserMovies(movies);

            const newMovies = moviesStore?.map(x => {
                const item = subMovies?.map(s => s.movieId).includes(x._id)
                if (!item) {
                    return x;
                }
            }).filter(item => item !== undefined);

            setNewMovies(newMovies)
        }
        fetchData()
    }, [memberId, moviesStore, subsStore])

    const handleSubscribe = async () => {
        const member = subsStore.find(s => s?.memberId === memberId)

        if (member) {
            const subObj = { memberId, movieId: sub, date }
            await axios.put(`${SUBSCRIPTIONS_URL}/${member?._id}`, subObj)
            dispatch({ type: 'ADD_SUBSCRIPTION', payload: subObj })
        } else {
            const subObj = { memberId, movies: [{ movieId: sub, date }] }
            const { data: subDbId } = await axios.post(SUBSCRIPTIONS_URL, subObj)
            subObj._id = subDbId._id
            dispatch({ type: 'ADD_NEW_SUBSCRIPTION', payload: subObj })
        }
        alert('Sub ok!')
        navigate("/members")
    }


    return (
        <div style={{ height: '100px', border: '2px solid black', marginLeft: '3px', width: '320px', overflow: 'auto' }}>
            <strong>Movies Watched</strong><br />
            <button onClick={() => setOpen(!open)}>Subscribe to new movie</button><br />
            {
                open &&
                <div style={{ border: "2px solid red" }}>
                    Add a new movie: <br />
                    <select onChange={(e) => setSub(e.target.value)}>
                        <option value=''></option>
                        {
                            newMovies.length > 0 ?
                                newMovies.map((movie) =>
                                    <option key={movie._id} value={movie._id}>{movie.name}</option>
                                )
                                :
                                userMovies.map(movie =>
                                    <option key={movie?._id} value={movie?._id}>{movie?.name}</option>
                                )

                        }
                    </select>{' '}
                    <input type="date" onChange={(e) => setDate(e.target.value)} /><br />
                    <button onClick={handleSubscribe}>Subscribe</button>
                </div>
            }
            {
                userMovies?.length > 0 &&
                <ul>
                    {
                        userMovies.map(movie =>
                            <li key={movie?.id}><Link to={`/movies/${movie?.id}`} >{movie?.name}</Link>, {movie.date.split('T')[0]}</li>
                        )
                    }
                </ul>
            }
        </div >
    )
}

export default MoviesWatchedComp