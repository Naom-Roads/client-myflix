import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Card} from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

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
<Card>
        <Form>
            <Form.Group controlId="registration-card">
                <Form.label>
                    Username:
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.label>
            </Form.Group>
    <Form.label>
        Email:
        <Form.Control type="email" value={email} onChange={e => setPassword(e.target.value)}/>
    </Form.label>
                <Form.Group controlId="formPassword">
    <Form.label>
        Password:
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
    </Form.label>
                </Form.Group>
            <Form.Group controlId="formBirthday">
        <Form.label>
        Birthday:
        <Form.Control type="birthday" value={birthday} onChange={e => setPassword(e.target.value)}/>
    </Form.label>
            </Form.Group>
    <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
    <Button variant="primary" type="button" onClick={onRedirect}>I already have an account.</Button>
</Form>
</Card>
);

}