import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./registration-view.scss";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("https://my-flix-list.herokuapp.com/register", {
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        props.onRegistration(data);
      })
      .catch((e) => {
        console.log("error registering user");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container fluid="md">
      <Row className="mb-5">
        <Col className="mt-5">
          <Card className="p-3">
            <CardGroup>
              <Form
                className="form-inside-input"
                onSubmit={onSubmit}
                noValidate
              >
                <Form.Group
                  className="mb-3 justify-content-md-center"
                  controlId="registration-card"
                >
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    min="5"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Form.Group
                  className="mb-3 justify-content-md-center"
                  controlId="formPassword"
                >
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 justify-content-md-center"
                  controlId="formBirthday"
                >
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="birthday"
                    name="birthday"
                    placeholder="MM/DD/YYYY"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  className="m-1"
                  variant="dark"
                  type="submit"
                  onClick={handleRegister}
                >
                  Submit
                </Button>
                <Link to="/#/client-myflix/">
                  <Button className="m-1" variant="secondary" type="button">
                    Already have an account?
                  </Button>
                </Link>
              </Form>
            </CardGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  newUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};
