import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import {useParams} from "react-router-dom";

export class DirectorView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            movie: props.movie,
            director: null,
        };
    }

    render() {
        const {director, onBackClick} = this.props;
        return (
            <Container fluid>
                <Card>
                    <Row>
                        <Col>
                            <Card.Body>
                                <Row className="director-card">
                                    <Card className="director-body p-md-5" style={{width: '30rem'}}>
                                        <Row className="director-title" key={director.name}>
                                            <Card.Title>{director.name}</Card.Title>
                                        </Row>
                                        <Row className="director-item" key={director.bio}>
                                            <span className="label">Bio:</span>
                                            <span className="value">{director.bio}</span>
                                        </Row>
                                        <Row className="director-item" key={director.birthyear}>
                                            <span className="label">Birthyear:</span>
                                            <span className="value">{director.birthyear}</span>
                                        </Row>
                                    </Card>

                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birthyear: PropTypes.string
    })
}
;