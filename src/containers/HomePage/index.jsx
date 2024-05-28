import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HomePage = () => {
  const [movieList, setMovieList] = useState([]);

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=99ac92f20c641e6750f5c80123a59945"
    )
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <Container>
      <Row>
        {movieList.map((movie, id) => (
          <Col>
            <div className="single-movie shadow" key={id}>
              <div className="movie-single-img">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
