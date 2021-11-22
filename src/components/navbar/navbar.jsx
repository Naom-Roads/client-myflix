import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export function NavbarView(props) {
  const user = props.user;

  const onLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.onLoggedOut();
  };

  return (
    <Navbar
      fixed="fixed"
      className="myflix-navbar shadow mb-3"
      bg="light"
      style={{
        width: "100%",
        height: "80px",
        fontFamily: "Oswald",
        borderBottom: "4px solid #FF3E80",
        justifyContent: "space-between",
      }}
    >
      <Navbar.Brand
        className="navbar-brand"
        style={{ fontSize: "40px", fontFamily: "Oswald" }}
        href="/client-myflix"
      >
        MyFlix
      </Navbar.Brand>

      <Nav className="me-auto">
        <Nav.Link href={`/client-myflix/#/users/${user}`}> Profile </Nav.Link>
        <Nav.Link href="/client-myflix/#/login" onClick={onLogOut}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
