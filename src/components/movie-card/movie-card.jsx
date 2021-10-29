import React from 'react';
import PropTypes from 'prop-types';


export class MovieCard extends React.Component {
    render() {
        const {movie, onMovieClick} = this.props;
        return (
            <div onClick={() => onMovieClick(movie)}
                 className="movie-card">{movie.title}</div>


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