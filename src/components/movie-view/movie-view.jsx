import React from 'react';
import PropTypes from "prop-types";
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import * as genres from "react-bootstrap/ElementChildren";
import "./movie-view.scss"
import {GenreView} from "../genres-view/genres-view";

export class MovieView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {movie, genres, directors} = this.props;

        return (
            <Container className="movie-view">
                <Row xs={1} md={3} className="g-4">
                    <Col className="mt-5">
                        <Card className="mb-5 text-center" style={{width: '50rem'}}>
                            <Card.Img alt="movie poster" variant="top" src={movie.imageurl}
                                      className="mb=2 movie-view"/>
                            <Card.Body>
                                <Row>
                                    <Card.Title key={movie.title} className="value p-3">{movie.title}</Card.Title>
                                </Row>

                                <Row className="movie-description p-md-5">
                                    <Card.Text key={movie.description} className="label">{movie.description}</Card.Text>
                                </Row>

                                <Row className="movie-director p-md-5">
                                    <Card.Subtitle key={movie.director} className="label" md={2}> Director: </Card.Subtitle>
                                            <Link to={`/directors/${movie.director}`}>
                                                {directors?.find(d => d._id === movie.director)?.name}
                                            </Link>
                                </Row>


                                <Row className="movie-genres">

                                    <Card.Subtitle className="label" md={2}>Genres:</Card.Subtitle>
                                    {genres?.length > 0 && movie.genres.map((genreId) => {
                                        const genre = genres?.find(g => g._id === genreId)
                                        return (
                                            <Link to={`/genres/${genreId}`}>
                                                {genre.name}
                                            </Link>
                                        );
                                    })
                                    }
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes =
    {
        movie: PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            director: PropTypes.string.isRequired,
            genres: PropTypes.arrayOf(PropTypes.string.isRequired),
        }).isRequired
    }
;
