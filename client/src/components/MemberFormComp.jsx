import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const MEMBERS_URL = 'http://localhost:3000/members'

const MemberFormComp = (props) => {
    const [mode, setMode] = useState('');

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = () => {
            setName(props.member.name)
            setEmail(props.member.email)
            setCity(props.member.city)
        }
        if (props.member) {
            fetchData()
            setMode('edit')
        }

    }, [props.member])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mode === 'edit') {
            const memberObj = {
                ...props.member,
                name,
                email,
                city
            }
            await axios.put(`${MEMBERS_URL}/${props.member._id}`, memberObj)
            dispatch({ type: 'EDIT_MEMBER', payload: memberObj })
        } else {
            const memberObj = { name, email, city }
            const { data: memberData } = await axios.post(MEMBERS_URL, memberObj)
            memberObj._id = memberData._id
            dispatch({ type: 'ADD_MEMBER', payload: memberObj })

        }
        navigate("/members/all-members")
    }

    return (
        <div style={{ border: '2px solid black', width: '50%', padding: '5px' }}>
            <form onSubmit={handleSubmit}>
                <strong><label>Name : {' '}
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label></strong><br />
                <strong><label>Email : {' '}
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label></strong><br />
                <strong><label>City : {' '}
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </label></strong><br />
                <br />
                <button type='submit'>{mode === 'edit' ? 'Update' : 'Save'}</button>
                <button><Link to='/members/all-members'>Cancel</Link></button>
            </form>
        </div >
    )
}

export default MemberFormComp