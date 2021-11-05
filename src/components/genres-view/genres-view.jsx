import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Navbar} from '../navbar/navbar';
import PropTypes from "prop-types";

export class GenreView extends React.Component {
    render() {
        const {genres, onBackClick} = this.props;
        return (
            <Container>
                <Navbar/>
                <Row>
                    <Col className="genres-card p-md-5">
                        <Card  style={{width: '30rem'}}>
                            <Card.Body>
                                <Card.Title>{genres.name}</Card.Title>
                                <Card.Text>
                                    <div className="genre-description">
                                        <span className="label">Description:</span>
                                        <span className="value">{genres.description}</span>
                                    </div>
                                </Card.Text>
                                <Button className="m-1" variant="secondary" onClick={() => {
                                    onBackClick(null);
                                }}>Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

GenreView.propTypes = {
    movie: PropTypes.shape({
        genres: PropTypes.shape({
            "name": PropTypes.string.isRequired,
            "description": PropTypes.string.isrequire
        }).isRequired
    })
};