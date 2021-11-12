import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {GenreView} from "../genres-view/genres-view";
import {ProfileView} from "../profile-view/profile-view";

export class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
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
                    {users?.find(u => u.username === match.params.username)}
                    <Nav.Link to={`/users/${username}`}>Profile</Nav.Link>
                        <Nav.Link type="submit" onClick={this.onLoggedOut}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

