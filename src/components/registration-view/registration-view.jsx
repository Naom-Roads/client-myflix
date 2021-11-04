import React, {useState} from 'react';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://my-flix-list.herokuapp.com/registration', {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/' '_self');
            })
            .catch(e => {
                console.log('error registering user')
            });
       // props.onRegistration(username);
    };

    const onRedirect = (e) => {
        e.preventDefault();
        props.onRedirect(true);
    };

    return (
        <Container fluid="md">
            <Row className="mb-5">
                <Col className="mt-5">
                    <Card className="p-3">
                        <CardGroup>
                            <Form>
                                <Form.Group className="mb-3 justify-content-md-center" controlId="registration-card">
                                    <Form.Label>
                                        Username:
                                        <Form.Control type="text" value={username}
                                                      onChange={e => setUsername(e.target.value)}/>
                                    </Form.Label>
                                </Form.Group>
                                <Form.Label>
                                    Email:
                                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                                </Form.Label>
                                <Form.Group className="mb-3 justify-content-md-center" controlId="formPassword">
                                    <Form.Label>
                                        Password:
                                        <Form.Control type="password" value={password}
                                                      onChange={e => setPassword(e.target.value)}/>
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-3 justify-content-md-center" controlId="formBirthday">
                                    <Form.Label>
                                        Birthday:
                                        <Form.Control type="birthday" value={birthday}
                                                      onChange={e => setBirthday(e.target.value)}/>
                                    </Form.Label>
                                </Form.Group>
                                <Button className="m-1" variant="dark" type="submit" onClick={handleSubmit}>Submit</Button>
                                <Button className="m-1" variant="secondary" type="button" onClick={onRedirect}>I already have an
                                    account.</Button>
                            </Form>
                        </CardGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}