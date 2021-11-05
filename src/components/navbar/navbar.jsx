import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


export const Navbar  =  (props)  => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

