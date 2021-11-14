import React from 'react';
import {Container, Form, Col, Row, Button, Card} from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import {Link} from "react-router-dom";
import {MovieCard} from "../movie-card/movie-card";

export class FavoriteMoviesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteMovies: [],
            username: props.user,

        }
        console.log(props.userId);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.getFavoriteMovies(token)
    }

    getFavoriteMovies(token) {
        axios.get(`http://localhost:8000/users/${this.state.username}/movies/`, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((response) => {
                this.setState({
                    favoriteMovies: response.data
                })
            })
            .catch(function (err) {
                console.log(err);
            });

    }

onRemoveFavorite() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`http://localhost:8000/users/${this.state.username}/movies/${movie._id}`, {
        headers: {Authorization: `Bearer ${token}`}
    })
        .then((response) => {
            this.componentDidMount();
        })
        .catch(function (err) {
            console.log(err);
        });

}


render () {
    const { favoriteMovies, user, movies, movie} = this.props
    return (
        <Container fluid>
            <Row xs={1} md={3} className="g-4">
                {movies?.length > 0 && user.favoriteMovies?.length > 0 && user.favoriteMovies.map((movieId) => {
                    const favoriteMovie = movies?.find(m => m._id === movieId)
                    return (
                <Col className="mt-5">
                    <Row>
                        <Card className="movie-card pd-5 mb-5 text-center" style={{width: '50rem'}}>
                            <Card.Img alt="movie poster" variant="top" src={favoriteMovie.imageurl}/>
                            <Card.Body>
                                <Card.Title>{favoriteMovie.title}</Card.Title>
                                <Card.Text>{favoriteMovie.description}</Card.Text>
                                <Link to={`/movies/${movie._id}`}>
                                    <Button variant="dark">Open</Button>
                                </Link>
                            </Card.Body>
                            <Button classname="m-1" variant="danger" type="submit" onClick={this.onRemoveFavorite}>
                                Remove from your favorites list
                            </Button>
                        </Card>
                    </Row>
                </Col>
                    );
                })}
            </Row>
        </Container>
    )}
}

FavoriteMoviesView.propTypes = {
    userId: PropTypes.string,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string),
};



