import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
    const [username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegistration(username);
    };

    const onRedirect = (e) => {
        e.preventDefault();
        props.onRedirect(true);
    };

    return (

        <form className="registration-card">
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Birthday:
                <input type="birthday" value={birthday} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={onRedirect}>I already have an account.</button>
        </form>
    );

}