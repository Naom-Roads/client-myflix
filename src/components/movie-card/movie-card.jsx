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
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string,
            birthdate: PropTypes.instanceOf(Date),
        }),
        genres: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string
        }),
        ImagePath: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};