import React from 'react';
import PropTypes from "prop-types";
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import * as genres from "react-bootstrap/ElementChildren";
import "./movie-view.scss"

export class MovieView extends React.Component {

    render() {

        const {movie} = this.props;

        return (
            <Container className="movie-view">
                <Row xs={1} md={3} className="g-4">
                    <Col className="mt-5">
                        <Card className="mb-5 text-center" style={{width: '50rem'}}>
                            <Card.Img variant="top" src={movie.imageurl} className="mb=2 movie-view"/>
                            <Card.Body>
                                <Row>
                                    <Card.Title key={movie.title} className="value">{movie.title}</Card.Title>
                                </Row>

                                <Row className="movie-description">
                                    <span key={movie.description} className="label">Description: </span>
                                    <Col className="value">{movie.description}</Col>
                                </Row>

                                <Row className="movie-director">
                                    <span key={movie.director} className="label" md={2}>Director:</span>
                                    <Link to={`/directors/${movie.director}`}>
                                        <Button variant={"link"}>See Director</Button>
                                    </Link>
                                </Row>

{/*

                                <Row className="movie-genres">
                                    <span className="label" md={2}>Genres:</span>
                                    <span className="value">{movie.genre?._id}</span>
                                    <Link to={`/genres/${movie.genre.name}`}>
                                        <Button variant={"link"}>{movie.genre.name}</Button>
                                    </Link>
                                </Row>

*/}

                                {   /*     <Row class-name="genres-list">
                                <span className="label">Genres:</span>
                                    {genres.map((g) => {
                                            if (Genres.find((g) => g === movie.genre.name)
                                            ) {
                                                return (
                                                    <Row className="movie-genres">
                                                        <Link to={`/genres/${g.name}`}>
                                                            <span className="genres-item">{g.name}</span>
                                                        </Link>
                                                    </Row>
                                                );
                                            }
                                        }
                                          </Row>
                                    )}*/}

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
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string.isRequired),
    }).isRequired
};
