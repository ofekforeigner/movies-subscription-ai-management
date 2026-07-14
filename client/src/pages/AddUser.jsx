import React from 'react'
import UserFormComp from '../components/UserFormComp'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const USERS_URL = 'http://localhost:3001/users'

const AddUser = () => {

    return (
        <div>
            <h3>Add User</h3>
            <UserFormComp />
        </div>
    )
}

export default AddUser