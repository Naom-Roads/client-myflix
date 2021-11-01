import React, {useState} from 'react';
import "./login-view.scss"
import {Form, Button, Container, Col, Row, CardGroup, Card} from "react-bootstrap";

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        <Container-fluid>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" onChange={e => setUsername(e.target.value)}/>
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                                <Button variant="primary" type="button" onClick={onRedirect}>Sign Up</Button>
                            </Form>

                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container-fluid>
    );
}