import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";
import "./main-view.scss"

import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {Navbar} from '../navbar/navbar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {

    constructor(){
        super();

        this.state = {
            movies: [],
            user: null,
        };
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

    getMovies(token) {
        axios.get('https://my-flix-list.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onRegistration(user) {
        console.log(user);
        this.setState({
            newUser: user,
        });
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


    render() {
        let {movies, user} = this.state;

        return (

            <Router>
            <Container>
                <Navbar />
            </Container>

                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>

                            if (movies.length === 0) return <div className="main-view"/>;
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m}/>
                                </Col>
                            ))
                        }}/>

                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/"/>
                            return <Col>
                                <RegistrationView/>
                            </Col>
                        }}/>


                        <Route path="/movies/:movieId" render={({match}) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>

                            if (movies.length === 0) return <div className="main-view"/>;
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>
                                onBackClick={() => history.goBack()} />
                            </Col>
                        }}/>

                        <Route path="/genres/:name" render={({match, history}) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>
                            if (movies.length === 0) return <div className="main-view"/>;
                            return <Col md={8}>
                                <GenreView genres={movies.find(m => m.Genres.Name === match.params.name).Genres}
                                           onBackClick={() => history.goBack()}/>
                            </Col>
                        }}/>

                        <Route path="/directors/:name" render={({match, history}) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>
                            if (movies.length === 0) return <div className="main-view"/>;
                            return <Col md={8}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                                              onBackClick={() => history.goBack()}/>
                            </Col>
                        }}/>

                    </Row>
                </Container>

            </Router>
        );
    }
}