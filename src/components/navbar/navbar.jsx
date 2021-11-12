import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export class Navbar extends React.Component {


    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            user: props.user
        }
    }

    componentDidMount() {
    this.setState({user: this.props.user});
    }


    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }


    render() {
        let {user, users, username} = this.state;

        return (
            <Navbar fixed="fixed" className="myflix-navbar shadow mb-3" bg="light"
                    style={{
                        width: '100%',
                        height: '80px',
                        fontFamily: 'Oswald',
                        borderBottom: '4px solid #FF3E80',
                        justifyContent: 'space-between'
                    }}>
                <Navbar.Brand className="navbar-brand" style={{fontSize: '40px', fontFamily: 'Oswald'}}
                              href="/">MyFlix</Navbar.Brand>

               <Nav className="me-auto">
                        <Nav.Link href={`/users/${user}`}> Profile </Nav.Link>
                    <Nav.Link onClick={this.onLoggedOut}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}
