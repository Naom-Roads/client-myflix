import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";
import './movie-card.scss'


export class MovieCard extends React.Component {
    render() {
        const {movie} = this.props;
        return (
            <Container fluid>
                <Row xs={1} md={3} className="g-4">
                    <Col className="mt-5">
                        <Row>
                            <Card className="movie-card pd-5 mb-5 text-center" style={{width: '50rem'}}>
                                <Card.Img alt="movie poster" variant="top" src={movie.imageurl}/>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.description}</Card.Text>
                                    <Link to={`/client-myflix/movies/${movie._id}`}>
                                    <Button variant="dark">Open</Button>
                                    </Link>
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
        title: PropTypes.string
    }).isRequired,
};