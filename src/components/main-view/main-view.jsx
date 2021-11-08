import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Redirect, useParams} from "react-router-dom";
import "./main-view.scss"

import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {Navbar} from '../navbar/navbar';
import {GenreView} from "../genres-view/genres-view";
import {DirectorView} from "../director-view/director-view";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            newUser: null,
            genres: [],
            directors: []
        }
    }
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getGenres(accessToken);
            this.getDirectors(accessToken);
        }
    }


    getGenres(token) {
        const movie = this.state;
        const genre = movie.genre;
        axios.get('http://localhost:8000/genres', {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                this.setState({
                    genres: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getDirectors(token) {
        axios.get('http://localhost:8000/directors', {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                this.setState({
                    directors: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    getMovies(token) {
        axios.get('http://localhost:8000/movies', {
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
        this.setState({
            newUser: user,
        });
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
        this.getGenres(authData.token);
        this.getDirectors(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }


    render() {
        let {movies, directors, genres, user} = this.state;

        return (
            <Router>

                <Container>
                    <Navbar/>
                </Container>

                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>

                            if (movies.length === 0) return (<div className="main-view"/>);
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m}/>
                                </Col>
                            ))
                        }}/>


                            <Route path="/register" render={() => {
                            if (user) return <Redirect to="/"/>
                            return <Col>
                                <RegistrationView onRegistration={user => this.onRegistration(user)}/>
                            </Col>
                        }}/>

                        <Route path="/movies/:movieId" render={({match}) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>

                            if (movies.length === 0) return <div className="main-view"/>;
                            return <Col md={8}>
                                <MovieView genres={genres} directors={directors} movie={movies.find(m => m._id === match.params.movieId)}
                                           onBackClick={() => history.goBack()}/>
                            </Col>
                        }}/>

                        <Route path="/genres/:genreId" render={({match, history}) => {
                            return <Col md={8}>
                                <GenreView genre={genres?.find(g => g._id === match.params.genreId)}
                                           onBackClick={() => history.goBack()}/>
                            </Col>
                        }}/>

                        <Route exact path="/directors" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>

                            if (directors.length === 0) return (<div className="director-view"/>);
                            return directors.map(d => (
                                <Col md={3} key={d._id}>
                                    <DirectorView director={d}/>
                                </Col>
                            ))
                        }}/>

                        <Route path="/directors/:directorId" render={({match, history}) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>
                            if (directors?.length === 0) return <div className="directors-view"/>;
                          if (directors?.length > 0) return <Col md={8}>
                                <DirectorView
                                    director={directors?.find(d => d._id === match.params.directorId)}
                                    onBackClick={() => history.goBack()}/>
                            </Col>
                        }}/>

                        {/*<Route path="/directors/:name" render={({match, history}) => {*/}
                        {/*    if (!user) return <Col>*/}
                        {/*        <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>*/}
                        {/*    </Col>*/}
                        {/*    if (directors?.length === 0) return <div className="directors-view"/>;*/}
                        {/*    return <Col md={8}>*/}
                        {/*        <DirectorView*/}
                        {/*            director={directors?.find(d => d.name === match.params.name)}*/}
                        {/*            onBackClick={() => history.goBack()}/>*/}
                        {/*    </Col>*/}
                        {/*}}/>*/}

                    </Row>
                </Container>
            </Router>
        );
    }
}