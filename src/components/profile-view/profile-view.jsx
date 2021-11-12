import React from 'react';
import PropTypes  from 'prop-types';
import {Col, Container, Row, Card, ListGroup, ListGroupItem, Button, Link} from "react-bootstrap";
import axios from "axios";


export class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.user,
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
    // Gets User

    getUser(token) {
        axios.get(`http://localhost:8000/users/${this.state.username}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    favoriteMovies: response.data.favoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        const {username, email, birthday} = this.state;
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
                                        <Link key={username} to={`/users/${username}`}>
                                        <Button className="m-1" variant="dark" type="submit">
                                            Update Profile</Button>
                                        </Link>
                                        <Link key={username} to={`/users/${username}/movies`}>
                                        <Button className="m-1" variant="dark">
                                            Your Favorite Movies</Button>
                                        </Link>
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

ProfileView.propTypes = {
    user: PropTypes.string.isRequired
}