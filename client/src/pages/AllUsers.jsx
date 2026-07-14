import React, { useEffect, useState } from 'react'
import UserComp from '../components/UserComp'
import { useSelector } from 'react-redux'

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    const usersStore = useSelector((state) => state.users);

    useEffect(() => {
        const fetchData = () => {
            setUsers(usersStore)
        }
        fetchData()
    }, [usersStore])

    return (
        <div >
            {
                users.map((user, index) =>
                    <UserComp key={index} user={user} />
                )
            }
        </div>
    )
}

export default AllUsers