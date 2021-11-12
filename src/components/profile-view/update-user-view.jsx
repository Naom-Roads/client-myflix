import {Container, Form, Col, Row, Button, Card} from "react-bootstrap";
import PropTypes from "prop-types";
import React, {useState} from "react";
import axios from "axios";

export class UpdateUserView extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        user: null,
    }
}


// Update User Info

    handleUpdateUser(e) {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.patch(`http://localhost:8000/users/${username}`,
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
                alert("Your Profile Has Been Updated");
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    setUsername(value)
    {
        this.state.username = value;
    }

    setPassword(value)
    {
        this.state.password = value;
    }

    setEmail(value)
    {
        this.state.email = value;
    }

    setBirthday(value)
    {
        this.state.birthday = value;
    }


// Deletes user

    handleDeleteUser(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete(`http://localhost:8000/users/${username}`, {
            headers: {Authorization: `Bearer ${token}`}
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

    render () {

    return (
        <Container>
            <Row className="update-form mb-5">
                <Col>
                    <Card>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={this.state.user.username} placeholder="Change your username here"
                                              onChange={e => this.setUsername(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={this.state.user.email} placeholder="Change you email here"
                                              onChange={e => this.setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="birthday" value={this.state.user.birthday} placeholder="Birthday"
                                              onChange={e => this.setBirthday(e.target.value)}/>
                            </Form.Group>
                            <Button className="m-1" variant="dark" type="submit" onClick={this.handleUpdateUser}>
                                Update</Button>
                        </Form>
                        <Button classname="m-1" variant="danger" type="submit" onClick={this.handleDeleteUser}>
                            Delete Your Account
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>

    )}
}

UpdateUserView.PropTypes = {
    user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            birthday: PropTypes.objectOf(Date).isRequired,
            favoriteMovies: PropTypes.arrayOf(PropTypes.string),
        }
    )
}
