import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import "../profile-view/profile-view.scss";
import { MovieCard } from "../movie-card/movie-card";

export const ViewFavorites = ({
  user,
  updateUserFavorite,
  token,
  setUserProfile,
}) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {/* {favoriteMovieList.map((movie, id) => {
            return (
              <Col xs={12} md={6} lg={3} key={id} className="fav-movie">
                <MovieCard
                  user={user}
                  setUserProfile={setUserProfile}
                
                  updateUserFavorite={updateUserFavorite}
                  movie={movie}
                  token={token}
                  setFavoriteMovieList={setFavoriteMovieList}
                />
              </Col>
            );
          })} */}
        </Row>
      </Card.Body>
    </Card>
  );
};
