import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import axios from "axios";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
      username: props.user,
    };
  }

  onAddMovie = (e) => {
    console.log(e.target.id);
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://my-flix-list.herokuapp.com/users/${this.state.username}/movies/${e.target.id}`,
        {},
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
    const { movie, genres, directors } = this.props;

    return (
      <Container
        fluid
        className="movie-view shadow align-content-center flex-lg-shrink-0"
      >
        <Row xs={2} md={6} lg={"auto"} className="g-4">
          <Col className="mt-5">
            <Card
              fluid={"md"}
              className="mb-5 me-auto text-center"
              style={{ width: "50rem" }}
            >
              <Card.Img
                alt="movie poster"
                variant="top"
                src={movie.imageurl}
                className="mb=2 movie-view"
              />
              <Card.Body>
                <Row>
                  <Card.Header
                    key={movie.title}
                    className="value p-3 display-4 shadow"
                  >
                    {movie.title}
                  </Card.Header>
                </Row>

                <Row className="movie-description p-md-5">
                  <Card.Text key={movie.description} className="label">
                    {movie.description}
                  </Card.Text>
                </Row>

                <Row className="movie-director">
                  <Card.Subtitle key={movie.director} className="label" md={6}>
                    {" "}
                    Director:{" "}
                  </Card.Subtitle>
                  <Link
                    className="links"
                    to={`/client-myflix/#/directors/${movie.director}`}
                  >
                    {directors?.find((d) => d._id === movie.director)?.name}
                  </Link>
                </Row>
                <Row className="movie-genres">
                  <Card.Subtitle key={genres._id} className="label" md={8}>
                    Genres:{" "}
                  </Card.Subtitle>
                  {genres?.length > 0 &&
                    movie.genres?.map((genreId) => {
                      const genre = genres?.find((g) => g._id === genreId);
                      return (
                        <Link
                          key={genre.name}
                          className="links"
                          to={`/client-myflix/#/genres/${genreId}`}
                        >
                          {" "}
                          {genre.name}{" "}
                        </Link>
                      );
                    })}
                </Row>
                <Link to={"/"}>
                  <Button
                    className="m-1 align-content-center"
                    variant="secondary"
                  >
                    Back
                  </Button>
                </Link>
              </Card.Body>
              <Button
                id={movie._id}
                className="m-1"
                variant="success"
                type="submit"
                onClick={this.onAddMovie}
              >
                Add to your favorites list
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};
