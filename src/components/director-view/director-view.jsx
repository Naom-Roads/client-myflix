import React from 'react';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Navbar} from '../navbar/navbar';
import axios from "axios";

export class DirectorView extends React.Component {

    constructor(props) {
        super();
        this.state = {
            movie: this.state,
            director: [],
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getDirector(accessToken);
        }
    }

    getDirector(token) {
        const movie = this.state;
        const director = movie.director;
        axios.get('http://localhost:8000/directors/:name', {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                this.setState({
                    director: response.data.director
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const {director, directors, onBackClick} = this.props;
        return (
            <Container fluid>
                <Card>
                    <Row>
                        <Col>
                            <Card.Body>
                                <Row className="director-card">
                                    {director.length > 0 && directors.map((director) => {
                                            if (
                                                director.name === Directors.find((d) => d === movie.director)
                                            ) {
                                                return (
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

DirectorView.propTypes =
    {
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birthyear: PropTypes.string
        }).isRequired
    }
;