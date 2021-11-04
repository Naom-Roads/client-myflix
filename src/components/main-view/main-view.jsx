import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";
import "./main-view.scss"

import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            user: null,
            isLoginPage: true
        };
    }

    getMovies(token) {
        axios.get('https://my-flix-list.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(response => {
                console.log('response', response)
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken)
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);

    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

onRegistration(user)
{
    this.setState({
        user
    });
}

redirectToLogin(isLoginPage)
{
    this.setState({
        isLoginPage
    });
}

redirectToRegistration(isLoginPage)
{
    this.setState({
        isLoginPage
    });
}

render() {
    let {user, movies, selectedMovie, isLoginPage} = this.state;
    if (!user && isLoginPage) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}
                                                onRedirect={isLoginPage => this.redirectToRegistration(isLoginPage)}/>;
    if (!user && !isLoginPage) return <RegistrationView onRegistration={user => this.onRegistration(user)}
                                                        onRedirect={isLoginPage => this.redirectToLogin(isLoginPage)}/>;

    if (movies.length === 0) return <div className="main-view"/>;

    return (
        <Router>
        <Row className="main-view justify-content-md-center">
           <Route exact path="/" render={() => {
               return movies.map(m => (
                   <Col md={3} key={m._id}>
                       <MovieCard movie={m} />
                   </Col>
               ))
           }} />
            <Route path="/movies/:movieId" render={({ match }) => {
                return <Col md={8}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                </Col>
            }} />
        </Row>
        </Router>
    );
}
}