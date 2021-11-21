import React, {useState} from "react";
import {Container, Form, Col, Row, Button, Card} from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import {useHistory} from "react-router-dom";


export function UpdateUserView(props) {
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);
    const [email, setEmail] = useState(props.email ? props.email : "");
    const [birthday, setBirthday] = useState(props.birthday ? props.birthday : "");
    const history = useHistory();

// Update User Info

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        console.log(username, password, email, birthday);
        const updatedUser = {};
        if (username) {
            updatedUser.username = username;
        }
        if (password) {
            updatedUser.password = password;
        }
        if (email) {
            updatedUser.email = email;
        }
        if (birthday) {
            updatedUser.birthday = birthday;
        }
        axios.patch(`https://my-flix-list.herokuapp.com/users/${user}`, updatedUser,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('user', response.data.username);
                props.onUpdateUser(username);
                history.replace(`/users/${username}`);
                alert("Your Profile Has Been Updated");

            })
            .catch(function (err) {
                console.log(err);
            })
    }

// Deletes user

    const handleDeleteUser = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete(`https://my-flix-list.herokuapp.com/users/${username}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((response) => {
                console.log(response);
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
        <Container className={"mb-5"}>
            <Row className="update-form">
                <Col>
                    <Card>
                        <Card.Body>
                            <Form className="update-form">
                                <Form.Group className="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={username}
                                                  placeholder="Update username here"
                                                  onChange={e => setUsername(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" value={email}
                                                  placeholder="Update email here"
                                                  onChange={e => setEmail(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                                  onChange={e => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicBirthday">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control type="birthday" value={birthday}
                                                  placeholder="Birthday"
                                                  onChange={e => setBirthday(e.target.value)}/>
                                </Form.Group>
                            </Form>
                            <Button className="m-1" variant="dark" type="submit" onClick={handleUpdateUser}>
                                Update</Button>
                            <Button className="m-1" variant="danger" type="submit" onClick={handleDeleteUser}>
                                Delete Your Account
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}

UpdateUserView.propTypes = {
    user: PropTypes.shape({
            userId: PropTypes.string,
            username: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            birthday: PropTypes.objectOf(Date).isRequired,
            favoriteMovies: PropTypes.arrayOf(PropTypes.string),
        }
    )
}
