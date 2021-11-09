import React from 'react';
import PropTypes from 'prop-types';
import {isDate} from "../../../dist/index.6701a6e1";
import {Container} from "react-bootstrap";
import {FavoriteMovies} from "./favorite-movies";
import axios from "axios";


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

        // Gets User
    }

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

    // Update User Info

    handleUpdate(e, username, password, email, birthday) {
        this.state({
            validated: null,
        });

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
                validated: true,
            });
            return;
        }
        e.preventDefault();

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
                alert("Your Profile Has Been Updated");
                this.setState({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.password,
                    birthday: this.state.birthday
                });
                localStorage.setItem('user', this.state.username);
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    setUsername(value) {
        this.state.username
    }

    setPassword(value) {
        this.state.password
    }

    setEmail(value) {
        this.state.email
    }

    setBirthday(value) {
        this.state.birthday = value;
    }

    // Deletes user

    handleDeleteUser() {
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


    render() {

        const {user, movies} = this.props;
        return (

            <Container>

                <Row>
                    <Col>

                    </Col>
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