import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const URL = 'http://localhost:3001/auth/login';


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleLogin = async () => {
        const resp = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await resp.json();
        if (data.accessToken) {
            sessionStorage['accessToken'] = data.accessToken;
            sessionStorage['message'] = data.message;
            sessionStorage['user'] = data.user;
            location.href = '/homepage';
        } else {
            sessionStorage['message'] = data.message
            setMessage(data.message)
        }
    }


    return (
        <div>
            <h3>Log in Page</h3>
            <br />
            User name :{' '} <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <br />
            Password :{' '} <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={handleLogin}>Login</button>
            <br />
            {/* New User ? : <Link to='/create-account'>Create Account</Link> */}
            <br />
            {
                message !== '' &&
                <div className="error">{message}</div>
            }
        </div>
    )
}

export default Login