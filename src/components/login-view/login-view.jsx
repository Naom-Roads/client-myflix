import React, {useState} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import './login-view.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

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

    const onRedirect = (e) => {
        e.preventDefault();
        props.onRedirect(false);
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
                                        <Form.Control type="text" onChange={e => setUsername(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3 justify-content-md-center" controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
                                    </Form.Group>
                                    <Button className="m-1" variant="dark" type="submit"
                                            onClick={handleSubmit}>Submit</Button>
                                    <Button className="m-1" variant="secondary" type="button" onClick={onRedirect}>Sign
                                        Up</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>

                </Col>
            </Row>
        </Container>
    );
}