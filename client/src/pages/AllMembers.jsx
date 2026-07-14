import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import MemberComp from '../components/MemberComp';
import { Navigate } from 'react-router-dom';

const user = sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : '';

const AllMembers = () => {
    const [members, setMembers] = useState([]);

    const membersStore = useSelector((state) => state.members);

    useEffect(() => {
        const fetchData = () => {
            setMembers(membersStore);
        }
        fetchData()
    }, [membersStore])

    return (
        <div >
            {
                user?.permissions.includes('View Subscriptions')
                    ?
                    members.map((member, index) =>
                        <MemberComp key={index} member={member} />
                    )

                    :
                    <Navigate to="/unauthorized" replace />

            }
        </div>
    )
}

export default AllMembers