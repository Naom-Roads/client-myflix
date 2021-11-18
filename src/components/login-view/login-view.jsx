import React, {useState} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import './login-view.scss'
import { Form, Button, Container, Col, Row, CardGroup, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://my-flix-list.herokuapp.com/login', {
            username: username,
            password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };


    return (
        <Container fluid>
            <Row className="mb-3">
                <Col className="mt-5">
                    <CardGroup>
                        <Card className="mb-5">
                            <Card.Body>
                                <Form className="pd-5 mb-5">
                                    <Form.Group className="mb-3 justify-content-md-center" controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Required"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            min="5"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3 justify-content-md-center" controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            placeholder="Password"
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button className="m-1" variant="dark" type="submit"
                                            onClick={handleSubmit}>Submit</Button>
                                    <Link to="/client-myflix/register">
                                        <Button className="m-1" variant="secondary" type="button">Sign
                                            Up</Button>
                                    </Link>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};