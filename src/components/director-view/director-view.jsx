import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Navbar} from '../navbar/navbar';

export class DirectorView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {director, onBackClick} = this.props;

        return (
            <Container fluid>
                <Navbar />
                <Row>
                    <Col>
                        <Row>
                            <Card className="director-card p-md-5" style={{width: '30rem'}}>
                                <Card.Body>
                                    <Card.Title>{director.name}</Card.Title>
                                    <Card.Text>
                                        <div className="director-description">
                                            <span className="label">Bio:</span>
                                            <span className="value">{director.bio}</span>
                                        </div>
                                        <div className="director-birthyear">
                                            <span className="label">Birthyear:</span>
                                            <span className="value">{director.birthyear}</span>
                                        </div>
                                    </Card.Text>
                                    <Button className="m-1" variant="secondary" onClick={() => {
                                        onBackClick(null); }}>Back</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

DirectorView.propTypes = {
    movie: PropTypes.shape({
        "director": PropTypes.shape({
            "name": PropTypes.string.isRequired,
            "bio": PropTypes.string.isRequired,
            "birthyear": PropTypes.string
        }).isRequired
    })
};