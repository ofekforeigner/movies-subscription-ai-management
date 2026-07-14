import React from 'react'
import { useLocation } from 'react-router-dom'
import UserFormComp from '../components/UserFormComp'

const EditUser = () => {

    const location = useLocation()
    const { user } = location.state

    return (
        <div>
            <h3>Edit User : {user.name}</h3>
            <UserFormComp user={user} />
        </div>
    )
}

export default EditUser