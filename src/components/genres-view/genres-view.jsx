import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Navbar} from '../navbar/navbar';
import PropTypes from "prop-types";


export class GenreView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: props.movie,
            genre: null,
        };
    }

    render() {
        const {genre, genres} = this.props;
        return (
            <Container fluid>
                <Row>
                    <Col key={genre._id}>
                        <Card className="genres-card p-md-5" style={{width: '40rem'}}>
                            <Card.Body>
                                <Row className="genre-card p-md-3">
                                    <Card.Title>{genre.name}</Card.Title>
                                    <Row className="genre-description">
                                        <Card.Subtitle className="label">Description:</Card.Subtitle>
                                        <span className="value">{genre.description}</span>
                                    </Row>
                                    <Row>
                                        <Button className="m-1" variant="secondary" onClick={() => {
                                            onBackClick(null);
                                        }}>Back</Button>
                                    </Row>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })
};