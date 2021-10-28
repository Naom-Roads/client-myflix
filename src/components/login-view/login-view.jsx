import React, { useState } from 'react';
import PropTypes from 'prop-types';


export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);

    };

    const onRedirect = (e) => {
        e.preventDefault();
        props.onRedirect(false);
    };

    return (
        <form className="login-card">
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={onRedirect}>I don't have an account</button>
        </form>

    );
}