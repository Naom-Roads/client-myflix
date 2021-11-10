import {Container, Form, Col, Row, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import React, {useState} from "react";
import axios from "axios";
import {Redirect, Route} from "react-router-dom";
import {RegistrationView} from "../registration-view/registration-view";

export function UpdateUser(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
}

// Update User Info

const handleUpdateUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:8000/users/${username}`,
        {
            username: this.state.username,
            password: this.state.password,
            email: this.state.password,
            birthday: this.state.birthday
        },
        {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            this.setState({
                username: this.state.username,
                password: this.state.password,
                email: this.state.password,
                birthday: this.state.birthday
            });
            localStorage.setItem('user', this.state.username);
            const data = response.data;
            alert("Your Profile Has Been Updated");
        })
        .catch(function (err) {
            console.log(err);
        })
}

setUsername(value)
{
    this.state.username
}

setPassword(value)
{
    this.state.password
}

setEmail(value)
{
    this.state.email
}

setBirthday(value)
{
    this.state.birthday = value;
}


// Deletes user

const handleDeleteUser = (e) => {
    e.preventDefault();
{
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`http://localhost:8000/users/${username}`, {
        headers: {Authorization `Bearer ${token}`}
    })
        .then((response) => {
            console.log(response);
            alert(username + 'has been deleted');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            alert("Your account has been deleted");
            window.open('/', "_self");
        })
        .catch(function (err) {
            console.log(err);
        });
}

    return (
        <Container>
            <Row className="update-form mb-5">
                <Col>
                    <Card>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={username} placeholder="Change your username here"
                                              onChange={e => setUsername(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={email} placeholder="Change you email here"
                                              onChange={e => setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out"/>
                            </Form.Group>
                            <Button className="m-1" variant="dark" type="submit" onClick={handleUpdateUser}>
                                Update</Button>
                        </Form>
                        <Button classname="m-1" variant="danger" type="submit" onClick={handleDeleteUser}>
                            Delete Your Account
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

UpdateUser.PropTypes = {
    user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            password: PropTypes.string.isRequiredquired,
            email: PropTypes.string.isRequired,
            birthday: PropTypes.objectOf(Date).isRequired,
            favoriteMovies: PropTypes.arrayOf(PropTypes.string),
        }
    )
}
}