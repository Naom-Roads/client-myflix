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
            user: null
        };
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

    onLoggedIn(username) {
        this.setState({
            username
        });
    }

    render() {
        const { movies, selectedMovie} = this.state;

        if(!this.state.user) return <LoginView onLoggedIn={username => this.onLoggedIn(username)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                        this.setSelectedMovie(newSelectedMovie);
                    }}/>
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