import React from 'react';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {_id: 1, title: 'Inception', description: 'desc1...', ImagePath: '...'}
            ]
        }
    }

    render() {
        const {movies} = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {movies.map(movie => <div key={movie._id}>{movie.title}</div>)}
            </div>
        );
    }
}

