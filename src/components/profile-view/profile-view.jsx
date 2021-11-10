import React from 'react';
import PropTypes from 'prop-types';
import {isDate} from "../../../dist/index.6701a6e1";
import {Col, Container, FormGroup} from "react-bootstrap";
import {FavoriteMovies} from "./favorite-movies";
import axios from "axios";
import {UpdateUser} from "./update-user";
import {Redirect, Route} from "react-router-dom";
import {RegistrationView} from "../registration-view/registration-view";


export class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            FavoriteMovies: []
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
            user: null
        });

    }

    onUpdateUser(user) {
        this.setState({
            user: authData.user.username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
        this.getGenres(authData.token);
        this.getDirectors(authData.token);
    }

    // Gets User

    getUser() {
        const username = localStorage.getItem('user')
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

    // Remove a movie from favorite list

    onRemoveFavorite(id) {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`http://localhost:8000/users/${username}/movies/${movie._id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((response) => {
                console.log(response);
                this.componentDidMount();
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    onUpdateUser(user) {
        this.setState( {
            user: user,
        });
    }


    render() {

        const {FavoriteMovies, username, validated, email, birthday} = this.props;
        const {movies} = this.props;

        return (

            <Container>

                <Row>
                    <Col>
                        <Card>

                            <Card.Title>Profile</Card.Title>
                            <Card.Body>

                                //Profile Information Goes here

                            </Card.Body>
                        </Card>

                    </Col>

                    <Route path="/users/:username" render={() => {
                        if (user) return <Redirect to="/"/>
                        return <Col>
                            <UpdateUser onUpdateUser={user => this.onUpdateUser(user)}/>
                        </Col>
                    }}/>

                </Row>

            </Container>
        )
    }


    ProfileView
.
    PropTypes = {
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