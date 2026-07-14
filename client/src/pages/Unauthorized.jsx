import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {

    // TODO: ADD 'GO BACK'
    return (
        <div>
            <div className="error">
                Permission Denied!
            </div><br />
            <button><Link to={'/homepage'}>Back To Homepage</Link></button>
        </div>
    )
}

export default Unauthorized