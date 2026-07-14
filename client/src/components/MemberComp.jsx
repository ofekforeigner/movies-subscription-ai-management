import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import MoviesWatchedComp from './MoviesWatchedComp';

const MEMBERS_URL = 'http://localhost:3000/members'

const MemberComp = ({ member }) => {
    const user = sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : '';

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = async () => {
        if (user?.permissions.includes('Delete Subscriptions')) {
            dispatch({ type: 'DELETE_MEMBER', payload: member });
            await axios.delete(`${MEMBERS_URL}/${member._id}`)
            alert('Member deleted!');
        } else {
            navigate('/unauthorized')
        }
    }

    return (
        <div style={{ border: '2px solid black', width: '40%', padding: '5px', margin: '5px' }}>
            <strong>{member?.name}</strong> <br />
            Email :  {member?.email} <br />
            City :  {member?.city} <br />
            <br />
            <button><Link to={user?.permissions.includes('Update Subscription') ? `/members/edit-member/${member?._id}` : '/unauthorized'}>Edit</Link></button>
            <button onClick={handleDelete}>Delete</button>
            <br />
            <br />
            <MoviesWatchedComp memberId={member?._id} />
        </div>
    )
}

export default MemberComp