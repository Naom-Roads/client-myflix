import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Navbar} from '../navbar/navbar';
import PropTypes from "prop-types";
import axios from "axios";

export class GenreView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genre: props.genre,
        }
    }

    render() {
        const {genre, onBackClick} = this.props;
        return (
            <Container>
                <Navbar/>
                <Row>
                    <Col className="genres-card p-md-5">
                        <Card  style={{width: '30rem'}}>
                            <Card.Body>
                                <Card.Title>{genre.name}</Card.Title>
                                <Card.Text>
                                    <div className="genre-description">
                                        <span className="label">Description:</span>
                                        <span className="value">{genre.description}</span>
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
        genre: PropTypes.shape({
            "name": PropTypes.string.isRequired,
            "description": PropTypes.string.isRequired
        }).isRequired
};