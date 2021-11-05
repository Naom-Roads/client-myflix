import React from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import {Link} from "react-router-dom";
export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    render() {

        const {movie, onBackClick} = this.props;

        return (
            <Container className="movie-view">
            <Row xs={1} md={3} className="g-4">
                    <Col className="mt-5">
                        <Card className="mb-5 text-center" style={{width: '20rem'}}>
                            <Card.Img variant="top" src={movie.imageurl} className="mb=2 movie-view"/>
                            <Card.Body>
                                <Card.Title className="value">{movie.title}</Card.Title>
                                <Card.Text>
                                    <div className="movie-description">
                                        <span className="label">Description: </span>
                                        <span className="value">{movie.description}</span>
                                    </div>
                                    <div className="movie-director">
                                        <span className="label">Director: </span>
                                        <span className="value">{movie.director?.name}</span>
                                        <Link to={`/directors/${movie.director.name}`}>
                                            <Button variant={"link"}>Director</Button>
                                        </Link>
                                    </div>
                                    <div className="movie-genres">
                                        <span className="label">Genres: </span>
                                        {movie.genres?.map((genre) => (
                                                <span className="value" key={genre.name}>{genre.name} </span>
                                            )
                                        )}
                                        <Link to={`/genres/${movie.genres.name}`}>
                                            <Button variant={"link"}>Genre</Button>
                                        </Link>
                                    </div>
                                </Card.Text>
                                <Button variant="secondary" onClick={() => {
                                    onBackClick(null);
                                }}>Back
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
            </Row>
            </Container>
        )
            ;
    }
}