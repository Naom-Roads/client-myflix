import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import PropTypes from "prop-types";


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
                <Row>
                    <Col>
                        <Row className="director-card p-md-2 mt-5">
                            <Card className="director-body p-md-5" style={{width: '40rem'}}>
                                <Row className="director-title text-lg-start" key={director.name}>
                                    <Card.Title>{director.name}</Card.Title>
                                </Row>
                                <Row className="director-item align-baseline" key={director.birthyear}>
                                    <Card.Subtitle className="label">Birthyear: {director.birthyear}</Card.Subtitle>
                                </Row>
                                <Row className="director-item p-md-5" key={director.bio}>
                                    <Card.Subtitle className="label">Bio:</Card.Subtitle>
                                    <span className="value">{director.bio}</span>
                                </Row>
                                <Row>
                                    <Button className="m-1 align-content-center" variant="secondary"
                                            onClick={() => {
                                                onBackClick(null);
                                            }}>Back</Button>
                                </Row>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        birthyear: PropTypes.string
    })
}
;