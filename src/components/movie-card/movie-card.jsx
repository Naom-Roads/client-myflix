import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
    render() {
        const {movie, onMovieClick} = this.props;
        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
            <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
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