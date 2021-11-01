import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MovieCard extends React.Component {
    render() {
        const {movie, onMovieClick} = this.props;
        return (
            <Container fluid>
                <Row xs={1} md={2} className="g-4">
                <Col>
                    <Row>
                        <Card className="movie-card pd-5 mb-5 text-center" style={{width: '18rem'}}>
                            <Card.Img variant="top" src={movie.ImagePath}/>
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>{movie.description}</Card.Text>
                                <Button variant="dark" onClick={() => onMovieClick(movie)}>Open</Button>
                            </Card.Body>
                        </Card>

                    </Row>
                </Col>
                </Row>
            </Container>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        "_id": PropTypes.string,
        "title": PropTypes.string.isRequired,
        "director": PropTypes.object,
        "description": PropTypes.string.isRequired,
        "genres": PropTypes.arrayOf(PropTypes.shape({
            "name": PropTypes.string,
            "description": PropTypes.string
        })),
        "ImagePath": PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};