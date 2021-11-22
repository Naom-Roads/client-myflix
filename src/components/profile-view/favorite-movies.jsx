import React from "react";
import { Container, Col, Row, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

export class FavoriteMoviesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
      username: props.user,
    };
    console.log(props.user);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.getFavoriteMovies(token);
  }

  getFavoriteMovies(token) {
    axios
      .get(
        `https://my-flix-list.herokuapp.com/users/${this.state.username}/movies`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          favoriteMovies: response.data,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  onRemoveFavorite = (e) => {
    console.log(e.target.id);
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://my-flix-list.herokuapp.com/users/${this.state.username}/movies/${e.target.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const movieIndex = this.state.favoriteMovies.findIndex((m) => {
          return m._id === e.target.id;
        });
        this.state.favoriteMovies.splice(movieIndex);
        this.setState({ favoriteMovies: this.state.favoriteMovies });

        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  render() {
    const { favoriteMovies } = this.state;
    return (
      <Container fluid>
        <Row xs={1} md={3} className="g-4">
          {favoriteMovies?.length > 0 &&
            favoriteMovies.map((favoriteMovie) => {
              return (
                <Col key={favoriteMovie._id} className="mt-5">
                  <Row>
                    <Card
                      className="movie-card pd-5 mb-5 text-center"
                      style={{ width: "50rem" }}
                    >
                      <Card.Img
                        alt="movie poster"
                        variant="top"
                        src={favoriteMovie.imageurl}
                      />
                      <Card.Body>
                        <Card.Title>{favoriteMovie.title}</Card.Title>
                        <Card.Text>{favoriteMovie.description}</Card.Text>
                        <Link
                          to={`/client-myflix/#/movies/${favoriteMovie._id}`}
                        >
                          <Button variant="dark">Open</Button>
                        </Link>
                      </Card.Body>
                      <Button
                        id={favoriteMovie._id}
                        className="m-1"
                        variant="danger"
                        type="submit"
                        onClick={this.onRemoveFavorite}
                      >
                        Remove from your favorites list
                      </Button>
                    </Card>
                  </Row>
                </Col>
              );
            })}
        </Row>
      </Container>
    );
  }
}

FavoriteMoviesView.propTypes = {
  username: PropTypes.string,
  favoriteMovies: PropTypes.arrayOf(PropTypes.string),
};
