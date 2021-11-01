import React, {useState} from 'react';
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
        console.log(username, password);
        props.onLoggedIn(username);

    };

    const onRedirect = (e) => {
        e.preventDefault();
        props.onRedirect(false);
    };

    return (
        <Container fluid="lg" >
            <Row>
                <Col>
                    <Card>
                        <CardGroup>

                            <Form>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" onChange={e => setUsername(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Button variant="dark" type="submit" onClick={handleSubmit}>Submit</Button>
                                <Button variant="secondary" type="button" onClick={onRedirect}>Sign Up</Button>
                            </Form>
                        </CardGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}