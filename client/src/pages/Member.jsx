import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MovieComp from '../components/MovieComp';
import MemberComp from '../components/MemberComp';

const MEMBERS_URL = 'http://localhost:3000/members'

const Member = () => {

    const [member, setMember] = useState()

    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const { data: memberData } = await axios.get(`${MEMBERS_URL}/${id}`)
            setMember(memberData)
        }
        fetchData()
    }, [id])


    return (
        <div>
            <MemberComp member={member} />
        </div>
    )
}

export default Member