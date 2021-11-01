import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback
        );
    }

    componentWillUnmount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    render() {

        const {movie, onBackClick} = this.props;

        return (
            <Container>
                <Col>
                    <Row>
                        <Card style={{ width: '18rem'} }>
                        <Card.Img variant="top" src={movie.ImagePath} className="movie-view" />
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
                            </div>
                            <div className="movie-genres">
                                <span className="label">Genres: </span>
                                {movie.genres?.map((genre) => (
                                        <span className="value" key={genre.name}>{genre.name} </span>
                                    )
                                )}
                            </div>
                      </Card.Text>
                            <Button variant="secondary" onClick={() => {
                                onBackClick(null);
                            }}>Back
                            </Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
            </Container>
    )
        ;
    }
}