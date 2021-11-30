import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import { setMovies } from '../../actions/actions';
// import MoviesList from '../movies-list/movies-list';

import "./main-view.scss"
import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {NavbarView} from '../navbar/navbar';
import {GenreView} from "../genres-view/genres-view";
import {DirectorView} from "../director-view/director-view";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {ProfileView} from "../profile-view/profile-view";
import {FavoriteMoviesView} from "../profile-view/favorite-movies";


class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedMovie: null,
            user: null,
            newUser: null,
            genres: [],
            directors: []
        }
    }

    componentDidMount() {
        console.log("Component did mount");
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
        axios.get('https://my-flix-list.herokuapp.com/genres', {
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
        axios.get('https://my-flix-list.herokuapp.com/directors', {
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
        axios.get('https://my-flix-list.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                this.props.setMovies(response.data);
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
        debugger;
        this.setState({
            user: null
        });
    }


    render() {
        console.log("Component renders");
        let {directors, genres, user} = this.state;
        let {movies} = this.props

        return (

            <Router>

                <NavbarView key={user} user={user} onLoggedOut={() => this.onLoggedOut()}/>

                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/client-myflix/" render={() => {
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

                        <Route exact path="/client-myflix/register" render={() => {
                            if (user) return <Redirect to="/client-myflix/login"/>
                            return <Col>
                                <RegistrationView onRegistration={user => this.onRegistration(user)}/>
                            </Col>
                        }}/>

                        <Route exact path="/client-myflix/movies/:movieId" render={({match}) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>

                            if (movies.length === 0) return <div className="main-view"/>;
                            return <Col md={8}>
                                <MovieView user={user} genres={genres} directors={directors}
                                           movie={movies.find(m => m._id === match.params.movieId)}
                                           onBackClick={() => history.goBack()}/>
                            </Col>
                        }}/>

                        <Route exact path="/client-myflix/genres/:genreId" render={({match, history}) => {
                            return <Col md={8}>
                                <GenreView genre={genres?.find(g => g._id === match.params.genreId)}
                                           onBackClick={() => history.goBack()}/>
                            </Col>
                        }}/>

                        <Route exact path="/client-myflix/directors" render={() => {
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

                        <Route exact path="/client-myflix/directors/:directorId" render={({match, history}) => {
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

                        <Route exact path="/client-myflix/users/:username" render={({match, history}) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>
                            if (!user) return <div className="user-view"/>;
                            if (!!user) return <Col md={8}>
                                <ProfileView
                                    user={user}
                                    onBackClick={() => history.goBack()}/>
                            </Col>
                        }}/>

                        <Route exact path="/client-myflix/users/:username/movies" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                            </Col>
                            if (!user) return <div className="user-view"/>;
                            if (!!user) return <Col md={8}>
                                <FavoriteMoviesView user={user}/>
                            </Col>
                        }}/>
                    </Row>
                </Container>
            </Router>
        );
    }
}
    let mapStateToProps = state => {
        return { movies: state.movies }
    }

    export default connect(mapStateToProps, { setMovies } )(MainView);

