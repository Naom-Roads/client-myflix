import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./main-view.scss"


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
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken)
        }
    }

    onLoggedIn(authData)
    {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);

    }
        
        getMovies(token) {
            axios.get('https://my-flix-list.herokuapp.com/movies', {
                headers: {Authorization: `Bearer ${token}`}
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
    


setSelectedMovie(newSelectedMovie)
{
    this.setState({
        selectedMovie: newSelectedMovie
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

render()
{
    let {user, movies, selectedMovie, isLoginPage} = this.state;

    if (!user && isLoginPage) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}
                                                onRedirect={isLoginPage => this.redirectToRegistration(isLoginPage)}/>;
    if (!user && !isLoginPage) return <RegistrationView onRegistration={user => this.onRegistration(user)}
                                                        onRedirect={isLoginPage => this.redirectToLogin(isLoginPage)}/>;

    if (movies.length === 0) return <div className="main-view"/>;

    return (
        <Row className="main-view justify-content-md-center">
            {selectedMovie
                ? (
                    <Col md={8}>
                        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                            this.setSelectedMovie(newSelectedMovie);
                        }}/>
                    </Col>
                )
                : movies.map(movie => (
                    <Col key={movie._id} md={3}>
                        <MovieCard movie={movie} onMovieClick={(newSelectedmovie) => {
                            this.setSelectedMovie(newSelectedmovie);
                        }}/>
                    </Col>
                ))
            }
        </Row>
    );
}
}