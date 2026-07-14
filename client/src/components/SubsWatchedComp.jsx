import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SubsWatchedComp = ({ movieId }) => {

    const [members, setMembers] = useState([])

    const membersStore = useSelector((state) => state.members);
    const subsStore = useSelector((state) => state.subscriptions);


    useEffect(() => {
        const fetchData = () => {
            const subIds = subsStore.filter(sub => sub.movies?.some(movie => movie.movieId === movieId))

            const membersData = subIds.map(sub => {
                const item = membersStore.find(item => item?._id === sub?.memberId);
                if (item) {
                    const date = sub.movies?.find(sm => sm?.movieId === movieId).date.split('T')[0]
                    item.date = date
                    return item
                }
            })

            setMembers(membersData)
        }
        fetchData()
    }, [membersStore, movieId, subsStore])


    return (
        <div style={{ height: '150px', border: '2px solid black', marginLeft: '3px', width: '320px', overflow: 'auto' }}>
            Subscriptions watched
            <ul>
                {
                    members?.map(m =>
                        <li key={m._id}><Link to={`/members/${m._id}`} >{m.name}</Link>, {m.date}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default SubsWatchedComp