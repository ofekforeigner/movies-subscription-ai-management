import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MemberFormComp from '../components/MemberFormComp'
import axios from 'axios'

const MEMBERS_URL = 'http://localhost:3000/members'


const EditMember = () => {

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
            <h3>Edit Member : {member?.name}</h3>
            <MemberFormComp member={member} />
        </div>
    )
}

export default EditMember