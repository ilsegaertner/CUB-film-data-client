import PropTypes from "prop-types";
import { Button, Card, Row, Col } from "react-bootstrap";

import "./book-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="h-100"
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button variant="link">Open</Button>
      </Card.Body>
    </Card>
  );
};
