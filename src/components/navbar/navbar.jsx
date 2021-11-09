import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


export const Navbar = (props) => {
    return (
            <Navbar fixed="fixed" className="myflix-navbar shadow mb-3" bg="light"
                    style={{
                        width: '100%',
                        height: '80px',
                        fontFamily: 'Oswald',
                        borderBottom: '4px solid #FF3E80',
                        justifyContent: 'space-between'}}>
                <Navbar.Brand className="navbar-brand" style={{fontSize: '40px', fontFamily: 'Oswald'}}
                              href="/">MyFlix</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar>
    )
}

