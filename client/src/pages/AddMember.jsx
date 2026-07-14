import React from 'react'
import MemberFormComp from '../components/MemberFormComp'
import { Navigate } from 'react-router-dom';


const AddMember = () => {

    const user = sessionStorage['user'] ? JSON.parse(sessionStorage['user']) : '';

    return (
        <div>
            <h3>Add Member</h3>
            {user?.permissions.includes('Create Subscriptions') ?
                <MemberFormComp />
                :
                <Navigate to="/unauthorized" replace />
            }

        </div >
    )
}

export default AddMember