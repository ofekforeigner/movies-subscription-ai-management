import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const URL = 'http://localhost:3001/auth/register';


const CreateAccount = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleCreate = async () => {        
        const resp = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await resp.json();
        if (data.accessToken) {
            sessionStorage['accessToken'] = data.accessToken;
            sessionStorage['message'] = data.message;
            location.href = '/login';
        } else {
            sessionStorage['message'] = data.message
            setMessage(data.message)
        }
    }

    return (
        <div>

            <h3>Create an Account</h3>
            <br />
            Username :{' '} <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <br />
            Password :{' '} <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={handleCreate}>Create</button>
            <br />
            Already have an account ? : <Link to='/login'>Sign In</Link>
            {
                message !== '' &&
                <div className="error">{message}</div>
            }
        </div>
    )
}

export default CreateAccount