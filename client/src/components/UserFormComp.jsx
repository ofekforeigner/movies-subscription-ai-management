import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const USERS_URL = 'http://localhost:3001/users'

const UserFormComp = (props) => {
    const [mode, setMode] = useState('');

    const permissions = [
        "View Subscriptions",
        "Create Subscriptions",
        "Delete Subscriptions",
        "Update Subscription",
        "View Movies",
        "Create Movies",
        "Delete Movies",
        "Update Movie"]

    const [selectedItems, setSelectedItems] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [sessionTimeout, setSessionTimeout] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchData = () => {
            setSelectedItems(props.user.permissions)
            setFirstName(props.user.first_name)
            setLastName(props.user.last_name)
            setUserName(props.user.username)
            setSessionTimeout(parseInt(props.user.session_timeout))
        }
        if (props.user) {
            fetchData()
            setMode('edit')
        }

    }, [props.user])


    function checkboxHandler(e) {
        const isSelected = e.target.checked;
        const value = e.target.value;

        if (isSelected) {
            if (['Create Subscriptions', 'Delete Subscriptions', 'Update Subscription'].includes(value)) {
                setSelectedItems([...selectedItems, value, "View Subscriptions"])
            } else if (['Create Movies', 'Delete Movies', 'Update Movie'].includes(value)) {
                setSelectedItems([...selectedItems, value, "View Movies"])
            } else {
                setSelectedItems([...selectedItems, value])
            }
        } else {
            setSelectedItems((prevData) => {
                return prevData.filter((per) => {
                    return per !== value
                })
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mode === 'edit') {
            const userObj = {
                ...props.user,
                first_name: firstName,
                last_name: lastName,
                username: userName,
                session_timeout: sessionTimeout,
                permissions: selectedItems
            }
            await axios.put(`${USERS_URL}/${props.user.id}`, userObj)
            dispatch({ type: 'EDIT_USER', payload: userObj })
        } else {
            const date = new Date()
            const today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            const userObj = { first_name: firstName, last_name: lastName, username: userName, session_timeout: sessionTimeout, created_date: today, permissions: selectedItems }
            const { data: userData } = await axios.post(USERS_URL, userObj)
            userObj.id = userData._id
            dispatch({ type: 'ADD_USER', payload: userObj })

        }
        navigate("/user-management/users")
    }

    return (
        <div style={{ border: '2px solid black', width: '50%', padding: '5px' }}>
            <form onSubmit={handleSubmit}>
                <strong><label>First Name : {' '}
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label></strong><br />
                <strong><label>Last Name : {' '}
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label></strong><br />
                <strong><label>User Name : {' '}
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </label></strong><br />
                <strong><label>Session Timeout (Minutes) : {' '}
                    <input type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} />
                </label></strong><br />
                {
                    mode === 'edit' &&
                    <strong><label>Created Date : {props.user.created_date}</label><br /></strong>
                }

                <strong><label>Permissions : {' '} </label></strong><br />
                {
                    permissions.map((per, index) =>
                        <div key={index}>
                            <input type="checkbox" checked={selectedItems.includes(per)} value={per} onChange={checkboxHandler} />
                            <label>{per}</label>
                            <br />
                        </div>
                    )
                }
                <br /><br />
                <button type='submit'>{mode === 'edit' ? 'Update' : 'Save'}</button>
                <button><Link to='/user-management/users'>Cancel</Link></button>
            </form>
        </div >
    )
}

export default UserFormComp