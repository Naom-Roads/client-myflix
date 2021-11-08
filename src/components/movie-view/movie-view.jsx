import React from 'react';
import PropTypes, {object} from "prop-types";
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import axios from "axios";


export class MovieView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            directors: null,
        }

    }






    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getGenres(accessToken);
        }
    }


    keypressCallback(event) {
        console.log(event.key);
    }

    componentWillUnmount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    render() {

        const {movie, genres, directors} = this.props;

        return (
            <Container className="movie-view">
                <Row xs={1} md={3} className="g-4">
                    <Col className="mt-5">
                        <Card className="mb-5 text-center" style={{width: '50rem'}}>
                            <Card.Img variant="top" src={movie.imageurl} className="mb=2 movie-view"/>
                            <Card.Body>
                                <Card.Title className="value">{movie.title}</Card.Title>
                                <Card.Text className="movie-description">
                                    <span className="label">Description: </span>
                                    <span className="value">{movie.description}</span>
                                </Card.Text>

                                <Card.Text className="movie-director">
                                    <span className="label">Director: </span>
                                    <span className="value">{movie.director?.name}</span>
                                    <Link to={`/directors/${movie.director.name}`}>
                                        <Button variant={"link"}>{movie.director.name}</Button>
                                    </Link>
                                </Card.Text>

                                <Card.Text className="movie-genres">
                                    <span className="label">Genres:</span>
                                            <Link to={`/genres/${movie.genre.name}`}>
                                                <span className="value">{movie.genre.name}</span>
                                            </Link>
                                </Card.Text>
                                <Link to="/">
                                    <Button variant="secondary" size="sm">Back</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genres: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }),
        director: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string,
            birthyear: PropTypes.string
        }),
        imageurl: PropTypes.string
    }).isRequired
};
