import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
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
        const {genre, onBackClick} = this.props;
        return (
            <Container fluid>
                <Row>
                    <Col key={genre._id}>
                        <Card className="genres-view p-md-5 shadow-sm" style={{width: '40rem'}}>
                            <Row className="genre-card">
                                <Card.Title className="genre-header">{genre.name}</Card.Title>
                                <Card.Body className="card-body p-md-3" style={{alignItems: 'center'}}>
                                    <Row className="genre-description">
                                        <span className="value mb-3">{genre.description}</span>
                                    </Row>
                                    <Row>
                                        <Button className="m-1 align-content-center" variant="secondary"
                                                onClick={() => {onBackClick(null);}}>Back</Button>
                                    </Row>
                                </Card.Body>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

GenreView.propTypes = {
    genres: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string
    })
};