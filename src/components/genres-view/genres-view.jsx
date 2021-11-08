import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Navbar} from '../navbar/navbar';
import PropTypes from "prop-types";
import axios from "axios";

export class GenreView extends React.Component {

    constructor(props) {
        super();
        this.state = {
            movie: this.state,
            genre: [],
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getGenres(accessToken);
        }
    }



    render() {
        const {genre, genres} = this.props;
        return (
            <Container fluid>
                <Card>
                    <Row>
                        <Col className="genres-card p-md-5">
                            <Card.Body>
                                <Row className="genre-card">
                                    {genre.length > 0 && genres.map((genre) => {
                                            if (genre.name === Genres.find((d) => d === movie.genre)
                                            ) {
                                                return (
                                                    <Card style={{width: '30rem'}}>
                                                        <Card.Title>{genre.name}</Card.Title>
                                                            <Row className="genre-description">
                                                                <span className="label">Description:</span>
                                                                <span className="value">{genre.description}</span>
                                                            </Row>
                                                        <Row>
                                                            <Button className="m-1" variant="secondary" onClick={() => {
                                                                onBackClick(null);
                                                            }}>Back</Button>
                                                        </Row>
                                                    </Card>
                                                );
                                            }
                                        }
                                    )}
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};