import React from 'react';
import PropTypes  from 'prop-types';
import {Col, Container, Row, Card, ListGroup, ListGroupItem, Button} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {UpdateUserView} from "./update-user-view";

export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.user,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
            showUpdateForm: false,
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }
    // Gets User

    getUser(token) {
        axios.get(`https://my-flix-list.herokuapp.com/users/${this.state.username}`, {
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

    onToggleUpdateForm=() => {
        this.setState({showUpdateForm: !this.state.showUpdateForm});
    }

    onUpdateUser=(username) => {
      this.setState({
          username: username,
          showUpdateForm: false,
      });
    }

    render() {

        const {username, email, birthday, password, favoriteMovies, showUpdateForm} = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <Card className={"user-info mb-5 p-3"}>
                            <Card.Title> Profile </Card.Title>
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
                                                it.
                                            </ListGroupItem>
                                        </ListGroup>
                                        <Button className="m-1" variant="dark"  onClick={this.onToggleUpdateForm} >
                                            Update Profile</Button>
                                        <Link key={favoriteMovies} to={`/users/${username}/movies`}>
                                        <Button className="m-1" variant="dark">
                                            Your Favorite Movies</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {showUpdateForm ?
                <Row>
                    <UpdateUserView username={username} password={password} email={email} birthday={birthday} onUpdateUser={this.onUpdateUser} />
                </Row> : <Row></Row>}

            </Container>
        );
    }
}

ProfileView.propTypes = {
    user: PropTypes.string.isRequired
}