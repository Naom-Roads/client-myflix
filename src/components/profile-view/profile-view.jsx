import React from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row, Card, ListGroup, ListGroupItem, Button, Link} from "react-bootstrap";
import axios from "axios";
import {UpdateUserView} from "./update-user-view";
import {Redirect, Route} from "react-router-dom";


export class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
        });

    }

    // Gets User

    getUser() {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.get(`http://localhost:8000/users/${username}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    FavoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    getFavoriteMovies() {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.get(`http://localhost:8000/users/${user._id}/movies/`, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((response) => {
                this.componentDidMount();
            })
            .catch(function (err) {
                console.log(err);
            });

    }


    render() {
        const {username, user, email, birthday} = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Title>Profile</Card.Title>
                            <Card.Body>
                                <Card>
                                    <Card.Header>Account Information</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Hello {username} !</Card.Title>
                                        <Card.Text>Here is some information regarding your account.</Card.Text>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem>{email}</ListGroupItem>
                                            <ListGroupItem>{birthday}</ListGroupItem>
                                            <ListGroupItem>For security we cannot display your password,
                                                please click on the update button below if you need to change
                                                it</ListGroupItem>
                                        </ListGroup>
                                        <Link key={username} to={`users/${username}`}>
                                        <Button className="m-1" variant="dark" type="submit">
                                            Update Profile</Button>
                                        </Link>
                                        <Button className="m-1" variant="dark" type="submit" onClick={this.getFavoriteMovies}>
                                            Your Favorite Movies</Button>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ProfileView.PropTypes = {
    user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            birthday: PropTypes.objectOf(Date).isRequired,
            favoriteMovies: PropTypes.arrayOf(PropTypes.string),
        }
    )
}