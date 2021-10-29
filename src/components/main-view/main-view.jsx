import React from 'react';
import axios from 'axios';


import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            isLoginPage: true
        }
    }

    componentDidMount() {
        axios.get('https://my-flix-list.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegistration(user) {
        this.setState({
            user
        });
    }

    redirectToLogin(isLoginPage) {
        this.setState({
            isLoginPage
        });
    }

    redirectToRegistration(isLoginPage) {
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
            <div className="main-view">
                {selectedMovie
                    ? (
                        <Row>
                            <Col>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                                this.setSelectedMovie(newSelectedMovie);
                            }}/>
                            </Col>
                        </Row>
                    )
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedmovie) => {
                            this.setSelectedMovie(newSelectedmovie)
                        }}/>
                    ))
                }
            </div>
        );
    }
}